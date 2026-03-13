"use client";

export default function ProductLayout({ children }) {
  return (
    <div className="max-w-[1720px] mx-auto p-6 bg-pink-200">
      <div className="flex flex-col md:flex-row gap-10">

        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div className="bg-pink-100 p-6 rounded-2xl border shadow-sm sticky top-24">
            <h2 className="font-bold text-xl mb-6">Filters</h2>

            {/* You can move category + sort UI here */}
            <p className="text-gray-500 text-sm">
              Category filters here
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}