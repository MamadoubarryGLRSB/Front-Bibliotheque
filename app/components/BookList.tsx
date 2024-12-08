"use client";

import { useEffect, useState } from "react";

import { Book } from "@/app/types/Book";
import BookCard from "../catalog/components/BookCard";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]); // Liste des livres
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs
  const [hasMore, setHasMore] = useState(true); // Indique s'il reste des livres à charger
  const itemsPerPage = 50; // Nombre de livres par page

  // Fonction pour récupérer les livres
  const fetchBooks = async (page: number) => {
    try {
      setIsLoading(true); // Active le chargement
      const response = await fetch(
        `http://localhost:8080/api/books?page=${page}&limit=${itemsPerPage}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des livres.");
      }

      const data = await response.json();

      // Vérification que `books` est un tableau
      if (!Array.isArray(data.books)) {
        throw new Error("Les données reçues ne contiennent pas de livres.");
      }

      // Mise à jour des états
      setBooks((prevBooks) => [...prevBooks, ...data.books]);
      setHasMore(data.books.length === itemsPerPage);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Charge les livres à chaque changement de page
  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  // Fonction pour charger plus de livres
  const loadMoreBooks = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Passe à la page suivante
  };

  // Affichage d'une erreur
  if (error) {
    return <div className="text-red-500">Erreur : {error}</div>;
  }

  // Rendu du composant
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard
            key={book.id}
            isbn={book.isbn}
            title={book.title}
            author={book.author}
            year_of_publication={book.year_of_publication}
            publisher={""}
            genre={book.genre}
            image_url_s={book.image_url_s}
            image_url_m={book.image_url_m}
            image_url_l={book.image_url_l}
            availability={false}
          />
        ))}
      </div>

      {/* Affichage du bouton de chargement */}
      {isLoading && <div>Chargement des livres...</div>}

      {hasMore && !isLoading && (
        <button
          onClick={loadMoreBooks}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Charger plus
        </button>
      )}

      {!hasMore && (
        <div className="text-gray-500 mt-4">Plus de livres disponibles.</div>
      )}
    </div>
  );
};

export default BookList;
