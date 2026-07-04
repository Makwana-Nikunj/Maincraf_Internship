function Product({ product }) {
  return (
    <div className="bg-gray-800 p-4 rounded flex flex-col justify-between">
      {product.ImageUrl && (
        <img
          src={product.ImageUrl}
          alt={product.name}
          className="w-full h-40 object-fit rounded mb-3"
        />
      )}
      <div>
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-blue-400 font-semibold">₹ {product.price}</p>
      </div>
    </div>
  );
}

export default Product;
