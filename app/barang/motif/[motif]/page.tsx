import { SearchBar } from "@/src/components/molecules";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";

export default async function Motif({ params }: { params: { motif: string } }) {
  const motif = params.motif;

  return (
    <div>
      <AppBar allowBack={true} />
      <SearchBar />
      <p className="underline font-semibold m-2">Motif {motif}</p>
      <CatalogProducts atribut={`motif=${motif}`} />
    </div>
  );
}
