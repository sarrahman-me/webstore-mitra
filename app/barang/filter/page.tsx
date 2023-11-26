"use client";
import { SearchBar } from "@/src/components/molecules";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Motif() {
  const { webstore } = useSelector((state: any) => state.webstore);
  const searchParams = useSearchParams();
  const kategori = searchParams.get("kategori");
  const ukuran = searchParams.get("ukuran");
  const queryAtribute = `kategori=${kategori}&ukuran=${ukuran}`;

  return (
    <div>
      <AppBar allowBack={true} />
      <SearchBar />
      {webstore.show_price && (
        <div>
          <p className="underline font-semibold m-2">
            Promo {kategori} {ukuran}
          </p>
          <CatalogProducts
            limit="100"
            unPagination={true}
            atribut={`${queryAtribute}&promo=true`}
          />
        </div>
      )}
      <p className="underline font-semibold m-2">
        Pilihan {kategori} {ukuran}
      </p>
      <CatalogProducts
        unPagination={true}
        limit="100"
        atribut={queryAtribute}
      />
    </div>
  );
}
