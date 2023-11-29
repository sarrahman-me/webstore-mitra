"use client";
import { SearchBar } from "@/src/components/molecules";
import { CatalogProducts, SwiperProduct } from "@/src/components/oraganisms";
import { AppBar, MotifList, PilihanPencarian } from "@/src/layouts";
import { GetDataApi } from "@/src/utils";
import { useEffect, useState } from "react";
import { RiWhatsappFill } from "react-icons/ri";
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

  const whatsappNumber = "+6282157758174";

  const handlePesan = () => {
    const message = `Halo Admin`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  };

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
      <PilihanPencarian />
      <MotifList />
      <p className="underline font-semibold m-2">Semua Barang</p>
      <CatalogProducts />
      <div className="fixed right-0 bottom-0 m-2">
        <div
          onClick={handlePesan}
          className="bg-gradient-to-br from-green-300 to-green-500 dark:from-green-700 dark:to-green-900 text-white space-x-2 flex items-center rounded-full p-2 px-4"
        >
          <RiWhatsappFill className="text-white text-3xl" />
          <p>Chat</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
