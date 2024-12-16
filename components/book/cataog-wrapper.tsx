'use client';

import React, { useState } from 'react';
import IBook from '@/app/interface/book';
import { FaUserAlt, FaBook, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex flex-wrap justify-between items-center bg-white shadow-sm rounded p-4">
        <input
          type="text"
          placeholder="🔍 Rechercher par titre ou auteur..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/4 mt-4 sm:mt-0 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div
              key={book.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-blue-600">{book.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaUserAlt className="mr-2 text-blue-400" />
                  <span className="font-medium">Auteur :</span>
                  <span className="ml-1">{book.author}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaBook className="mr-2 text-green-400" />
                  <span className="font-medium">Genre :</span>
                  <span className="ml-1">{book.genre}</span>
                </div>
                <div className="flex items-center mb-4">
                  {book.availability ? (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  <span className={`font-medium ${book.availability ? 'text-green-600' : 'text-red-600'}`}>
                    {book.availability ? 'Disponible' : 'Indisponible'}
                  </span>
                </div>
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

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-2 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            } transition-colors duration-300`}
          >
            {index + 1}
          </button>
        ))}
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
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                onClick={() => setSelectedBook(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogList;
