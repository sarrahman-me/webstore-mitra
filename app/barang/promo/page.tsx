"use client";
import { SearchBar } from "@/src/components/molecules";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";

const Promo = () => {
  return (
    <div>
      <AppBar allowBack={true} />
      <SearchBar />
      <p className="underline font-semibold m-2">Barang promo</p>
      <CatalogProducts limit="100" unPagination={true} atribut={`promo=true`} />
    </div>
  );
};

export default Promo;
