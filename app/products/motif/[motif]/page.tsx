import { AppBar, CatalogProductsFilter } from "@/src/components/oraganisms";

const ProductsByMotif = async ({ params }: { params: { motif: string } }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <AppBar backIcon={true} />
      <CatalogProductsFilter
        title={`Produk Motif ${params.motif}`}
        ukuran={""}
        motif={params.motif}
        tekstur={""}
      />
    </div>
  );
};

export default ProductsByMotif;
