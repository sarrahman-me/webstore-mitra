"use client";
import { CatalogProducts } from "@/src/components/oraganisms";
import { GetDataApi } from "@/src/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Pencarian = () => {
  const params = useSearchParams();
  const query = params.get("query");
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
      <div className="text-center bg-white dark:bg-slate-800 p-4">
        <p className="font-semibold">{data.nama_webstore}</p>
      </div>
      <p className="underline font-semibold m-2">{"Semua Barang"}</p>
      <CatalogProducts
        persentaseHarga={data.profit_percentage}
        atribut={`query=${query}`}
        path="products/search"
      />
    </div>
  );
};

export default Pencarian;
