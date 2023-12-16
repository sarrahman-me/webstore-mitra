"use client";
import { useSelector } from "react-redux";

const ExpiredPlan = () => {
  const { webstore } = useSelector((state: any) => state.webstore);

  return (
    <div className="bg-gradient-to-tl from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 min-h-screen flex justify-center items-center">
      <div className="space-y-3 max-w-screen-md w-full">
        <p className="font-bold text-xl sm:text-2xl text-center text-white">
          {webstore.nama_webstore} Sedang dalam perbaikan
        </p>
        <p className="text-xs md:text-sm text-center text-white">
          silahkan berkunjung beberapa saat lagi
        </p>
      </div>
    </div>
  );
};

export default ExpiredPlan;
