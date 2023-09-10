import { formatCurrency } from "@/src/utils";

/* eslint-disable @next/next/no-img-element */
export default function DetailProduct(props: {
  barang: any;
  profit_percentage: number;
}) {
  const harga =
    Number(props.barang?.harga) +
    Number((props.barang?.harga * props.profit_percentage) / 100);
  const hargaPromo =
    Number(props.barang?.harga_promo) +
    Number((props.barang?.harga_promo * props.profit_percentage) / 100);

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
    <div className="flex flex-col md:flex-row my-2">
      <div className="md:w-1/3 flex justify-center items-center w-full m-2 md:m-0">
        <img
          src={props.barang.images[0]}
          alt={props.barang.slug}
          className="object-contain max-h-44 border"
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
          <p className="text-sm md:text-base">Stok {props.barang.stok} Dus</p>
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
      </div>
    </div>
  );
}
