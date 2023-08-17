"use client";
import { useState } from "react";
import { HitungKeramik } from "@/src/functions";
import { Button, HeaderSection, Input } from "../../atoms";

const KalkulatorKeramik = (props: {
  kategoriBarang: string;
  hargaBarang: number;
}) => {
  const [panjang, setPanjang] = useState(0);
  const [lebar, setLebar] = useState(0);
  const [hasil, setHasil] = useState({} as any);

  const handleHitung = (e: any) => {
    e.preventDefault();
    const hasilHitung = HitungKeramik(props.kategoriBarang, panjang, lebar);
    setHasil(hasilHitung);
  };

  return (
    <div className="bg-white py-4 px-4 flex md:border flex-col shadow rounded my-3 p-2">
      <HeaderSection title="Kalkulator Keramik" />
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
      {hasil && hasil?.kebutuhan && (
        <div>
          <p className="md:text-lg font-medium my-3">
            {`Kebutuhan: ${hasil?.kebutuhan} dus`}
          </p>
          <p className="md:text-lg font-medium my-3">
            {`Estimasi Biaya: Rp ${(
              hasil?.kebutuhan * props.hargaBarang
            ).toLocaleString()}*`}{" "}
            <span className="text-sm text-gray-500">{`(*berdasarkan hasil kebutuhan dan harga barang)`}</span>
          </p>
          <p className="md:text-lg font-medium my-3">
            Diameter Ruangan: {hasil?.diameter_ruang} m<sup>2</sup>
          </p>
          <p className="md:text-lg font-medium my-3">
            Diameter Perdus: {hasil?.diameter_perdus} m
          </p>
        </div>
      )}
    </div>
  );
};

export default KalkulatorKeramik;
