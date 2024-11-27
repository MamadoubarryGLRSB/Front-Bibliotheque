"use client";

import CatalogList from "./catalog/components/CatalogList";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Bienvenue dans ZELIBRARY</h2>
        <p className="text-lg">Explorez notre catalogue de livres disponibles.</p>
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Rechercher par titre, auteur ou catégorie..."
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <CatalogList searchTerm={searchTerm} />
    </div>
  );
}
