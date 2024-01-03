"use client";
import { LottiePlayer, Typography } from "@/src/components/atoms";

/**
 * Halaman Loading digunakan untuk menampilkan animasi saat halaman loading.
 */

export default function LoadingPage() {
  return (
    <div
      className="flex justify-center items-center h-screen w-screen"
      role="status"
    >
      <LottiePlayer
        url={
          "https://lottie.host/e94b19a3-dd9a-4ed1-be88-5f2042b21cc7/QxrdGHKsmZ.json"
        }
        height={"300px"}
        width={"300px"}
      />
      <Typography otherClass="sr-only">Loading</Typography>
    </div>
  );
}
