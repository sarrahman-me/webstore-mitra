/* eslint-disable @next/next/no-img-element */
"use client";
import { useSelector, useDispatch } from "react-redux";
import { FcLike } from "react-icons/fc";
import {
  setWebstore,
  setPercentaseMembership,
  setDomain,
  setMitra,
} from "@/src/redux/slice/webstore";
import { GetDataApi } from "@/src/utils";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ToggleDarkMode } from "@/src/components/atoms";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppBar(props: { allowBack?: boolean }) {
  const router = useRouter();
  const { webstore } = useSelector((state: any) => state.webstore);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/webstore/${process.env.NEXT_PUBLIC_ID_WEBSTORE}`
      );
      const responseMembership = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/membership/member/${response?.data?.id_membership}`
      );
      const responseMitra = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/mitra/by?username=${response?.data?.mitra}`
      );
      dispatch(setDomain(response?.data?.domain));
      dispatch(setWebstore(response.data));
      dispatch(setMitra(responseMitra?.data));
      dispatch(
        setPercentaseMembership(responseMembership.data.harga.persentase)
      );
    }

    fetchData();
  }, [dispatch]);

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 text-white flex justify-between items-center">
      {props.allowBack && (
        <p
          onClick={() => router.back()}
          className="font-semibold cursor-pointer text-lg"
        >
          <AiOutlineArrowLeft />
        </p>
      )}
      {webstore.logo ? (
        <img src={webstore.logo} alt="logo" width={70} height={60} />
      ) : (
        <p
          onClick={() => router.push("/")}
          className="cursor-pointer font-semibold select-none p-2"
        >
          {webstore.nama_webstore}
        </p>
      )}
      <div className="flex items-center space-x-2 md:space-x-4">
        <FcLike
          onClick={() => router.push("/wishlist")}
          className="text-xl cursor-pointer"
        />
        <ToggleDarkMode />
      </div>
    </div>
  );
}
