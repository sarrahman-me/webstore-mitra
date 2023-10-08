"use client";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";

const Promo = () => {
  return (
    <div>
      <AppBar allowBack={true} />
      <CatalogProducts title="Barang Promo" atribut={`promo=true`} />
    </div>
  );
};

export default Promo;
