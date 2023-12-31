"use client";
import { Typography } from "@/src/components/atoms";
import { GetDataApi } from "@/src/utils";
import { useRouter } from "next/navigation";
import { Loading } from "notiflix";
import { useEffect, useState } from "react";

const PilihanPencarian = () => {
  const router = useRouter();
  const [kategori, setKategori] = useState([] as any);
  const [pilihan, setPilihan] = useState({
    kategori: "",
    ukuran: "",
  });

  const daftarUkuran: Record<string, string[]> = {
    Keramik: [
      "25x25",
      "30x30",
      "40x40",
      "50x50",
      "60x60",
      "20x40",
      "25x40",
      "25x50",
      "30x60",
    ],
    Granit: ["60x60", "60x120", "30x60"],
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseKategori = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/kategori`
      );
      setKategori(responseKategori?.data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full rounded p-1">
      {!pilihan.kategori && (
        <div className="bg-white dark:bg-gray-800 p-2 rounded">
          <Typography otherClass="my-2" align="center">
            Pilih Kategori
          </Typography>
          <div className="grid grid-cols-2 gap-3">
            {kategori.map((item: any, index: number) => (
              <Pill
                key={index}
                nama={item?.nama_kategori}
                onClick={() =>
                  setPilihan({
                    ukuran: pilihan.ukuran,
                    kategori: item?.nama_kategori,
                  })
                }
              />
            ))}
          </div>
        </div>
      )}

      {pilihan.kategori && !pilihan.ukuran && (
        <div className="bg-white dark:bg-gray-800 p-2 rounded">
          <Typography otherClass="my-2" align="center">
            {pilihan.kategori} Ukuran ?
          </Typography>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {daftarUkuran[pilihan.kategori || "Keramik"].map(
              (item: any, index: number) => (
                <Pill
                  key={index}
                  nama={item}
                  onClick={() => {
                    Loading.dots("Mencari...");
                    router.push(
                      `/barang/filter?kategori=${pilihan.kategori}&ukuran=${item}`
                    );
                    Loading.remove();
                  }}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PilihanPencarian;

const Pill = (props: { nama: string; onClick: any }) => {
  return (
    <div
      onClick={props.onClick}
      className="cursor-pointer bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 text-white hover:bg-blue-100 dark:hover:bg-blue-900 text-center p-2 rounded border font-semibold"
    >
      {props.nama}
    </div>
  );
};
