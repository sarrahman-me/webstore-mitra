"use client";
import { SearchBar } from "@/src/components/molecules";
import { CatalogProducts, SwiperProduct } from "@/src/components/oraganisms";
import {
  AppBar,
  ListUkuran,
  LockScreen,
  MotifList,
  PilihanPencarian,
} from "@/src/layouts";
import { GetDataApi } from "@/src/utils";
import { useEffect, useState } from "react";
import { RiWhatsappFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Home = () => {
  const [barangPromo, setbarangPromo] = useState([] as any);
  const { webstore, mitra } = useSelector((state: any) => state.webstore);
  const [login, setLogin] = useState(false);

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
  }, []);

  const handlePesan = () => {
    const message = `Halo Admin`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${
      mitra?.whatsapp
    }&text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  };

  if (webstore.use_password && !login) {
    return <LockScreen />;
  }

  return (
    <div>
      <div>
        <AppBar />
        <SearchBar />
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
        <p className="underline font-semibold m-2">Semua Barang</p>
        <CatalogProducts />
        <div className="fixed left-0 bottom-0 m-2">
          <div
            onClick={handlePesan}
            className="bg-gradient-to-br from-green-300 to-green-500 dark:from-green-700 dark:to-green-900 text-white space-x-2 flex items-center rounded-full md:p-2 md:px-4 p-2"
          >
            <RiWhatsappFill className="text-white text-3xl" />
            <p className="text-sm hidden md:block">Chat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
