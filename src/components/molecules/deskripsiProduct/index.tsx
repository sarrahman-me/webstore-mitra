import { HeaderSection } from "../../atoms";

const DeskripsiProduct = (props: { product: any }) => {
  return (
    <div className="bg-white py-4 px-4 flex md:border flex-col shadow rounded my-3 p-2">
      <HeaderSection title="Deskripsi Barang" />
      <p className="md:text-lg font-medium my-3">
        Kualitas: {props.product?.kualitas}
      </p>
      <p className="md:text-lg font-medium my-3">
        Ukuran: {props.product?.ukuran}
      </p>
      <p className="md:text-lg font-medium my-3">
        Tekstur: {props.product?.tekstur}
      </p>
      <p className="md:text-lg font-medium my-3">
        Motif: {props.product?.motif}
      </p>
    </div>
  );
};

export default DeskripsiProduct;
