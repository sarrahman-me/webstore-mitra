"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  setWebstore,
  setPercentaseMembership,
  setDomain,
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
      dispatch(setDomain(response?.data?.domain));
      dispatch(setWebstore(response.data));
      dispatch(
        setPercentaseMembership(responseMembership.data.harga.persentase)
      );
    }

    fetchData();
  }, [dispatch]);

  return (
    <div className="sticky top-0 z-50 bg-blue-50 dark:bg-blue-950 flex justify-between items-center p-2">
      {props.allowBack && (
        <p
          onClick={() => router.back()}
          className="font-semibold cursor-pointer text-lg"
        >
          <AiOutlineArrowLeft />
        </p>
      )}
      <p className="font-semibold">{webstore.nama_webstore}</p>
      <ToggleDarkMode />
    </div>
  );
}
