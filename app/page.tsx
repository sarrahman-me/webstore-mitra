import config from "@/config";
import { SwiperProduct } from "@/src/components/molecules";
import {
  AppBar,
  CatalogProducts,
  MotifList,
  SearchBar,
} from "@/src/components/oraganisms";
import { GetDataApi } from "@/src/utils";

const Home = async () => {
  const response = await GetDataApi(
    `${config.NEXT_PUBLIC_HOST}/barang/new?page=1&limit=15`
  );

  const productSerupa = response.data;

  return (
    <div className="bg-gray-100 min-h-screen">
      <AppBar />
      <SearchBar />
      <SwiperProduct products={productSerupa} title={"Barang Terbaru"} />
      <MotifList />
      <CatalogProducts />
    </div>
  );
};

export default Home;
