"use client";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ToggleDarkMode } from "@/src/components/atoms";
import { useRouter } from "next/navigation";

export default function AppBar(props: { nama_webstore: string; allowBack?: boolean }) {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-slate-800 flex justify-between items-center p-2">
      {props.allowBack && (
        <p onClick={() => router.back()} className="font-semibold cursor-pointer text-lg">
          <AiOutlineArrowLeft />
        </p>
      )}
      <p className="font-semibold">{props.nama_webstore}</p>
      <ToggleDarkMode />
    </div>
  );
}
