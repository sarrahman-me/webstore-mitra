"use client";
import { RiWhatsappFill } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function WhatsappIcon() {
  const { mitra } = useSelector((state: any) => state.webstore);

  const handlePesan = () => {
    const message = `Halo Admin`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${
      mitra?.whatsapp
    }&text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="fixed right-0 bottom-0 m-2 z-50">
      <div
        onClick={handlePesan}
        className="bg-gradient-to-br from-green-300 to-green-500 dark:from-green-700 dark:to-green-900 text-white space-x-2 flex items-center rounded-full md:p-2 md:px-4 p-2"
      >
        <RiWhatsappFill className="text-white text-3xl" />
        <p className="text-sm hidden md:block">Chat</p>
      </div>
    </div>
  );
}
