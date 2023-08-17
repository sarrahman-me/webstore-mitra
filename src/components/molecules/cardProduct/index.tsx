/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";

const CardProduct = (props: { product: any }) => {
  const router = useRouter();

  // Cek apakah stok berada di bawah atau sama dengan 100
  const isOutOfStock = props.product?.stok <= 100;

  // Fungsi untuk memeriksa apakah barang baru
  const isNewProduct = () => {
    const createdAt = new Date(props.product?.createdAt);
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7); // Kurangi 7 hari dari tanggal saat ini

    return createdAt >= oneWeekAgo;
  };

  return (
    <div
      onClick={() => {
        router.push(`/products/${props.product.slug}`);
      }}
      className={`bg-gray-50 rounded shadow m-2 cursor-pointer relative hover:shadow-md`} // Tambahkan class relative
    >
      {/* Tambahkan label "Baru" menggunakan class absolute */}
      {isNewProduct() && (
        <div className="bg-green-500 text-white text-xs md:text-base px-2 py-1 rounded-tl-md rounded-br-md absolute top-0 left-0">
          Baru
        </div>
      )}

      <div className="flex justify-center">
        <img
          className="md:w-44 md:h-44 w-32 h-32 object-cover"
          src={props.product?.images[0]}
          alt={props.product?.nama_barang}
        />
      </div>
      <p className="md:text-base text-xs text-center font-bold">
        {(props.product?.nama_barang as string).toUpperCase()}
      </p>
      <div
        className={`text-xs rounded-full py-1 px-2 mt-2 ${
          isOutOfStock ? "" : ""
        }`}
      >
        <div className="flex justify-between">
          <div>
            {props.product?.kualitas}{" "}
            {isOutOfStock ? (
              <span className="font-semibold text-red-600">
                ({props.product?.stok})
              </span>
            ) : (
              <span className="font-semibold">({props.product?.stok})</span>
            )}
          </div>
          <div>
            <p>{props.product?.ukuran}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
