"use client";
import { Button, Typography } from "@/src/components/atoms";
import { CatalogProducts } from "@/src/components/oraganisms";
import { GetDataApi } from "@/src/utils";
import { useEffect, useState } from "react";

const PilihanPencarian = () => {
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
                onClick={() =>
                  setPilihan({
                    kategori: pilihan.kategori,
                    ukuran: item?.nama_ukuran,
                  })
                }
              />
            ))}
          </div>
        </div>
      )}

      {pilihan.kategori && pilihan.ukuran && (
        <div>
          <p className="underline font-semibold m-2">
            Pilihan {pilihan.kategori} {pilihan.ukuran}
          </p>
          <CatalogProducts
            limit="100"
            unPagination={true}
            atribut={`kategori=${pilihan.kategori}&ukuran=${pilihan.ukuran}`}
          />
          <div className="flex justify-center">
            <Button
              onClick={() => {
                setPilihan({
                  kategori: "",
                  ukuran: "",
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              variant="outlined"
            >
              Pilih ulang
            </Button>
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
      className="dark:text-white cursor-pointer bg-indigo-200 hover:bg-indigo-100 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-center p-2 rounded border font-semibold"
    >
      {props.nama}
    </div>
  );
};
