/* eslint-disable @next/next/no-img-element */
"use client";
import { Container, Typography } from "@/src/components/atoms";
import { SearchBar } from "@/src/components/molecules";
import WhatsappIcon from "@/src/components/molecules/whatsappIcon";
import { CatalogProducts, SwiperProduct } from "@/src/components/oraganisms";
import {
  AppBar,
  AreaListComp,
  ListUkuran,
  LockScreen,
  MotifList,
  PilihanPencarian,
} from "@/src/layouts";
import { GetDataApi } from "@/src/utils";
import { useEffect, useState } from "react";
import { FcExpired } from "react-icons/fc";
import { useSelector } from "react-redux";

const Home = () => {
  const [barangPromo, setbarangPromo] = useState([] as any);
  const { webstore, membership } = useSelector((state: any) => state.webstore);
  const [login, setLogin] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (sessionStorage.getItem("login") === "OK") {
        setLogin(true);
      }
      const responseBarangPromo = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?promo=true&minstok=25`
      );
      setbarangPromo(responseBarangPromo.data);
    }
    fetchData();

    // Check if the membership is expired
    if (membership.endDate) {
      const currentDate = new Date().getTime(); // mendapatkan timestamp tanggal sekarang
      const expirationDate = membership.endDate;

      // Mengecek apakah situs sudah kedaluwarsa atau belum
      setIsExpired(currentDate > expirationDate);
    }
  }, [membership.endDate]);

  if (isExpired) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Container otherClass="p-8">
          <Typography align="center" variant="h4">
            Situs Expired
          </Typography>
          <div className="flex justify-center">
            <FcExpired className="text-9xl" />
          </div>
          <p className="text-xs text-orange-500 text-center">
            Pemberitahuan ini ditujukan kepada pemilik situs untuk melakukan
            pembaruan di halaman admin
          </p>
        </Container>
      </div>
    );
  }

  if (webstore.use_password && !login) {
    return <LockScreen />;
  }

  return (
    <div>
      <div>
        <AppBar />
        <SearchBar />
        {webstore.banner_image && (
          <div className="flex justify-center m-2 sm:my-2">
            <img src={webstore.banner_image} alt="banner" />
          </div>
        )}
        {webstore.show_price && (
          <SwiperProduct
            url="/barang/promo"
            title="Promo"
            products={barangPromo}
          />
        )}
        <PilihanPencarian />
        <MotifList />
        <ListUkuran />
        <AreaListComp />
        <p className="underline font-semibold m-2">Semua Barang</p>
        <CatalogProducts />
        <WhatsappIcon />
      </div>
    </div>
  );
};

export default Home;
