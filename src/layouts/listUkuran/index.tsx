"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useRouter } from "next/navigation";

const motifList = [
  {
    title: "60 x 60",
    color: `from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900`,
    slug: "60x60",
  },
  {
    title: "50 x 50",
    color: "from-sky-300 to-sky-500 dark:from-sky-700 dark:to-sky-900",
    slug: "50x50",
  },
  {
    title: "40 x 40",
    color: "from-lime-300 to-lime-500 dark:from-lime-700 dark:to-lime-900",
    slug: "40x40",
  },
  {
    title: "30 x 30",
    color: "from-amber-300 to-amber-500 dark:from-amber-700 dark:to-amber-900",
    slug: "30x30",
  },
  {
    title: "25 x 25",
    color:
      "from-purple-300 to-purple-500 dark:from-purple-700 dark:to-purple-900",
    slug: "25x25",
  },
  {
    title: "20 x 40",
    color: "from-red-300 to-red-500 dark:from-red-700 dark:to-red-900",
    slug: "20x40",
  },
  {
    title: "25 x 40",
    color:
      "from-indigo-300 to-indigo-500 dark:from-indigo-700 dark:to-indigo-900",
    slug: "25x40",
  },
  {
    title: "25 x 50",
    color: "from-green-300 to-green-500 dark:from-green-700 dark:to-green-900",
    slug: "25x50",
  },
  {
    title: "30 x 60",
    color:
      "from-orange-300 to-orange-500 dark:from-orange-700 dark:to-orange-900",
    slug: "30x60",
  },
];

export default function ListUkuran() {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mr-5">
        <p className="underline font-semibold m-2">Pilihan Ukuran</p>
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
              onClick={() => router.push(`/barang/filter?ukuran=${motif.slug}`)}
              key={motif.title}
              className="p-2 cursor-pointer"
            >
              <div
                className={`h-16 bg-gradient-to-b ${motif.color} text-white rounded-md flex justify-center items-center`}
              >
                <p className="font-bold">{motif.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
