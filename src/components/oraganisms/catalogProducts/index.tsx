"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CardProduct } from "../../molecules";
import { GetDataApi } from "@/src/utils";
import { Tb3DCubeSphereOff } from "react-icons/tb";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Typography } from "../../atoms";

export default function CatalogProducts(props: {
  atribut?: string;
  path?: string;
  unPagination?: boolean;
  limit?: string;
  filter?: boolean;
}) {
  const router = useRouter();
  const params = useSearchParams();
  let page = params.get("page");
  let penggunaanParams = params.get("penggunaan");
  if (props.unPagination) {
    page = "1";
  }
  const [barang, setBarang] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1);
  const [metadata, setMetadata] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [penggunaan, setPenggunaan] = useState(
    penggunaanParams ? penggunaanParams : ""
  );

  const path = props.path || "products/barang";

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/${path}?${props.atribut || ""}&limit=${
          props.limit || "48"
        }&page=${currentPage}&minstok=25&penggunaan=${penggunaan}`
      );
      setBarang(response.data);
      setMetadata(response.metadata);
      setLoading(false);
    }
    fetchData();
  }, [currentPage, props.atribut, path, props.limit, penggunaan]);

  const handleNextPage = () => {
    if (currentPage < metadata?.totalPages) {
      const nextPage = currentPage + 1;
      const queryParams = new URLSearchParams(params.toString());
      queryParams.set("page", nextPage.toString());
      router.push(`?${queryParams.toString()}`);
      setCurrentPage(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const queryParams = new URLSearchParams(params.toString());
      queryParams.set("page", prevPage.toString());
      router.push(`?${queryParams.toString()}`);
      setCurrentPage(prevPage);
    }
  };

  const handleFilterPenggunaan = (e: any) => {
    const selectedValue = e.target.value;

    // Mengatur state penggunaan dengan nilai yang dipilih
    setPenggunaan(selectedValue);

    // Mendapatkan parameter dari URL
    const queryParams = new URLSearchParams(params.toString());

    // Mengatur nilai parameter penggunaan dengan nilai yang dipilih
    queryParams.set("penggunaan", selectedValue);

    // Mengatur nilai parameter page menjadi 1
    queryParams.set("page", "1");

    // Memperbarui URL dengan parameter yang telah diubah
    router.push(`?${queryParams.toString()}`);

    // Mengatur currentPage menjadi 1
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="p-2">
        {props.filter && (
          <div className="my-2">
            <select
              value={penggunaan}
              name="penggunaan"
              onChange={handleFilterPenggunaan}
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="">Semua</option>
              <option value="Lantai">Lantai</option>
              <option value="Dinding">Dinding</option>
            </select>
          </div>
        )}
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
            <div className="my-2">
              <div className="flex justify-center m-1">
                <Tb3DCubeSphereOff className="text-blue-500 text-4xl md:text-5xl shadow shadow-blue-300 p-1 border rounded-full" />
              </div>
              <Typography
                otherClass="my-2"
                color="secondary"
                variant="helper"
                align="center"
              >
                Tidak ada barang
              </Typography>
            </div>
          )}
        </div>
      </div>
      {!loading && !props.unPagination && barang.length > 0 ? (
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
              className="text-2xl text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed mr-7 hover:bg-blue-500 disabled:bg-white hover:text-white rounded-full"
            >
              <BsFillArrowLeftCircleFill />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === metadata?.totalPages}
              className="text-2xl text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-blue-500 disabled:bg-white hover:text-white rounded-full"
            >
              <BsFillArrowRightCircleFill />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
