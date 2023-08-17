import { HeaderSection } from "../../atoms";

export default function AlamatToko() {
  return (
    <div className="bg-white py-4 px-4 flex md:border flex-col shadow rounded my-3 p-2">
      <HeaderSection title="Alamat Toko" />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.6789!2d117.1691667!3d-0.5077619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67f80d6b1546d%3A0x78773187786a0dd1!2sDunia%20Keramik!5e0!3m2!1sen!2sid!4v1626192399661!5m2!1sen!2sid"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}
