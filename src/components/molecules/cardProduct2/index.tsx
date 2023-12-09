/* eslint-disable @next/next/no-img-element */
"use client";
import { formatCurrency } from "@/src/utils";
import { useRouter } from "next/navigation";
import { FaThumbsUp } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { useSelector } from "react-redux";

const CardProduct2 = (props: { barang: any }) => {
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
      className="bg-white dark:bg-slate-800 flex rounded cursor-pointer shadow hover:shadow-md"
    >
      {/* gambar card product */}

      <div className="w-1/3 flex justify-center items-center">
        <img
          className="object-contain max-h-28 md:max-h-36 lg:max-h-40 max-w-28 md:max-w-36 lg:max-w-40 border"
          src={props.barang.images[0]}
          alt={props.barang.nama_barang}
        />
      </div>

      {/* detail singkat products */}
      <div className="w-2/3 p-1 space-y-2">
        {/* kategori dan tekstur */}

        <p className="text-xs text-blue-500">
          {props.barang?.kategori} {props.barang.tekstur}
        </p>

        {/* nama barang */}
        <p className="text-xs md:text-sm">{props.barang?.nama_barang}</p>

        {/* harga barang */}
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

        {/* stok barang */}
        {webstore.show_stock && (
          <div>
            <p className="text-xs md:text-sm">Stok: {props.barang.stok}</p>
          </div>
        )}

        {/* kualitas barang dan ukuran */}

        <div className="text-xs">
          <p>{props.barang?.kualitas}</p>

          <p>{props.barang?.ukuran}</p>
        </div>

        {/* label barang */}
        <div className="flex items-center space-x-2">
          {/* label promo dan memiliki stok banyak */}

          {props.barang.promo &&
            webstore.show_price &&
            props.barang.stok > 500 && (
              <div className="bg-green-500 text-white text-xs p-1 rounded-full flex items-center">
                <FaThumbsUp className="text-white" />
              </div>
            )}

          {/* label promo  */}
          {props.barang.promo && webstore.show_price && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              {Number(calculateDiscountPercentage()) >= 15 ? (
                <ImFire className="text-white mr-1" />
              ) : null}
              {Number(calculateDiscountPercentage()) >= 15 ? "Hot" : "Promo"}
            </div>
          )}

          {/* label baru */}
          {isNewProduct() && !props.barang.promo && (
            <div className="bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 text-white text-xs px-2 py-1 rounded-full">
              Baru
            </div>
          )}

          {/* label stok banyak atau sedikit */}
          {webstore.show_stock && (
            <div>
              {props.barang.stok > 500 ? (
                <div className="bg-gradient-to-br from-green-300 to-green-500 dark:from-green-700 dark:to-green-900 text-white max-w-fit px-2 text-xs p-0.5 rounded-full">
                  Tersedia
                </div>
              ) : props.barang.stok < 50 && props.barang.stok > 0 ? (
                <div className="bg-gradient-to-br from-orange-300 to-orange-500 dark:from-orange-700 dark:to-orange-900 text-white max-w-fit px-2 text-xs p-0.5 rounded-full">
                  Terbatas
                </div>
              ) : props.barang.stok == 0 ? (
                <div className="bg-gradient-to-br from-red-300 to-red-500 dark:from-red-700 dark:to-red-900 text-white max-w-fit px-2 text-xs p-0.5 rounded-full">
                  Habis
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProduct2;
