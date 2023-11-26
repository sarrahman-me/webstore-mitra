"use client";
import Image from "next/image";
import WoodMotif from "@/public/wood.png";
import StoneMotif from "@/public/stone.png";
import RusticMotif from "@/public/rustic.png";
import MarbleMotif from "@/public/marble.png";
import FancyMotif from "@/public/fancy.png";
import BasicMotif from "@/public/basic.png";
import { useRouter } from "next/navigation";

const motifList = [
  {
    title: "Marble",
    image: MarbleMotif,
  },
  {
    title: "Wood (Kayu)",
    image: WoodMotif,
  },
  {
    title: "Stone (Batu)",
    image: StoneMotif,
  },
  {
    title: "Fancy",
    image: FancyMotif,
  },
  {
    title: "Basic (Polos)",
    image: BasicMotif,
  },
  {
    title: "Rustic",
    image: RusticMotif,
  },
];

export default function MotifList() {
  const router = useRouter();

  return (
    <div className="my-2">
      <div className="flex justify-between items-center">
        <p className="underline font-semibold m-2">Pilihan Motif</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {motifList?.map((motif) => (
          <div
            onClick={() => router.push(`/barang/motif/${motif.title}`)}
            key={motif.title}
            className="p-2 cursor-pointer"
          >
            <Image
              className="rounded-md"
              src={motif.image}
              alt={motif.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
