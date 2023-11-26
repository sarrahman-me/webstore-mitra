import { SearchBar } from "@/src/components/molecules";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";

export default async function Motif({
  searchParams,
}: {
  searchParams: { kategori: string; ukuran: string };
}) {
  const queryAtribute = `kategori=${searchParams.kategori}&ukuran=${searchParams.ukuran}`;

  return (
    <div>
      <AppBar allowBack={true} />
      <SearchBar />
      <p className="underline font-semibold m-2">
        Promo {searchParams.kategori} {searchParams.ukuran}
      </p>
      <CatalogProducts
        limit="100"
        unPagination={true}
        atribut={`${queryAtribute}&promo=true`}
      />
      <p className="underline font-semibold m-2">
        Pilihan {searchParams.kategori} {searchParams.ukuran}
      </p>
      <CatalogProducts
        unPagination={true}
        limit="100"
        atribut={queryAtribute}
      />
    </div>
  );
}
