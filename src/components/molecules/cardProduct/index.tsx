/* eslint-disable @next/next/no-img-element */
"use client";
import { ImFire } from "react-icons/im";
import { formatCurrency } from "@/src/utils";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";

const CardProduct = (props: { barang: any }) => {
  const router = useRouter();
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

  // Fungsi untuk memeriksa apakah barang baru
  const isNewProduct = () => {
    const createdAt = new Date(props.barang?.createdAt);
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7); // Kurangi 7 hari dari tanggal saat ini

    return createdAt >= oneWeekAgo;
  };

  return (
    <div
      onClick={() => {
        router.push(`/barang/${props.barang.slug}`);
      }}
      className={`bg-white dark:bg-slate-800 rounded shadow cursor-pointer relative hover:shadow-md`}
    >
      {props.barang.promo && webstore.show_price && props.barang.stok > 500 && (
        <div className="bg-green-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0 flex items-center">
          <FaThumbsUp className="text-white mr-1" />
          Terbaik
        </div>
      )}

      {props.barang.promo && webstore.show_price && props.barang.stok < 500 && (
        <div className="bg-red-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0 flex items-center">
          {Number(calculateDiscountPercentage()) >= 15 ? (
            <ImFire className="text-white mr-1" />
          ) : null}
          {Number(calculateDiscountPercentage()) >= 15 ? "Hot" : "Promo"}
        </div>
      )}

      {isNewProduct() && !props.barang.promo && (
        <div className="bg-blue-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0">
          Baru
        </div>
      )}

      <div className="flex justify-center">
        <img
          className="object-contain max-h-28 md:max-h-36 lg:max-h-40 border"
          src={props.barang?.images[0]}
          alt={props.barang?.nama_barang}
        />
      </div>
      {webstore.show_stock && (
        <div>
          {props.barang.stok > 500 ? (
            <div className="bg-gradient-to-br from-green-300 to-green-500 dark:from-green-700 dark:to-green-900 text-white max-w-fit px-2 text-xs p-0.5 rounded-br">
              Tersedia
            </div>
          ) : props.barang.stok < 100 && props.barang.stok > 0 ? (
            <div className="bg-gradient-to-br from-orange-300 to-orange-500 dark:from-orange-700 dark:to-orange-900 text-white max-w-fit px-2 text-xs p-0.5 rounded-br">
              Terbatas
            </div>
          ) : props.barang.stok == 0 ? (
            <div className="bg-gradient-to-br from-red-300 to-red-500 dark:from-red-700 dark:to-red-900 text-white max-w-fit px-2 text-xs p-0.5 rounded-br">
              Habis
            </div>
          ) : null}
        </div>
      )}

      <div className="p-1 divide-y-2 md:divide-y-4 divide-transparent">
        <p className="text-xs text-blue-500">
          {props.barang?.kategori} {props.barang.tekstur}
        </p>
        <p className="text-xs md:text-sm">{props.barang?.nama_barang}</p>
        {webstore.show_price && (
          <div>
            {props.barang.promo ? (
              <p className="text-xs md:text-sm font-semibold">
                {formatCurrency(hargaPromo)}
              </p>
            ) : (
              <p className="text-xs md:text-sm font-semibold">
                {formatCurrency(harga)}
              </p>
            )}
            {props.barang.promo && (
              <span className="flex items-center text-xs">
                <p className="text-xs md:bg-red-200 text-red-500 rounded p-0.5 mr-1">{`${calculateDiscountPercentage()}%`}</p>
                <p className="text-xs text-gray-400 line-through">
                  {formatCurrency(harga)}
                </p>
              </span>
            )}
          </div>
        )}
        {webstore.show_stock && (
          <div>
            <p className="text-xs md:text-sm">Stok: {props.barang.stok}</p>
          </div>
        )}
        <div className="text-xs flex justify-between items-center">
          <div className="flex items-center divide-x-8 divide-transparent">
            <p>{props.barang?.kualitas}</p>
          </div>
          <p>{props.barang?.ukuran}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
