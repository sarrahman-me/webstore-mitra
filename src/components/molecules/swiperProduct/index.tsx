"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { CardProduct } from "../../molecules";
import { HeaderSection } from "../../atoms";

export default function SwiperProduct(props: {
  products: any[];
  title: string;
}) {
  return (
    <div className="bg-white p-2 my-3 md:mx-2 shadow sm:border rounded">
      <HeaderSection title={props.title} />
      <div className="cursor-grab select-none">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          modules={[Pagination]}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
        >
          {props.products?.map((product) => (
            <SwiperSlide key={product.slug}>
              <CardProduct product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
