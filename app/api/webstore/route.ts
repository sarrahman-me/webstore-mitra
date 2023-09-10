import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_HOST}/webstore/domain/berhasil.netlify.app`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     cache: "no-store",
    //     credentials: "include",
    //   }
    // );
    // const data = await response.json();

    // const hostname = new URL(request.url).hostname;
    const hostname = request.url.split("/")[2];

    return NextResponse.json({
      status: 200,
      success: true,
      //   data: data.data,
      hostname,
      requestUrl: request.url,
      requestHost: request.headers.get("host"),
      requestReferer: request.headers.get("referer"),
      requestOrigin: request.headers.get("origin"),
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message || "Terjadi kesalahan yang tidak diketahui",
      requestUrl: request.url,
      requestHost: request.headers.get("host"),
      requestReferer: request.headers.get("referer"),
      requestOrigin: request.headers.get("origin"),
    });
  }
}
