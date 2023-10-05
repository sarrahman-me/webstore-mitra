/* eslint-disable @next/next/no-img-element */
import { IconSelect } from "@/src/components/molecules";
import {
  CatalogProducts,
  SectionLayout,
  SwiperProduct,
} from "@/src/components/oraganisms";
import { AppBar, KalkulatorKeramik, SimulasiKeramik } from "@/src/layouts";
import { GetDataApi, formatCurrency } from "@/src/utils";

const DetailBarang = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const responseBarang = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}`
  );

  const barang = responseBarang.data;

  const responseBarangSerupa = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang?kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`
  );

  const responseBarangSejenis = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang?nama=${barang.nama_barang}&brand=${barang.brand}`
  );

  const persentaseHarga = 5;

  const harga =
    Number(barang?.harga) + Number((barang?.harga * persentaseHarga) / 100);
  const hargaPromo =
    Number(barang?.harga_promo) +
    Number((barang?.harga_promo * persentaseHarga) / 100);

  const barangSejenis = responseBarangSejenis.data;
  const barangSerupa = responseBarangSerupa.data;

  // Fungsi untuk menghitung berapa persen potongannya
  const calculateDiscountPercentage = () => {
    if (barang?.promo) {
      const potongan = harga - hargaPromo;
      const persentasePotongan = (potongan / harga) * 100;
      return persentasePotongan.toFixed(0);
    }
    return "";
  };

  return (
    <div className="max-w-5xl mx-auto">
      <AppBar allowBack={true} nama_webstore={"Detail Keramik"} />
      <div className="flex flex-col md:flex-row my-2">
        <div className="md:w-1/3 flex justify-center items-center w-full m-2 md:m-0">
          <img
            src={barang.images[0]}
            alt={barang.slug}
            className="object-contain max-h-44 border"
          />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-md borde p-2 w-full shadow">
          <div className="divide-y-4 md:divide-y-8 divide-transparent ml-2">
            <p className="text-sm md:text-base text-indigo-500">
              {barang.kategori}
            </p>
            <p className="text-sm md:text-base font-semibold">
              {(barang?.nama_barang as string).toUpperCase()} - {barang.warna}
            </p>
            <p className="text-sm md:text-base">{barang.brand}</p>
            <p className="text-sm md:text-base">Stok {barang.stok} Dus</p>
            {barang.promo && (
              <p className="text-base font-semibold">
                {formatCurrency(Number(hargaPromo))}
              </p>
            )}
            <div className="text-sm md:text-base">
              {barang.promo ? (
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
      <p className="underline font-semibold m-2">Detail Produk</p>
      <SectionLayout>
        <div className="flex flex-col md:flex-row ml-2">
          <div className="text-sm md:text-base divide-y-8 divide-transparent my-2 w-1/2">
            <span className="flex items-center">
              <p className="font-medium mr-2">Ukuran:</p> {barang.ukuran}
            </span>
            <span className="flex items-center">
              <p className="font-medium mr-2">Kualitas:</p> {barang.kualitas}
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
      <div>
        <p className="underline font-semibold m-2">{`Design Patern`}</p>
        <SectionLayout>
          <SimulasiKeramik ukuran={barang.ukuran} imageUrl={barang.images[0]} />
        </SectionLayout>
      </div>
      <div>
        <p className="underline font-semibold m-2">{`Kalkulator`}</p>
        <SectionLayout>
          <KalkulatorKeramik
            ukuranBarang={barang.ukuran}
            hargaBarang={harga}
            isPromo={barang.promo}
            hargaPromo={hargaPromo}
          />
        </SectionLayout>
      </div>
      {barangSejenis.length > 1 ? (
        <div>
          <SwiperProduct
            persentaseHarga={persentaseHarga}
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
            persentaseHarga={persentaseHarga}
            atribut={`kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DetailBarang;
