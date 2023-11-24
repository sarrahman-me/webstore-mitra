"use client";
import { Typography } from "@/src/components/atoms";
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
    <div className="w-full rounded p-2">
      {!pilihan.kategori && (
        <div>
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
        <div className="bg-white p-2 rounded">
          <Typography otherClass="my-2" align="center">
            Pilih Ukuran
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
          <p className="underline font-semibold m-2">Rekomendasi Pilihan</p>
          <CatalogProducts
            limit="100"
            unPagination={true}
            atribut={`kategori=${pilihan.kategori}&ukuran=${pilihan.ukuran}`}
          />
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
      className="cursor-pointer hover:bg-white text-center p-2 rounded border bg-indigo-50"
    >
      {props.nama}
    </div>
  );
};
