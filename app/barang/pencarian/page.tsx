"use client";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";
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
      <AppBar allowBack={true} data={data} />
      <p className="underline font-semibold m-2">{`Pencarian ${query}`}</p>
      <CatalogProducts
        persentaseHarga={data.profit_percentage}
        atribut={`query=${query}`}
        path="products/search"
      />
    </div>
  );
};

export default Pencarian;
