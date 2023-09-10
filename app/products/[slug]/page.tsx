async function Product({ params }: { params: { slug: string } }) {
  return (
    <div>
      <p>{params.slug}</p>
    </div>
  );
}

export default Product;
