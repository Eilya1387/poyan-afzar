import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_API_URL || "https://api.poyanafzar.noteduco342.ir";

async function proxyRequest(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const targetPath = (path || []).join("/");
  const search = req.nextUrl.search;
  const targetUrl = `${BACKEND_URL}/api/${targetPath}${search}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    // Do not forward host or connection headers
    if (!["host", "connection", "content-length"].includes(lowerKey)) {
      headers.set(key, value);
    }
  });

  const method = req.method;
  const hasBody = !["GET", "HEAD", "OPTIONS"].includes(method);

  let body: ArrayBuffer | undefined = undefined;
  if (hasBody) {
    try {
      body = await req.arrayBuffer();
    } catch {
      body = undefined;
    }
  }

  try {
    const res = await fetch(targetUrl, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (
        !["content-encoding", "content-length", "transfer-encoding"].includes(
          lowerKey
        )
      ) {
        responseHeaders.set(key, value);
      }
    });

    // Ensure CORS headers are permissive
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD"
    );
    responseHeaders.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept"
    );

    const resData = await res.arrayBuffer();
    return new NextResponse(resData, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err?.message || "خطا در برقراری ارتباط با سرور",
      },
      { status: 502 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const HEAD = proxyRequest;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept",
      "Access-Control-Max-Age": "86400",
    },
  });
}
