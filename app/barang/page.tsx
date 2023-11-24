"use client";
import { SearchBar } from "@/src/components/molecules";
import { CatalogProducts, SwiperProduct } from "@/src/components/oraganisms";
import { AppBar, MotifList, PilihanPencarian } from "@/src/layouts";
import { GetDataApi } from "@/src/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [barangPromo, setbarangPromo] = useState([] as any);
  const { webstore } = useSelector((state: any) => state.webstore);

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
      {webstore.show_price && (
        <SwiperProduct
          url="/barang/promo"
          title="Promo"
          products={barangPromo}
        />
      )}
      <MotifList />
      <PilihanPencarian />
      <p className="underline font-semibold m-2">Semua Barang</p>
      <CatalogProducts />
    </div>
  );
};

export default Home;
