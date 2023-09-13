import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/webstore/domain/gaung.netlify.app`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      }
    );
    const data = await response.json();

    const membershipResponse = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/membership/member/${data.data.id_membership}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      }
    );
    const membership = await membershipResponse.json();

    const hostname = `hostname: ${request.headers.get("host")}`;

    return NextResponse.json({
      status: 200,
      success: true,
      data: data.data,
      membership: membership.data,
      hostname,
      requestUrl: request.url,
      requestHost: request.headers.get("host"),
      requestReferer: request.headers.get("referer"),
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
    });
  }
}
