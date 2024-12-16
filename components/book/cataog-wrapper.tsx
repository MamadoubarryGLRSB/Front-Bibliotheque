'use client';

import React, { useState } from 'react';
import IBook from '@/app/interface/book';

interface IBookProps {
  dataBook: IBook[];
}

const CatalogList = ({ dataBook }: IBookProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tout');
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const genres = ['Tout', ...new Set(dataBook.map((book) => book.genre))];

  const filteredBooks = dataBook.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'Tout' || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher par titre ou auteur..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/4 p-2 ml-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div key={book.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Auteur :</span> {book.author}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Genre :</span> {book.genre}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Disponibilité :</span>{' '}
                  {book.availability ? (
                    <span className="text-green-500 font-semibold">Disponible</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Indisponible</span>
                  )}
                </p>
              </div>
              <div className="flex justify-between px-4 pb-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => setSelectedBook(book)}
                >
                  Voir
                </button>

                <button
                  className={`py-2 px-4 rounded ${
                    book.availability
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
                  disabled={!book.availability}
                >
                  Emprunter
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Aucun livre trouvé.</p>
        )}
      </div>

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedBook.title}</h2>
            <p>
              <span className="font-semibold">Auteur :</span> {selectedBook.author}
            </p>
            <p>
              <span className="font-semibold">Genre :</span> {selectedBook.genre}
            </p>
            <p>
              <span className="font-semibold">Disponibilité :</span>{' '}
              {selectedBook.availability ? (
                <span className="text-green-500">Disponible</span>
              ) : (
                <span className="text-red-500">Indisponible</span>
              )}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={() => setSelectedBook(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-2 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CatalogList;
