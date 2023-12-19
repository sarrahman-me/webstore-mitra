import WhatsappIcon from "@/src/components/molecules/whatsappIcon";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";

export default async function Pencarian(req: any) {
  const { query } = req.searchParams;

  return (
    <div>
      <AppBar allowBack={true} />
      <p className="underline font-semibold m-2">Hasil pencarian</p>
      <CatalogProducts
        limit="100"
        unPagination={true}
        atribut={`query=${query}`}
        path="products/search"
      />
      <WhatsappIcon />
    </div>
  );
}
