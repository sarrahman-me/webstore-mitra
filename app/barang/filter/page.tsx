"use client";
import { SearchBar } from "@/src/components/molecules";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar, LockScreen } from "@/src/layouts";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiWhatsappFill } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function Motif() {
  const { webstore, mitra } = useSelector((state: any) => state.webstore);
  const [login, setLogin] = useState(false);
  const searchParams = useSearchParams();
  const kategori = searchParams.get("kategori");
  const ukuran = searchParams.get("ukuran");
  const motif = searchParams.get("motif");
  const queryAtribute = `kategori=${kategori || ""}&ukuran=${
    ukuran || ""
  }&motif=${motif || ""}`;

  useEffect(() => {
    if (sessionStorage.getItem("login") === "OK") {
      setLogin(true);
    }
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
      <AppBar allowBack={true} />
      <SearchBar />
      {webstore.show_price && (
        <div>
          <p className="underline font-semibold m-2">
            Promo {kategori} {ukuran} {motif}
          </p>
          <CatalogProducts
            limit="100"
            unPagination={true}
            atribut={`${queryAtribute}&promo=true`}
          />
        </div>
      )}
      <p className="underline font-semibold m-2">
        Pilihan {kategori} {ukuran} {motif}
      </p>
      <CatalogProducts atribut={queryAtribute} />
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
  );
}
