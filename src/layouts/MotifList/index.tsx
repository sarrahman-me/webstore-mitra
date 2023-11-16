"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
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
    <div>
      <div className="flex justify-between items-center mr-5">
        <p className="underline font-semibold m-2">Pilihan Motif</p>
      </div>
      <div className="cursor-grab select-none">
        <Swiper
          slidesPerView={2.3}
          spaceBetween={3}
          modules={[Pagination]}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 3.2,
              spaceBetween: 3,
            },
            768: {
              slidesPerView: 4.5,
              spaceBetween: 3,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 3,
            },
          }}
        >
          {motifList?.map((motif) => (
            <SwiperSlide
              onClick={() =>
                router.push(`/barang/motif/${motif.title}`)
              }
              key={motif.title}
              className="p-2 cursor-pointer"
            >
              <Image
                className="mx-2 rounded-md"
                src={motif.image}
                alt={motif.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
