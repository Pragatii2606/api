export default function ProductCard({ product, onSelect }) {
  return (
    <div
      onClick={() => {
        onSelect(product);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="border rounded-2xl p-4 bg-white shadow-sm cursor-pointer hover:shadow-lg transition"
    >
      <div className="h-48 flex items-center justify-center bg-gray-50 rounded-xl mb-4 overflow-hidden">
        <img src={product.thumbnail} alt={product.title} className="max-h-full object-contain"/>
        
      </div>

      <h3 className="font-bold text-gray-800 truncate">
        {product.title}
      </h3>

      <p className="text-gray-400 text-xs mb-2 uppercase">
        {product.category}
      </p>

      <div className="flex justify-between items-center">
        <span className="font-bold text-pink-600">
          ${product.price}
        </span>

        <span className="text-xs font-semibold text-blue-500">
          View Details →
        </span>
      </div>
    </div>
  );
}