"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CardProduct } from "../../molecules";
import { GetDataApi } from "@/src/utils";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

export default function CatalogProducts(props: {
  atribut?: string;
  path?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page");
  const [barang, setBarang] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1);
  const [metadata, setMetadata] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const path = props.path || "products/barang";

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/${path}?${
          props.atribut || ""
        }&limit=30&page=${currentPage}`
      );
      setBarang(response.data);
      setMetadata(response.metadata);
      setLoading(false);
    }
    fetchData();
  }, [currentPage, props.atribut, path]);

  const handleNextPage = () => {
    if (currentPage < metadata?.totalPages) {
      setCurrentPage(currentPage + 1);
      router.push(`/barang?page=${currentPage + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`/barang?page=${currentPage - 1}`);
    }
  };

  return (
    <div>
      <div className="p-2">
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-y-4 gap-x-2">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : barang.length > 0 ? (
            barang.map((item: any, i: any) => (
              <div key={i}>
                <CardProduct barang={item} />
              </div>
            ))
          ) : (
            <div className="text-center">Data tidak ditemukan.</div>
          )}
        </div>
      </div>
      {!loading && barang.length > 0 ? (
        <div className="flex justify-between items-center p-2">
          <div>
            <p className="text-xs md:text-sm text-gray-500">
              {metadata.totalData > 0
                ? `${Math.min(
                    (currentPage - 1) * metadata.limit + 1,
                    metadata.totalData
                  )} - ${Math.min(
                    currentPage * metadata.limit,
                    metadata.totalData
                  )} dari ${metadata.totalData}`
                : "Tidak ada barang yang tersedia"}
            </p>
          </div>
          <div className="flex justify-around items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="text-2xl text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed mr-7 hover:bg-indigo-500 disabled:bg-white hover:text-white rounded-full"
            >
              <BsFillArrowLeftCircleFill />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === metadata?.totalPages}
              className="text-2xl text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-indigo-500 disabled:bg-white hover:text-white rounded-full"
            >
              <BsFillArrowRightCircleFill />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}