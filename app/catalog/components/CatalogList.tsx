import { Book, CatalogListProps } from "@/app/types/book";
// import { Book, CatalogListProps } from "@/app/types/Book";
import { useEffect, useState } from "react";

import BookCard from "./BookCard";

const CatalogList = ({ searchTerm }: CatalogListProps) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/books");
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des livres.");

        const data = await response.json();
        // const mappedBooks = data.books.map((book: any) => ({
        //   ...book,
        //   image_url_s: book.imageUrlS,
        // }));
        const mappedBooks: Book[] = data.books.map((book: Book) => ({
          id: book.id,
          isbn: book.isbn,
          title: book.title,
          author: book.author,
          year_of_publication: book.year_of_publication, // Champ API → champ TypeScript
          publisher: book.publisher,
          genre: book.genre,
          image_url_s: book.image_url_s, // Champ API → champ TypeScript
          image_url_m: book.image_url_m,
          image_url_l: book.image_url_l,
          availability: book.availability,
        }));
        setBooks(mappedBooks);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {filteredBooks.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </div>
  );
};

export default CatalogList;
