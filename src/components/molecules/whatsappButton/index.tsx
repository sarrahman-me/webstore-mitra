"use client";
import { Button } from "../../atoms";

export default function WhatsappButton(props: { barang: any; phone: string }) {
  const handleWhatsAppClick = () => {
    const message = `Saya ingin bertanya tentang produk ini
    Nama : *${props.barang?.nama_barang}*,
    Merk : *${props.barang?.merk}*, 
    Ukuran : *${props.barang?.ukuran}*, 
    Kualitas : *${props.barang?.kualitas}*,
    Harga : *${props.barang?.harga}* ,
    Stok : *${props.barang?.stok}*`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${
      props.phone
    }&text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  };
  return (
    <div>
      <Button onClick={handleWhatsAppClick} color="green" isFullWidth={true}>
        Pesan
      </Button>
    </div>
  );
}
