"use client";
import { FaWhatsapp } from "react-icons/fa6";
import { Button, Typography } from "@/src/components/atoms";
import { SearchBar } from "@/src/components/molecules";
import { MdFavoriteBorder } from "react-icons/md";
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
import DeskripsiProduk from "@/src/layouts/deskripsiProduct";
import { GetDataApi } from "@/src/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DetailBarang = () => {
  const params = useParams();
  const slug = params.slug;
  const [barangSejenis, setBarangSejenis] = useState([] as any);
  const [barangSerupa, setBarangSerupa] = useState([] as any);
  const [barang, setBarang] = useState({} as any);
  const { domain } = useSelector((state: any) => state.webstore);
  const [isLiked, setIsLiked] = useState(false);

  const whatsappNumber = "+6282225601468";

  useEffect(() => {
    const fetchData = async () => {
      const responseBarang = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang/${slug}?track=true&source=${domain}`
      );

      const barang = responseBarang.data;

      const responseBarangSerupa = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?kategori=${barang?.kategori}&ukuran=${barang?.ukuran}&motif=${barang?.motif}&tekstur=${barang?.tekstur}&minstok=25`
      );

      const responseBarangSejenis = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?nama=${barang?.nama_barang}&brand=${barang?.brand}`
      );
      setBarang(barang);
      setBarangSerupa(responseBarangSerupa.data);
      setBarangSejenis(responseBarangSejenis.data);

      // Cek apakah barang sudah ada di wishlist ketika komponen dimuat
      const existingFavorites = JSON.parse(
        window.localStorage.getItem("favoriteProduct") || "[]"
      );

      const isProductInFavorites = existingFavorites.includes(slug);
      setIsLiked(isProductInFavorites);
    };
    fetchData();
  }, [domain, slug]);

  const handleLike = () => {
    const existingFavorites = JSON.parse(
      window.localStorage.getItem("favoriteProduct") || "[]"
    );

    const isProductInFavorites = existingFavorites.includes(slug);

    if (isProductInFavorites) {
      // Hapus barang dari wishlist jika sudah ada di dalamnya
      const updatedFavorites = existingFavorites.filter(
        (item: any) => item !== slug
      );
      window.localStorage.setItem(
        "favoriteProduct",
        JSON.stringify(updatedFavorites)
      );
      setIsLiked(false); // Ubah status ke "tidak disukai"
    } else {
      // Tambahkan barang ke wishlist jika belum ada di dalamnya
      const updatedFavorites = [...existingFavorites, slug];
      window.localStorage.setItem(
        "favoriteProduct",
        JSON.stringify(updatedFavorites)
      );
      setIsLiked(true); // Ubah status ke "disukai"
    }
  };

  // handle pesan

  const handlePesan = () => {
    const message = `Saya ingin bertanya tentang produk ini
    Nama : *${barang?.nama_barang}*,
    Merk : *${barang?.brand}*, 
    Ukuran : *${barang?.ukuran}*, 
    Kualitas : *${barang?.kualitas}*,
    Stok : *${barang?.stok}*

    --------Link Produk---------
    ${window.location.href}`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  };

  if (!barang.nama_barang) {
    return (
      <div>
        <AppBar allowBack={true} />
        <Typography align="center">Loading...</Typography>
      </div>
    );
  }

  return (
    <div>
      <AppBar allowBack={true} />
      <SearchBar />
      <div className="max-w-3xl mx-auto">
        <DetailProductCard barang={barang} />

        {/* detail produk */}

        <p className="underline font-semibold m-2">Detail Produk</p>
        <DeskripsiProduk barang={barang} />

        {/* simulasi keramik */}

        <div>
          <p className="underline font-semibold m-2">{`Design Patern`}</p>
          <SectionLayout>
            <SimulasiKeramik
              ukuran={barang.ukuran}
              imageUrl={
                barang.images[0] ||
                "https://ik.imagekit.io/sarrahmanme/No-Image-Placeholder.svg.png?updatedAt=1701908821050"
              }
            />
          </SectionLayout>
        </div>

        {/* kalkulator keramik */}

        <p className="underline font-semibold m-2">{`Kalkulator`}</p>
        <SectionLayout>
          <KalkulatorKeramik barang={barang} />
        </SectionLayout>

        {/* whatsapp */}
        <div className="sticky bottom-0 z-40">
          <div className="flex">
            <Button
              onClick={handleLike}
              color={isLiked ? "orange" : "red"} // Ubah warna berdasarkan status like
              icon={<MdFavoriteBorder />}
            >
              {isLiked ? "Unlike" : "Like"}{" "}
              {/* Ubah teks berdasarkan status like */}
            </Button>
            <Button
              size="full"
              onClick={handlePesan}
              color="green"
              icon={<FaWhatsapp />}
            >
              Whatsapp
            </Button>
          </div>
        </div>
      </div>

      {/* barang sejenis */}

      {barangSejenis.length > 1 ? (
        <div>
          <SwiperProduct
            products={barangSejenis}
            title={"Warna Lainnya"}
            url={""}
          />
        </div>
      ) : null}

      {/* barang serupa */}

      {barangSerupa.length > 1 ? (
        <div>
          <p className="underline font-semibold m-2">{`Rekomendasi`}</p>
          <CatalogProducts
            unPagination={true}
            atribut={`kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DetailBarang;
