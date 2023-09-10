/* eslint-disable @next/next/no-img-element */
"use client";
import { formatCurrency } from "@/src/utils";
import { useRouter } from "next/navigation";

const CardProduct = (props: { product: any; persentaseHarga: number }) => {
  const harga =
    Number(props.product?.harga) +
    Number((props.product?.harga * props.persentaseHarga) / 100);
  const hargaPromo =
    Number(props.product?.harga_promo) +
    Number((props.product?.harga_promo * props.persentaseHarga) / 100);
  const router = useRouter();

  // Fungsi untuk memeriksa apakah barang baru
  const isNewProduct = () => {
    const createdAt = new Date(props.product?.createdAt);
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7); // Kurangi 7 hari dari tanggal saat ini

    return createdAt >= oneWeekAgo;
  };

  // Fungsi untuk menghitung berapa persen potongannya
  const calculateDiscountPercentage = () => {
    if (props.product?.promo) {
      const potongan = harga - hargaPromo;
      const persentasePotongan = (potongan / harga) * 100;
      return persentasePotongan.toFixed(0);
    }
    return "";
  };

  return (
    <div
      onClick={() => {
        router.push(`/barang/${props.product.slug}`);
      }}
      className={`bg-white dark:bg-slate-800 rounded shadow cursor-pointer relative hover:shadow-md`}
    >
      {isNewProduct() && (
        <div className="bg-indigo-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0">
          Baru
        </div>
      )}

      <div className="flex justify-center">
        <img
          className="object-contain max-h-44 border"
          src={props.product?.images[0]}
          alt={props.product?.nama_barang}
        />
      </div>
      <div className="p-1 divide-y-4 divide-transparent">
        <p className="text-xs text-indigo-500">{props.product?.kategori}</p>
        <p className="text-xs">
          {(props.product?.nama_barang as string).toUpperCase()}
        </p>
        {props.product.promo ? (
          <p className="text-sm font-semibold">{formatCurrency(hargaPromo)}</p>
        ) : (
          <p className="text-sm font-semibold">{formatCurrency(harga)}</p>
        )}
        {props.product.promo && (
          <span className="flex items-center text-xs">
            <p className="bg-red-200 text-red-500 rounded p-0.5 mr-1">{`${calculateDiscountPercentage()}%`}</p>
            <p className="text-gray-400 line-through">
              {formatCurrency(harga)}
            </p>
          </span>
        )}
        <div className="text-xs flex justify-between items-center">
          <div className="flex items-center divide-x-8 divide-transparent">
            <p>{props.product?.tekstur}</p>
            {/* <p>{props.product?.stok} Dus</p> */}
          </div>
          <p>{props.product?.ukuran}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
