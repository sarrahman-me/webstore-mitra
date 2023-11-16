/* eslint-disable @next/next/no-img-element */
import { IconSelect, SearchBar } from "@/src/components/molecules";
import {
  CatalogProducts,
  SectionLayout,
  SwiperProduct,
} from "@/src/components/oraganisms";
import {
  AppBar,
  DetailProductCard,
  KalkulatorKeramik,
  SimulasiKeramik,
} from "@/src/layouts";
import { GetDataApi } from "@/src/utils";

const DetailBarang = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const responseBarang = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}?track=true`
  );

  const barang = responseBarang.data;

  const responseBarangSerupa = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang?kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`
  );

  const responseBarangSejenis = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang?nama=${barang.nama_barang}&brand=${barang.brand}`
  );

  const barangSejenis = responseBarangSejenis.data;
  const barangSerupa = responseBarangSerupa.data;

  return (
    <div>
      <AppBar allowBack={true} />
      <div className="max-w-3xl mx-auto">
        <SearchBar />
        <DetailProductCard barang={barang} />
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
            <SimulasiKeramik
              ukuran={barang.ukuran}
              imageUrl={barang.images[0]}
            />
          </SectionLayout>
        </div>
        <p className="underline font-semibold m-2">{`Kalkulator`}</p>
        <SectionLayout>
          <KalkulatorKeramik barang={barang} />
        </SectionLayout>
      </div>
      {barangSejenis.length > 1 ? (
        <div>
          <SwiperProduct
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
            atribut={`kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DetailBarang;
