'use client';

import "react-datepicker/dist/react-datepicker.css";

import { FaBook, FaCheckCircle, FaTimesCircle, FaUserAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import IBook from "@/app/interface/book";
import axios from "axios";

interface IBookProps {
  dataBook: IBook[];
}

const CatalogList = ({ dataBook }: IBookProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tout");
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [mode, setMode] = useState<"view" | "borrow" | null>(null); // Mode de la modale
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const booksPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const genres = ["Tout", ...new Set(dataBook.map((book) => book.genre))];

  const filteredBooks = dataBook.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "Tout" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleBorrowBook = async () => {
    if (!selectedBook) return;
  
  
    try {
      const response = await axios.post("http://localhost:8080/api/loans/borrow", {
        userId: 1, 
        bookId: selectedBook.id,
      });
  
  
      alert(`La demande de prêt pour "${selectedBook.title}" est envoyé`);
    } catch (error) {
      console.error("Erreur lors de l'emprunt :", error);
      alert("Erreur : Impossible d'emprunter le livre");
    }
  
    setSelectedBook(null);
    setMode(null);
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Barre de recherche */}
      <div className="mb-6 flex justify-between items-center bg-white shadow-sm rounded p-4">
        <input
          type="text"
          placeholder="🔍 Rechercher par titre ou auteur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3 p-3 border border-gray-300 rounded-lg"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-1/4 p-3 border border-gray-300 rounded-lg"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des livres */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-blue-600">{book.title}</h3>
              <div className="text-gray-600">
                <div className="flex items-center mb-2">
                  <FaUserAlt className="mr-2 text-blue-400" />
                  Auteur : {book.author}
                </div>
                <div className="flex items-center mb-2">
                  <FaBook className="mr-2 text-green-400" />
                  Genre : {book.genre}
                </div>
                <div className="flex items-center">
                  {book.availability ? (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  {book.availability ? "Disponible" : "Indisponible"}
                </div>
              </div>
            </div>
            <div className="flex justify-between px-4 pb-4">
              {/* Voir */}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => {
                  setSelectedBook(book);
                  setMode("view");
                }}
              >
                Voir
              </button>

              {/* Emprunter */}
              <button
                className={`py-2 px-4 rounded ${
                  book.availability
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (book.availability) {
                    setSelectedBook(book);
                    setMode("borrow");
                  }
                }}
                disabled={!book.availability}
              >
                Emprunter
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modale pour Voir ou Emprunter */}
      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl font-bold mb-4">{selectedBook.title}</h3>
            <p>
              <span className="font-semibold">Auteur :</span>{" "}
              {selectedBook.author}
            </p>
            <p>
              <span className="font-semibold">Genre :</span>{" "}
              {selectedBook.genre}
            </p>
            <p>
              <span className="font-semibold">Disponibilité :</span>{" "}
              {selectedBook.availability ? "Disponible" : "Indisponible"}
            </p>

            {/* Formulaire d'emprunt */}
            {mode === "borrow" && (
              <>
                <p className="mt-4 mb-2">Sélectionnez la date de retour :</p>
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                  maxDate={new Date(new Date().setDate(new Date().getDate() + 21))}
                  className="w-full p-2 border rounded"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleBorrowBook}
                    className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-600"
                  >
                    Confirmer
                  </button>
                </div>
              </>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setSelectedBook(null);
                  setMode(null);
                }}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
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
