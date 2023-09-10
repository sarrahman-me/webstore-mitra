"use client";
import { GetDataApi } from "@/src/utils";
import { useEffect, useState } from "react";

const Home = () => {
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi("api/webstore");
      setHostname(response.hostname);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="text-center bg-white dark:bg-slate-800 p-4">
        <p className="font-semibold">{hostname}</p>
      </div>
      <p>Home</p>
    </div>
  );
};

export default Home;
