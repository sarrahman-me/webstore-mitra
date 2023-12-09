"use client";
import { Button } from "@/src/components/atoms";
import { CardProduct2 } from "@/src/components/molecules";
import { CatalogProducts } from "@/src/components/oraganisms";
import { AppBar } from "@/src/layouts";
import { PostDataApi } from "@/src/utils";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import empty from "@/public/empty.png";
import Image from "next/image";

const Wishlist = () => {
  const [productsWishlist, setProductsWishlist] = useState([] as any);
  const [mostCommonSize, setMostCommonSize] = useState("");
  const [mostCommonMotif, setMostCommonMotif] = useState("");

  const whatsappNumber = "+6282225601468";

  // handle pesan untuk semua barang di wishlist
  const handlePesan = () => {
    let message = "Daftar Barang yang Saya Suka:\n\n";

    // Menambahkan detail setiap barang ke dalam pesan
    productsWishlist.forEach((product: any, index: any) => {
      message += `Produk ke-${index + 1}:\n`;
      message += `Nama : *${product.nama_barang} - ${product.warna}*\n`;
      message += `Brand : *${product.brand}*\n`;
      message += `Ukuran : *${product.ukuran}*\n`;
      message += `Kualitas : *${product.kualitas}*\n`;
      message += `Stok : *${product.stok}*\n`;

      message += "\n------------------------\n";
    });

    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  };

  const fetchDataFromLocalStorage = () => {
    const listProduct = JSON.parse(
      window.localStorage.getItem("favoriteProduct") || "[]"
    );
    return listProduct;
  };

  // Fungsi untuk menganalisis ukuran dan motif terbanyak di Wishlist
  const analyzeWishlist = (wishlistProducts: any[]) => {
    let sizeCounts: { [key: string]: number } = {};
    let motifCounts: { [key: string]: number } = {};

    wishlistProducts.forEach((product) => {
      sizeCounts[product.ukuran] = (sizeCounts[product.ukuran] || 0) + 1;
      motifCounts[product.motif] = (motifCounts[product.motif] || 0) + 1;
    });

    const mostCommonSize: string = Object.keys(sizeCounts).reduce((a, b) =>
      sizeCounts[a] > sizeCounts[b] ? a : b
    );

    const mostCommonMotif: string = Object.keys(motifCounts).reduce((a, b) =>
      motifCounts[a] > motifCounts[b] ? a : b
    );

    setMostCommonSize(mostCommonSize);
    setMostCommonMotif(mostCommonMotif);
  };

  useEffect(() => {
    const fetchData = async () => {
      const listProduct = fetchDataFromLocalStorage();

      if (listProduct.length > 0) {
        PostDataApi(`${process.env.NEXT_PUBLIC_HOST}/products/barang/slugs`, {
          slugs: listProduct,
        })
          .then((productsResponse) => {
            setProductsWishlist(productsResponse.data);
            analyzeWishlist(productsResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching wishlist products:", error);
            setProductsWishlist([]);
          });
      } else {
        setProductsWishlist([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <AppBar allowBack={true} />
      {productsWishlist.length > 0 ? (
        <div>
          <p className="underline font-semibold m-2">Barang yang kamu suka</p>
          <div>
            <div className="mx-1 my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {productsWishlist.map((product: any, i: any) => (
                <div key={i}>
                  <CardProduct2 barang={product} />
                </div>
              ))}
            </div>
          </div>
          <div className="sticky bottom-0 z-40 md:mx-2">
            <Button
              onClick={handlePesan}
              size="full"
              color="green"
              icon={<FaWhatsapp />}
            >
              Whatsapp
            </Button>
          </div>
          <p className="underline font-semibold m-2">
            Mirip dengan yang kamu suka
          </p>
          <CatalogProducts
            limit="15"
            unPagination={true}
            atribut={`ukuran=${mostCommonSize}&motif=${mostCommonMotif}`}
          />
        </div>
      ) : (
        <div>
          <Image src={empty} alt="kosong" />
          <p className="text-sm md:text-md text-center my-2">
            Tidak ada barang yang disuka
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
