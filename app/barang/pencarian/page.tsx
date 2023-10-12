import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";

export default async function Pencarian(req: any) {
  const { query } = req.searchParams;

  return (
    <div>
      <AppBar allowBack={true} />
      <CatalogProducts atribut={`query=${query}`} path="products/search" />
    </div>
  );
}
