import { GetDataApi } from "@/src/utils";

const Home = async () => {
  const response = await GetDataApi("http://localhost:3002/api/webstore");

  const hostname = response.hostname;

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
