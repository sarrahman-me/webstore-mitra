"use client";
import { SearchBar } from "@/src/components/molecules";
import WhatsappIcon from "@/src/components/molecules/whatsappIcon";
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
import { useSelector } from "react-redux";

const Home = () => {
  const [barangPromo, setbarangPromo] = useState([] as any);
  const { webstore } = useSelector((state: any) => state.webstore);
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
        <WhatsappIcon />
      </div>
    </div>
  );
};

export default Home;
