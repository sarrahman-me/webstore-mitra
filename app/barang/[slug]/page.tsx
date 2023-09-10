/* eslint-disable @next/next/no-img-element */
"use client";
import { DetailProduct } from "@/src/layouts";
import { GetDataApi } from "@/src/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailProducts = () => {
  const params = useParams();
  const slug = params.slug;
  const [data, setdata] = useState({} as any);
  const [barang, setBarang] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi("/api/webstore");
      const responseBarang = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`
      );
      setBarang(responseBarang.data);
      setdata(response.data);
    }
    fetchData();
  }, [slug]);

  return (
    <div>
      {barang.nama_barang && (
        <DetailProduct
          barang={barang}
          profit_percentage={data.profit_percentage}
        />
      )}
    </div>
  );
};

export default DetailProducts;
