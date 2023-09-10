"use client";
import { useState } from "react";
import { Button, Input } from "@/src/components/atoms";
import { HitungKeramik } from "@/src/functions";
import { formatCurrency } from "@/src/utils";

const KalkulatorKeramik = (props: {
  ukuranBarang: string;
  hargaBarang: number;
  isPromo: boolean;
  hargaPromo: number;
}) => {
  const [panjang, setPanjang] = useState(0);
  const [lebar, setLebar] = useState(0);
  const [hasil, setHasil] = useState({} as any);

  // Fungsi untuk menghitung berapa persen potongannya
  const calculateDiscountPercentage = () => {
    if (props.isPromo) {
      const harga = Number(props.hargaBarang);
      const hargaPromo = Number(props?.hargaPromo);
      const potongan = harga - hargaPromo;
      const persentasePotongan = (potongan / harga) * 100;
      return persentasePotongan.toFixed(0);
    }
    return "";
  };

  const handleHitung = (e: any) => {
    e.preventDefault();
    const hasilHitung = HitungKeramik(props.ukuranBarang, panjang, lebar);
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
      {hasil?.kebutuhan && (
        <div className="divide-y-8 divide-transparent m-2">
          <p className="text-base flex items-center">
            Kebutuhan: {hasil?.kebutuhan} dus
          </p>
          {props.isPromo && (
            <p className="text-base divide-y-4 divide-transparent">
              Estimasi Biaya:
              {formatCurrency(Number(props.hargaPromo) * hasil?.kebutuhan)}*
              <p className="text-xs">
                (*berdasarkan hasil kebutuhan dan harga barang)
              </p>
              <p className="text-xs text-green-500">
                Kamu hemat{" "}
                {formatCurrency(
                  Number(props.hargaBarang) * hasil?.kebutuhan -
                    Number(props.hargaPromo) * hasil?.kebutuhan
                )}
              </p>
            </p>
          )}
          <div className="text-sm md:text-base">
            {props.isPromo ? (
              <span className="flex items-center text-xs">
                <p className="bg-red-200 text-red-500 rounded p-0.5 mr-1">{`${calculateDiscountPercentage()}%`}</p>
                <p className="text-gray-500 line-through">
                  {formatCurrency(Number(props.hargaBarang) * hasil?.kebutuhan)}
                </p>
              </span>
            ) : (
              <span className="text-base divide-y-4 divide-transparent">
                Estimasi Biaya:
                {formatCurrency(Number(props.hargaBarang) * hasil?.kebutuhan)}
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
