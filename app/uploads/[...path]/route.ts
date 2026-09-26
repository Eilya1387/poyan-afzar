import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_API_URL || "https://api.poyanafzar.noteduco342.ir";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const targetPath = (path || []).join("/");
  const targetUrl = `${BACKEND_URL}/uploads/${targetPath}`;

  try {
    const res = await fetch(targetUrl, {
      method: "GET",
      cache: "force-cache",
    });

    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!["content-encoding", "transfer-encoding"].includes(lowerKey)) {
        responseHeaders.set(key, value);
      }
    });

    responseHeaders.set("Access-Control-Allow-Origin", "*");
    const resData = await res.arrayBuffer();
    return new NextResponse(resData, {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "File not found" },
      { status: 404 }
    );
  }
}
