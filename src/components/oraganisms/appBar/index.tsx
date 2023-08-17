import Image from "next/image";
import { BackIcon } from "../../atoms";
import logo from "@/public/logo.png";

async function AppBar(props: { backIcon?: boolean }) {
  return (
    <div
      className={`bg-white flex shadow p-3 md:p-5 ${
        props.backIcon ? "justify-between px-2 md:px-10" : "justify-center"
      }`}
    >
      <div className={`${!props.backIcon ? "hidden" : ""}`}>
        <BackIcon />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <Image
            src={logo}
            alt="Dunia Keramik Logo"
            className="w-8 h-8 md:w-12 md:h-12 mr-2"
          />
          <p className="font-bold text-lg md:text-xl">Dunia Keramik Samarinda</p>
        </div>
        {/* <p className="md:text-sm text-xs text-center">
          Jl Sultan Sulaiman Sambutan, Samarinda kaltim
        </p> */}
      </div>
      <div></div>
    </div>
  );
}

export default AppBar;
