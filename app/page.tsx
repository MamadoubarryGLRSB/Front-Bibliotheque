'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div>
      <div className="relative mt-16 h-[30vh]">
        {' '}
        <div className="absolute inset-0">
          <Image
            src="/images/Bibliotheque-de-livres.webp"
            alt="Bibliothèque publique"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-40">
          <h2 className="text-4xl font-bold mb-4">Bienvenue dans ZELIBRARY</h2>
          <p className="text-lg mb-6">Explorez notre catalogue de livres disponibles.</p>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher par titre, auteur ou catégorie..."
            className="w-full max-w-md px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
      </div>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">Nos livres populaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/couvpololelivredesmerveilles.jpg"
                alt="Livre 1"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Le Livre des Merveilles</h3>
                <p className="text-gray-600">Auteur: Jean Dupont</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/9782360754298_1_75.jpg"
                alt="Livre 2"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Les Secrets du Voyage</h3>
                <p className="text-gray-600">Auteur: Marie Leroux</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/couvpololelivredesmerveilles.jpg"
                alt="Livre 3"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">La Magie des Vents</h3>
                <p className="text-gray-600">Auteur: Claire Martin</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/Les-Ombres-de-Paris.jpg"
                alt="Livre 4"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Les Ombres de Paris</h3>
                <p className="text-gray-600">Auteur: Thomas Belmondo</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/catalog" className="text-blue-500 hover:underline text-lg font-semibold">
              Voir nos livres
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
