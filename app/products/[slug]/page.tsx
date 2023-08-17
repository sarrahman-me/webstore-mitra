/* eslint-disable @next/next/no-img-element */
import config from "@/config";
import {
  AlamatToko,
  DeskripsiProduct,
  KalkulatorKeramik,
  SimulasiKeramik,
  WhatsappButton,
} from "@/src/components/molecules";
import {
  AppBar,
  CatalogProductsFilter,
  DetailProduct,
} from "@/src/components/oraganisms";
import { GetDataApi } from "@/src/utils";

async function Product({ params }: { params: { slug: string } }) {
  const data = await GetDataApi(
    `${config.NEXT_PUBLIC_HOST}/barang/${params.slug}`
  );

  const Barang = data.data;

  return (
    <div className="bg-gray-100">
      <AppBar backIcon={true} />
      <div className="max-w-3xl mx-auto">
        <DetailProduct
          product={Barang}
          hargaJual={Number(Barang?.harga)}
          whatsappMitra="+6282157758174"
        />
        <DeskripsiProduct product={Barang} />
        <SimulasiKeramik imageUrl={Barang?.images[0]} />
        <KalkulatorKeramik
          kategoriBarang={Barang?.kategori}
          hargaBarang={Number(Barang?.harga)}
        />
        <WhatsappButton barang={Barang} phone="+6282157758174" />
        <AlamatToko />
      </div>
      <CatalogProductsFilter
        title="Rekomendasi"
        ukuran={Barang.ukuran}
        motif={Barang.motif}
        tekstur={Barang.tekstur}
      />
    </div>
  );
}

export default Product;
