"use client";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Loading } from "notiflix";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <form
      className="flex justify-center items-center py-3"
      onSubmit={(e) => {
        Loading.dots("Mencari...");
        e.preventDefault();
        router.push(`/barang/pencarian?query=${searchTerm}`);
        Loading.remove();
      }}
    >
      <div className="relative flex items-center w-full md:w-2/3 mx-2">
        <input
          type="text"
          placeholder="Cari apapun..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white dark:bg-slate-800 w-full px-4 py-2 rounded-md shadow-md placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <button
          type="submit"
          className="absolute right-0 mr-2 p-2 rounded-md bg-transparent border-none cursor-pointer focus:outline-none"
        >
          <RiSearchLine size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
