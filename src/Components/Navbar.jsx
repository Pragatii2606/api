import Link from 'next/link';


export default function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold tracking-tighter text-pink-600" >
        Allure 
      </Link>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-black">Products</Link>
        <Link href="#" className="hover:text-black">Services</Link>
        <Link href="#" className="hover:text-black">About Us</Link>
        <Link href="#" className="hover:text-black">Contact</Link>
      </div>
      <div className="flex gap-4">
        <button className="text-sm border px-4 py-2 rounded-full">Login</button>
      </div>
    </nav>
  );
}