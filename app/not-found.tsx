"use client";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="text-center p-2">
        <Player
          autoplay
          loop
          src="https://lottie.host/e03e05a9-9549-4835-ae1a-b4d0e497baf5/MTprdbG0As.json"
          style={{ height: "500px", width: "500px" }}
        >
          <Controls buttons={["play", "repeat", "frame", "debug"]} />
        </Player>
        <h2 className="md:text-lg font-bold">
          Halaman yang Anda cari tidak ditemukan
        </h2>
      </div>
      <button
        onClick={() => router.back()}
        className="bg-white text-indigo-500 px-6 py-2 rounded-full mt-6 hover:bg-indigo-500 hover:text-white transition duration-300"
      >
        Kembali
      </button>
    </div>
  );
}
