/* eslint-disable @next/next/no-img-element */
"use client";
import { GetDataApi, formatCurrency } from "@/src/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailProducts = () => {
  const params = useParams();
  const slug = params.slug;
  const [data, setdata] = useState({} as any);
  const [barang, setBarang] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi("api/webstore");
      const responseBarang = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`
      );
      setBarang(responseBarang.data);
      setdata(response.data);
    }
    fetchData();
  }, [slug]);

  const harga =
    Number(barang?.harga) +
    Number((barang?.harga * data.profit_percentage) / 100);
  const hargaPromo =
    Number(barang?.harga_promo) +
    Number((barang?.harga_promo * data.profit_percentage) / 100);

  // Fungsi untuk menghitung berapa persen potongannya
  const calculateDiscountPercentage = () => {
    if (barang?.promo) {
      const potongan = harga - hargaPromo;
      const persentasePotongan = (potongan / harga) * 100;
      return persentasePotongan.toFixed(0);
    }
    return "";
  };

  if(!barang) return <p>Loading</p>

  return (
    <div>
      <div className="flex flex-col md:flex-row my-2">
        <div className="md:w-1/3 flex justify-center items-center w-full m-2 md:m-0">
          <img
            src={barang.images[0]}
            alt={barang.slug}
            className="object-contain max-h-44 border"
          />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md borde p-2 w-full shadow">
          <div className="divide-y-4 md:divide-y-8 divide-transparent ml-2">
            <p className="text-sm md:text-base text-indigo-500">
              {barang.kategori}
            </p>
            <p className="text-sm md:text-base font-semibold">
              {(barang?.nama_barang as string).toUpperCase()} - {barang.warna}
            </p>
            <p className="text-sm md:text-base">{barang.brand}</p>
            <p className="text-sm md:text-base">Stok {barang.stok} Dus</p>
            {barang.promo && (
              <p className="text-base font-semibold">
                {formatCurrency(Number(hargaPromo))}
              </p>
            )}
            <div className="text-sm md:text-base">
              {barang.promo ? (
                <span className="flex items-center text-xs">
                  <p className="bg-red-200 text-red-500 rounded p-0.5 mr-1">{`${calculateDiscountPercentage()}%`}</p>
                  <p className="text-gray-500 line-through">
                    {formatCurrency(Number(harga))}
                  </p>
                </span>
              ) : (
                <span className="text-base font-semibold">
                  {formatCurrency(Number(harga))}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProducts;
