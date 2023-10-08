"use client";
import { useState } from "react";
import { Button, Input } from "@/src/components/atoms";
import { HitungKeramik } from "@/src/functions";
import { formatCurrency } from "@/src/utils";
import { useSelector } from "react-redux";

const KalkulatorKeramik = (props: { barang: any }) => {
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

  const [panjang, setPanjang] = useState(0);
  const [lebar, setLebar] = useState(0);
  const [hasil, setHasil] = useState({} as any);

  const handleHitung = (e: any) => {
    e.preventDefault();
    const hasilHitung = HitungKeramik(props.barang?.ukuran, panjang, lebar);
    setHasil(hasilHitung);
  };

  return (
    <div>
      <form onSubmit={handleHitung} className="divide-transparent divide-y-8">
        <Input
          label={"Panjang Ruangan"}
          name={"panjang"}
          onChange={(event) => setPanjang(event.target.value)}
        />
        <Input
          label={"Lebar Ruangan"}
          name={"lebar"}
          onChange={(event) => setLebar(event.target.value)}
        />
        <Button isSubmit={true}>Hitung</Button>
      </form>

      {/* hasil perhitungan */}

      {hasil?.kebutuhan && (
        <div className="divide-y-8 divide-transparent m-2">
          <p className="text-base flex items-center">
            Kebutuhan: {hasil?.kebutuhan} dus
          </p>
          {props.barang.promo && (
            <p className="text-base divide-y-4 divide-transparent">
              Estimasi Biaya:
              {formatCurrency(hargaPromo * hasil?.kebutuhan)}*
              <p className="text-xs">
                (*berdasarkan hasil kebutuhan dan harga barang)
              </p>
              <p className="text-xs text-green-600">
                Kamu hemat{" "}
                {formatCurrency(
                  harga * hasil?.kebutuhan - hargaPromo * hasil?.kebutuhan
                )}
              </p>
            </p>
          )}
          <div className="text-sm md:text-base">
            {props.barang.promo ? (
              <span className="flex items-center text-xs">
                <p className="bg-red-200 text-red-500 rounded p-0.5 mr-1">{`${calculateDiscountPercentage()}%`}</p>
                <p className="text-gray-500 line-through">
                  {formatCurrency(Number(harga) * hasil?.kebutuhan)}
                </p>
              </span>
            ) : (
              <span className="text-base divide-y-4 divide-transparent">
                Estimasi Biaya:
                {formatCurrency(Number(harga) * hasil?.kebutuhan)}
                <p className="text-xs">
                  (*berdasarkan hasil kebutuhan dan harga barang)
                </p>
              </span>
            )}
          </div>
          <p className="text-sm md:text-base">
            Diameter Ruangan: {hasil?.diameter_ruang} m<sup>2</sup>
          </p>
          <p className="text-sm md:text-base">
            Diameter Perdus: {(hasil?.diameter_perdus as number).toFixed(2)} m
            <sup>2</sup>
          </p>
        </div>
      )}
    </div>
  );
};

export default KalkulatorKeramik;
