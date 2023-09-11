/* eslint-disable @next/next/no-img-element */
"use client";
import { IconSelect } from "@/src/components/molecules";
import {
  CatalogProducts,
  SectionLayout,
  SwiperProduct,
} from "@/src/components/oraganisms";
import { AppBar, DetailProduct, KalkulatorKeramik } from "@/src/layouts";
import { GetDataApi } from "@/src/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailProducts = () => {
  const params = useParams();
  const slug = params.slug;
  const [data, setdata] = useState({} as any);
  const [barang, setBarang] = useState({} as any);
  const [barangSerupa, setBarangSerupa] = useState([] as any);
  const [barangSejenis, setBarangSejenis] = useState([] as any);

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi("/api/webstore");
      const responseBarang = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`
      );
      const responseBarangSerupa = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?kategori=${responseBarang.data.kategori}&ukuran=${responseBarang.data.ukuran}&motif=${responseBarang.data.motif}&tekstur=${responseBarang.data.tekstur}`
      );

      const responseBarangSejenis = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?nama=${responseBarang.data.nama_barang}&brand=${responseBarang.data.brand}`
      );
      setBarangSerupa(responseBarangSerupa.data);
      setBarangSejenis(responseBarangSejenis.data);
      setBarang(responseBarang.data);
      setdata(response.data);
    }
    fetchData();
  }, [slug]);

  const harga =
    Number(barang?.harga) +
    Number((barang?.harga * data.profit_percentage) / 100);
  const hargaPromo =
    Number(barang?.harga_promo) +
    Number((barang?.harga_promo * data.profit_percentage) / 100);

  return (
    <div>
      <AppBar allowBack={true} data={data} />
      {barang.slug && (
        <div>
          <DetailProduct
            barang={barang}
            profit_percentage={data.profit_percentage}
          />
          <p className="underline font-semibold m-2">Detail Produk</p>
          <SectionLayout>
            <div className="flex flex-col md:flex-row ml-2">
              <div className="text-sm md:text-base divide-y-8 divide-transparent my-2 w-1/2">
                <span className="flex items-center">
                  <p className="font-medium mr-2">Ukuran:</p> {barang.ukuran}
                </span>
                <span className="flex items-center">
                  <p className="font-medium mr-2">Kualitas:</p>{" "}
                  {barang.kualitas}
                </span>
                <span className="flex items-center">
                  <p className="font-medium mr-2">Motif:</p> {barang.motif}
                </span>
                <span className="flex items-center">
                  <p className="font-medium mr-2">Tekstur:</p> {barang.tekstur}
                </span>
              </div>
              <div className="w-1/2">
                <div className="my-2">
                  <div className="my-2">
                    <IconSelect options={barang.penggunaan_umum} />
                  </div>
                </div>
                <div className="my-2">
                  <div className="my-2">
                    <IconSelect options={barang.area_penggunaan} />
                  </div>
                </div>
              </div>
            </div>
          </SectionLayout>
          <p className="underline font-semibold m-2">{`Kalkulator`}</p>
          <SectionLayout>
            <KalkulatorKeramik
              ukuranBarang={barang.ukuran}
              hargaBarang={harga}
              isPromo={barang.promo}
              hargaPromo={hargaPromo}
            />
          </SectionLayout>
          {barangSejenis.length > 1 ? (
            <div>
              <SwiperProduct
                persentaseHarga={data.profit_percentage}
                products={barangSejenis}
                title={"Motif Lainnya"}
                url={""}
              />
            </div>
          ) : null}
          {barangSerupa.length > 1 ? (
            <div>
              <p className="underline font-semibold m-2">{`Rekomendasi`}</p>
              <CatalogProducts
                persentaseHarga={data.profit_percentage}
                atribut={`kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DetailProducts;
