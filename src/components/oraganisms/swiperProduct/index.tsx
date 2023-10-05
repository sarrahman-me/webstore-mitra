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
  persentaseHarga: number;
}) {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mr-5">
        <p className="underline font-semibold m-2">{props.title}</p>
        {props.url && (
          <BsFillArrowRightCircleFill
            onClick={() => router.push(props.url)}
            className="text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-full text-xl md:text-2xl cursor-pointer"
          />
        )}
      </div>
      <div className="cursor-grab select-none">
        <Swiper
          slidesPerView={2}
          spaceBetween={3}
          modules={[Pagination]}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 3,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 3,
            },
          }}
        >
          {props.products?.map((product) => (
            <SwiperSlide key={product.slug} className="p-2">
              <CardProduct
                persentaseHarga={props.persentaseHarga}
                product={product}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
