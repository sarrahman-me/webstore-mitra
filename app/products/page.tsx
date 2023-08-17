import {
  AppBar,
  CatalogProducts,
  SearchBar,
} from "@/src/components/oraganisms";

const Products = async () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <AppBar backIcon={true} />
      <SearchBar />
      <CatalogProducts />
    </div>
  );
};

export default Products;
