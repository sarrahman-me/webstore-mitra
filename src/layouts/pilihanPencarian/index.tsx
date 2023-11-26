"use client";
import { Typography } from "@/src/components/atoms";
import { GetDataApi } from "@/src/utils";
import { useRouter } from "next/navigation";
import { Loading } from "notiflix";
import { useEffect, useState } from "react";

const PilihanPencarian = () => {
  const router = useRouter();
  const [kategori, setKategori] = useState([] as any);
  const [ukuran, setUkuran] = useState([] as any);
  const [pilihan, setPilihan] = useState({
    kategori: "",
    ukuran: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const responseKategori = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/kategori`
      );
      setKategori(responseKategori?.data);
      const responseUkuran = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/ukuran`
      );
      setUkuran(responseUkuran?.data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full rounded p-1">
      {!pilihan.kategori && (
        <div className="bg-white dark:bg-gray-800 p-2 rounded">
          <Typography otherClass="my-2" align="center">
            Pilihan Kategori
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
            Pilihan Ukuran
          </Typography>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {ukuran.map((item: any, index: number) => (
              <Pill
                key={index}
                nama={item?.nama_ukuran}
                onClick={() => {
                  Loading.dots("Mencari...");
                  router.push(
                    `/barang/filter?kategori=${pilihan.kategori}&ukuran=${item?.nama_ukuran}`
                  );
                  Loading.remove();
                }}
              />
            ))}
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
      className="dark:text-white cursor-pointer bg-blue-200 hover:bg-blue-100 dark:bg-blue-600 dark:hover:bg-blue-700 text-center p-2 rounded border font-semibold"
    >
      {props.nama}
    </div>
  );
};
