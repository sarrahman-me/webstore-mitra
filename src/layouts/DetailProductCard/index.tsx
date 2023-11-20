/* eslint-disable @next/next/no-img-element */
"use client";
import { formatCurrency } from "@/src/utils";
import { useSelector } from "react-redux";

export default function DetailProductCard(props: { barang: any }) {
  const { percentaseMembership, webstore } = useSelector(
    (state: any) => state.webstore
  );

  const percentaseWebstore = webstore.profit_percentage;

  const hargaModal =
    Number(props.barang?.harga) +
    Number((props.barang?.harga * percentaseMembership) / 100);

  const harga =
    Number(hargaModal) + Number((hargaModal * percentaseWebstore) / 100);

  const hargaPromoModal =
    Number(props.barang?.harga_promo) +
    Number((props.barang?.harga_promo * percentaseMembership) / 100);

  const hargaPromo =
    Number(hargaPromoModal) +
    Number((hargaPromoModal * percentaseWebstore) / 100);

  // Fungsi untuk menghitung berapa persen potongannya
  const calculateDiscountPercentage = () => {
    if (props.barang?.promo) {
      const potongan = harga - hargaPromo;
      const persentasePotongan = (potongan / harga) * 100;
      return persentasePotongan.toFixed(0);
    }
    return "";
  };

  return (
    <div className="my-2">
      <div className="flex justify-center items-center m-2">
        <img
          src={props.barang.images[0]}
          alt={props.barang.slug}
          width={250}
          height={250}
        />
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-md borde p-2 w-full shadow">
        <div className="divide-y-4 md:divide-y-8 divide-transparent ml-2">
          <p className="text-sm md:text-base text-indigo-500">
            {props.barang.kategori}
          </p>
          <p className="text-sm md:text-base font-semibold">
            {(props.barang?.nama_barang as string).toUpperCase()} -{" "}
            {props.barang.warna}
          </p>
          <p className="text-sm md:text-base">{props.barang.brand}</p>
          {webstore.show_stock && (
            <p className="text-sm md:text-base">Stok {props.barang.stok} Dus</p>
          )}
          {webstore.show_price && (
            <div>
              {props.barang.promo && (
                <p className="text-base font-semibold">
                  {formatCurrency(Number(hargaPromo))}
                </p>
              )}
              <div className="text-sm md:text-base">
                {props.barang.promo ? (
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
          )}
        </div>
        {/* <TombolPesan /> */}
      </div>
    </div>
  );
}
