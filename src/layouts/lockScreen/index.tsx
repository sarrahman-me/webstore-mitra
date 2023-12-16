"use client";
import { Button, Textfield } from "@/src/components/atoms";
import { useState } from "react";
import { useSelector } from "react-redux";

const LockScreen = () => {
  const [password, setPassword] = useState("");
  const { webstore, mitra } = useSelector((state: any) => state.webstore);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!password) {
      alert("kata sandi harus diisi");
      return;
    }

    if (password === webstore.password) {
      window.sessionStorage.setItem("login", "OK");
      window.location.reload();
    } else {
      alert("kata sandi salah");
    }
  };

  const handlePesan = () => {
    const message = `Halo Admin, minta kata sandi toko online`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${
      mitra?.whatsapp
    }&text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="bg-gradient-to-tl from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 min-h-screen flex justify-center items-center">
      <div className="space-y-3 max-w-screen-md w-full">
        <p className="font-bold text-xl sm:text-2xl text-center text-white">
          Selamat datang di {webstore.nama_webstore}
        </p>
        <p className="text-xs md:text-sm text-center text-white">
          toko online ini dikunci oleh pemilik situs
        </p>
        <form
          className="my-2 flex items-center space-x-1 justify-center"
          onSubmit={handleSubmit}
        >
          <Textfield
            fullWidth
            placeholder="kata sandi"
            name={"kunci"}
            onChange={setPassword}
          />
          <Button disabled={!password} type="submit">
            Masuk
          </Button>
        </form>
        <p
          onClick={handlePesan}
          className="cursor-pointer text-xs md:text-sm text-center text-white underline"
        >
          minta kata sandi
        </p>
      </div>
    </div>
  );
};

export default LockScreen;
