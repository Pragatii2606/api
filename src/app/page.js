"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("az");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (sortBy === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [searchTerm, category, sortBy, products]);

  const uniqueCategories = ["all", ...new Set(products.map((p) => p.category))];

  if (loading)
    return <div className="text-center p-20 font-bold">Loading Allure...</div>;

  return (
    <div className="max-w-[1720px] p-6">

      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search by name or category..."
          className="w-full bg-white border p-3 rounded-full shadow-sm outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-10">

        <aside className="w-full md:w-64 space-y-8">
          <div className="bg-pink-100 p-6 rounded-2xl border shadow-sm sticky top-24">
            <h2 className="font-bold text-xl mb-6">Filters</h2>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 block mb-2">
                  Category
                </label>

                <select
                  className="w-full border p-2 rounded-lg bg-gray-50 text-sm outline-none"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400 block mb-2">
                  Sort By
                </label>

                <select
                  className="w-full border p-2 rounded-lg bg-gray-50 text-sm outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="az">Alphabetical (A-Z)</option>
                  <option value="za">Alphabetical (Z-A)</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">

          

           {selectedProduct ? (


  <div className="bg-white border rounded-xl p-6">

    <button
      onClick={() => setSelectedProduct(null)}
      className="text-blue-500 text-sm mb-4 hover:underline"
    >
      ← Back to Products
    </button>

    <div className="flex flex-col md:flex-row gap-10">

      <div className="md:w-1/2">
        <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="w-full border rounded-lg mb-4"/>

        <div className="flex gap-3">
          {selectedProduct.images?.map((img, i) => (
            <img key={i} src={img} className="w-16 h-16 border rounded cursor-pointer object-cover" alt={`img-${i}`}/>
          ))}
        </div>
      </div>

      <div className="flex-1">

        <h2 className="text-2xl font-bold">
          {selectedProduct.title}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Brand: {selectedProduct.brand}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-500 text-lg">
            ⭐ {selectedProduct.rating}
          </span>
          <span className="text-gray-400 text-sm">
            ({selectedProduct.reviews?.length || 0} reviews)
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-pink-600">
            ${selectedProduct.price}
          </span>

          {selectedProduct.discountPercentage && (
            <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
              {selectedProduct.discountPercentage}% OFF
            </span>
          )}
        </div>

      
        <p className="text-gray-600 mt-4">
          {selectedProduct.description}
        </p>

        
        <div className="mt-5 space-y-1 text-sm text-gray-600">
          <p><b>Category:</b> {selectedProduct.category}</p>
          <p><b>Stock:</b> {selectedProduct.stock}</p>
         <p><b>Shipping:</b> {selectedProduct.shippingInformation}</p>
          <p><b>Warranty:</b> {selectedProduct.warrantyInformation}</p>
          <p><b>Status:</b> {selectedProduct.availabilityStatus}</p>
        </div>

      </div>

    </div>
    </div>
   

) : (
          

            <div className="bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}

            </div>

          )}

        </main>

      </div>
    </div>
  );
}