"use client";
import { GetDataApi } from "@/src/utils";
import { HeaderSection } from "../../atoms";
import config from "@/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MotifList() {
  const router = useRouter();
  const [merk, setMerk] = useState([] as any);

  useEffect(() => {
    const fetchDataMerk = async () => {
      const responseMotif = await GetDataApi(
        `${config.NEXT_PUBLIC_HOST}/motif-barang?page=1&limit=8`
      );
      setMerk(responseMotif.data);
    };

    fetchDataMerk();
  }, []);

  return (
    <div
      className={`p-2 my-3 md:mx-2 rounded ${
        merk.length > 0 ? "block" : "hidden"
      }`}
    >
      <HeaderSection title="Pilihan Motif" />
      <div
        className={`m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 my-5`}
      >
        {merk.map((motif: any, i: any) => (
          <div
            key={i}
            onClick={() => router.push(`products/motif/${motif.nama}`)}
            className="cursor-pointer border rounded bg-gradient-to-b from-gray-800 to-gray-700 p-2 shadow text-center"
          >
            <p className="text-white font-semibold">
              {(motif.nama as string).toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
