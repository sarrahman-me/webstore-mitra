"use client";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";

const Promo = () => {
  return (
    <div>
      <AppBar allowBack={true} nama_webstore={"test"} />
      <CatalogProducts persentaseHarga={5} atribut={`promo=true`} />
    </div>
  );
};

export default Promo;
