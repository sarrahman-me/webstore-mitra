"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { CardProduct } from "../../molecules";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
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
          <BsFillArrowRightCircleFill
            onClick={() => router.push(props.url)}
            className="text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-full text-2xl cursor-pointer"
          />
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
              <CardProduct
                barang={product}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
