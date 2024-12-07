"use client";

import CatalogList from "./components/CatalogList";
// import CatalogList from "./components/CatalogList";
import { useState } from "react";

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Book Catalog</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Rechercher par titre, auteur ou catégorie..."
        className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <CatalogList searchTerm={searchTerm} />
    </div>
  );
}
