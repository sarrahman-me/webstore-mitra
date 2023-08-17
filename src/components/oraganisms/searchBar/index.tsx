"use client";
import { RiSearchLine } from "react-icons/ri";
import { useState } from "react";
import { GetDataApi } from "@/src/utils";
import { Notify } from "notiflix";
import config from "@/config";
import { HeaderSection } from "../../atoms";
import { CardProduct } from "../../molecules";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (event: any) => {
    event.preventDefault();
    try {
      const response = await GetDataApi(
        `${config.NEXT_PUBLIC_HOST}/barang/search?query=${searchTerm}`
      );
      if (response.status === 400) {
        Notify.failure(response.message);
      }
      if (response.status === 500) {
        Notify.failure(response.message + ", Coba Lagi!");
      }
      setProducts(response.data);
      setSearched(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <div>
      <form
        className="flex justify-center items-center py-3"
        onSubmit={handleSearch}
      >
        <div className="relative flex items-center w-full md:w-2/3 mx-2">
          <input
            type="text"
            placeholder="Cari apapun..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-white w-full px-4 py-2 rounded-md shadow-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="absolute right-0 mr-2 p-2 rounded-md bg-transparent border-none cursor-pointer focus:outline-none"
          >
            <RiSearchLine size={20} />
          </button>
        </div>
      </form>
      {/* product result */}
      {
        products && products?.length > 0 ? (
          // Tampilkan bagian ini hanya jika ada hasil dari pencarian
          <div className="bg-white p-2 mb-3 md:mx-2 shadow sm:border rounded">
            <HeaderSection title="Hasil Pencarian" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products?.map((product: any) => (
                <div key={product.slug}>
                  <CardProduct product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : null /* Gunakan null untuk tidak menampilkan apa pun jika tidak ada hasil pencarian */
      }

      {searched && products?.length === 0 && (
        // Tampilkan bagian ini hanya jika ada pencarian dan tidak ada hasil
        <div className="bg-white p-2 m-2 shadow sm:border rounded">
          <HeaderSection title="Hasil Pencarian" />
          <p className="text-center text-sm md:text-base text-orange-600">
            Tidak ada hasil yang sesuai, cari dengan kata lain
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
