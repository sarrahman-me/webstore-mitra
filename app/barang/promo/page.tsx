"use client";
import { SearchBar } from "@/src/components/molecules";
import WhatsappIcon from "@/src/components/molecules/whatsappIcon";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";

const Promo = () => {
  return (
    <div>
      <AppBar allowBack={true} />
      <SearchBar />
      <p className="underline font-semibold m-2">Barang promo</p>
      <CatalogProducts limit="100" unPagination={true} atribut={`promo=true`} />
      <WhatsappIcon />
    </div>
  );
};

export default Promo;
