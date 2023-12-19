"use client";
import Image from "next/image";
import Garasi from "@/public/garasi.jpeg";
import Dapur from "@/public/dapur.jpg";
import KamarMandi from "@/public/kamarmandi.jpg";
import DalamRumah from "@/public/dalamrumah.jpeg";
import KolamRenang from "@/public/kolamrenang.jpeg";
import Teras from "@/public/teras.jpg";
import { useRouter } from "next/navigation";

const AreaList = [
  {
    title: "Dalam Rumah",
    image: DalamRumah,
  },
  {
    title: "Garasi",
    image: Garasi,
  },
  {
    title: "Kamar Mandi",
    image: KamarMandi,
  },
  {
    title: "Dapur",
    image: Dapur,
  },
  {
    title: "Teras",
    image: Teras,
  },
  {
    title: "Kolam Renang",
    image: KolamRenang,
  },
];

export default function AreaListComp() {
  const router = useRouter();

  return (
    <div className="my-2">
      <div className="flex justify-between items-center">
        <p className="underline font-semibold m-2">Area Penggunaan</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {AreaList?.map((area) => (
          <div
            onClick={() => router.push(`/barang/filter?area=${area.title}`)}
            key={area.title}
            className="p-2 cursor-pointer relative"
          >
            <Image
              className="rounded-md h-28 md:h-36"
              src={area.image}
              alt={area.title}
            />
            <div className="absolute bottom-2 px-4 py-3 bg-gray-500/50 rounded-tr-md">
              <h1 className="text-white font-semibold md:text-2xl text-center">
                {area.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
