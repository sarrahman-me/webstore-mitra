"use client";
import { Textfield } from "@/src/components/atoms";
import { useState } from "react";
import { useSelector } from "react-redux";

const LockScreen = () => {
  const [password, setPassword] = useState("");
  const { webstore } = useSelector((state: any) => state.webstore);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password === webstore.password) {
      window.sessionStorage.setItem("login", "OK");
      window.location.reload();
    } else {
      alert("kata sandi salah");
    }
  };

  const whatsappNumber = "+6282225601468";

  const handlePesan = () => {
    const message = `Halo Admin, minta kata sandi toko online`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="bg-gradient-to-tl from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 min-h-screen flex justify-center items-center">
      <div className="space-y-3">
        <p className="font-bold text-xl text-center text-white">
          Selamat datang di {webstore.nama_webstore}
        </p>
        <p className="text-xs md:text-sm text-center text-white">
          halaman ini dikunci oleh pemilik situs
        </p>
        <form className="my-2" onSubmit={handleSubmit}>
          <Textfield
            fullWidth
            placeholder="kata sandi"
            name={"kunci"}
            onChange={setPassword}
          />
        </form>
        <p
          onClick={handlePesan}
          className="text-xs md:text-sm text-center text-white underline"
        >
          minta kata sandi
        </p>
      </div>
    </div>
  );
};

export default LockScreen;
