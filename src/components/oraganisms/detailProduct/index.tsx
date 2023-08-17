/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "../../atoms";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination]);

const DetailProduct = (props: {
  product: any;
  hargaJual: Number;
  whatsappMitra: string;
}) => {
  const Barang = props.product;

  const handleWhatsAppClick = () => {
    const message = `Saya ingin bertanya tentang produk ini
    Nama : *${Barang?.nama_barang}*,
    Merk : *${Barang?.merk}*, 
    Ukuran : *${Barang?.ukuran}*, 
    Kualitas : *${Barang?.kualitas}*,
    Harga : *${Barang?.harga}* ,
    Stok : *${Barang?.stok}*`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${
      props.whatsappMitra
    }&text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="bg-white py-8 px-4 flex md:border md:flex-row flex-col shadow rounded my-3 p-2">
      <div className="md:w-1/3 w-full">
        {Barang?.images.length > 1 ? (
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="w-full h-60 relative"
          >
            {Barang?.images.map((image: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={Barang?.nama_barang}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain border"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={Barang?.images[0]}
            alt={Barang?.nama_barang}
            width={400}
            height={400}
            className="w-full h-60 object-contain border"
          />
        )}
        {Barang?.images.length > 1 && (
          <div className="absolute bottom-4 right-4 text-white font-bold">
            {Barang?.images.length} Gambar
          </div>
        )}
      </div>
      <div className="m-3 md:ml-10">
        <p className="md:text-xl text-lg font-bold my-3">
          {Barang?.nama_barang}
        </p>
        <p className="md:text-lg font-medium my-3">Brand: {Barang?.merk}</p>
        <p className="md:text-lg font-medium my-3">
          Kategori Barang: {Barang?.kategori}
        </p>
        <p className="md:text-lg font-medium my-3">
          Stok: {`${Barang?.stok} dus`}
        </p>
        <p className="md:text-lg font-medium my-3">
          Harga:{" "}
          {"Rp " + Number(props.hargaJual).toLocaleString("id-ID") + `/dus`}
        </p>
        <Button onClick={handleWhatsAppClick} color="green">
          Whatsapp
        </Button>
      </div>
    </div>
  );
};

export default DetailProduct;
