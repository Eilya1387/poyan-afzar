import {
  API_BASE_URL,
  getAccessToken,
  getAdminToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearAllTokens,
} from "./config";

export interface ApiResponse<T = any> {
  success?: boolean;
  statusCode?: number;
  data: T;
  meta?: any;
  message?: string;
  [key: string]: any;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: any;
  token?: string;
  useAdminToken?: boolean;
  skipAuth?: boolean;
}

export class ApiError extends Error {
  statusCode: number;
  data?: any;
  errors?: string[];

  constructor(message: string, statusCode: number, data?: any, errors?: string[]) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
    this.errors = errors;
  }
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

async function tryRefreshToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      clearAllTokens();
      return null;
    }

    const payload = await res.json();
    const newAccessToken = payload.data?.accessToken || payload.accessToken;
    const newRefreshToken = payload.data?.refreshToken || payload.refreshToken;

    if (newAccessToken) {
      setAccessToken(newAccessToken);
      if (newRefreshToken) setRefreshToken(newRefreshToken);
      return newAccessToken;
    }
    return null;
  } catch {
    clearAllTokens();
    return null;
  }
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    params,
    body,
    token: explicitToken,
    useAdminToken = false,
    skipAuth = false,
    headers: customHeaders = {},
    ...customConfig
  } = options;

  let url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const headers: Record<string, string> = {
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
    ...(customHeaders as Record<string, string>),
  };

  if (!skipAuth) {
    const authToken =
      explicitToken ||
      (useAdminToken ? getAdminToken() : getAccessToken() || getAdminToken());
    if (authToken && !headers["Authorization"]) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
  }

  const config: RequestInit = {
    ...customConfig,
    headers,
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  };

  let res: Response;
  try {
    res = await fetch(url, config);
  } catch (err: any) {
    throw new ApiError(
      err?.message || "خطا در برقراری ارتباط با سرور",
      0
    );
  }

  // Handle 401 for user token refresh
  if (res.status === 401 && !skipAuth && !useAdminToken && getRefreshToken()) {
    if (!isRefreshing) {
      isRefreshing = true;
      const newToken = await tryRefreshToken();
      isRefreshing = false;

      if (newToken) {
        onRefreshed(newToken);
        headers["Authorization"] = `Bearer ${newToken}`;
        const retryRes = await fetch(url, { ...config, headers });
        return parseResponse<T>(retryRes);
      }
    } else {
      const retryToken = await new Promise<string>((resolve) => {
        subscribeTokenRefresh(resolve);
      });
      if (retryToken) {
        headers["Authorization"] = `Bearer ${retryToken}`;
        const retryRes = await fetch(url, { ...config, headers });
        return parseResponse<T>(retryRes);
      }
    }
  }

  return parseResponse<T>(res);
}

async function parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const contentType = res.headers.get("content-type") || "";
  let data: any = null;

  if (contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const message =
      data?.message ||
      (Array.isArray(data?.errors) ? data.errors.join("، ") : null) ||
      `خطای سرور (${res.status})`;

    throw new ApiError(message, res.status, data, data?.errors);
  }

  return data;
}

export const api = {
  get: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),
  post: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "POST", body }),
  patch: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "PATCH", body }),
  put: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "PUT", body }),
  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};
