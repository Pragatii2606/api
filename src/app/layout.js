// import Navbar from "../components/navbar";
import Navbar from "./components/navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-pink-200">
        <Navbar />
        <div className="max-w-[1720px] mx-auto p-6">
          {children}
        </div>
      </body>
    </html>
  );
}