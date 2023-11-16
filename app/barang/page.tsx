"use client";
import { SearchBar } from "@/src/components/molecules";
import { CatalogProducts, SwiperProduct } from "@/src/components/oraganisms";
import { AppBar, MotifList } from "@/src/layouts";
import { GetDataApi } from "@/src/utils";
import { useEffect, useState } from "react";

const Home = () => {
  const [barangPromo, setbarangPromo] = useState([] as any);

  useEffect(() => {
    async function fetchData() {
      const responseBarangPromo = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?promo=true`
      );
      setbarangPromo(responseBarangPromo.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <AppBar />
      <SearchBar />
      <SwiperProduct url="/barang/promo" title="Promo" products={barangPromo} />
      <MotifList />
      <p className="underline font-semibold m-2">Semua Barang</p>
      <CatalogProducts />
    </div>
  );
};

export default Home;
