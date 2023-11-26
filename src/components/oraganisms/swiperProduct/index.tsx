"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { CardProduct } from "../../molecules";
import { useRouter } from "next/navigation";

export default function SwiperProduct(props: {
  products: any[];
  title: string;
  url: string;
}) {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mr-5">
        <p className="underline font-semibold m-2">{props.title}</p>
        {props.url && (
          <p
            className="text-xs sm:text-sm cursor-pointer text-blue-500"
            onClick={() => router.push(props.url)}
          >
            Lihat Semua
          </p>
        )}
      </div>
      <div className="cursor-grab select-none">
        <Swiper
          slidesPerView={3}
          spaceBetween={2}
          modules={[Pagination]}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 2,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 2,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 2,
            },
          }}
        >
          {props.products?.map((product) => (
            <SwiperSlide key={product.slug} className="p-1">
              <CardProduct barang={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
