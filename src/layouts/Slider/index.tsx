"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "@/public/slide1.jpg";
import Image from "next/image";
import "swiper/css";

export default function Slider() {
  return (
    <>
      <Swiper className="mySwiper">
        <SwiperSlide>
          <Image src={slide1} alt="123" height={300} />
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
