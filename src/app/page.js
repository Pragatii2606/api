"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("az"); 
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(err => console.error("API Error:", err));
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

  if (loading) return <div className="text-center p-20 font-bold">Loading Brand Fume...</div>;

  return (
    <div className="max-w-[1720px] mx-auto p-6 bg-pink-200">
      
      <div className="mb-8 max-w-2xl mx-auto">
        <input 
          type="text" 
          placeholder="Search by name or category..." 
          className="w-full bg-white border p-3 rounded-full shadow-sm outline-none "
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        
        <aside className="w-full md:w-64 space-y-8">
          <div className="bg-pink-100 p-6 rounded-2xl border shadow-sm sticky top-24">
            <h2 className="font-bold text-xl mb-6">Filters</h2>
            
            <div className="space-y-6">
              
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 block mb-2">Category</label>
                <select 
                  className="w-full border p-2 rounded-lg bg-gray-50 text-sm outline-none"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {uniqueCategories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

             
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 block mb-2">Sort By</label>
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

        
        <main className="flex-1 " >
          <div className="  bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-400 font-medium">
                No products match your criteria.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}