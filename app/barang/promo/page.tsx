"use client";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";
import { GetDataApi } from "@/src/utils";
import { useEffect, useState } from "react";

const Promo = () => {
  const [data, setdata] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi("/api/webstore");
      setdata(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <AppBar allowBack={true} data={data} />
      <p className="underline font-semibold m-2">{"Promo"}</p>
      <CatalogProducts
        persentaseHarga={data.profit_percentage}
        atribut={`promo=true`}
      />
    </div>
  );
};

export default Promo;
