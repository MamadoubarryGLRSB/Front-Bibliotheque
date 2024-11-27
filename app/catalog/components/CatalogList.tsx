"use client";

import BookCard from "./BookCard";
import { books } from "@/app/falseData/book";

interface CatalogListProps {
  searchTerm: string;
}

const CatalogList = ({ searchTerm }: CatalogListProps) => {
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => <BookCard key={book.id} {...book} />)
      ) : (
        <p className="text-center col-span-2">Aucun livre trouvé.</p>
      )}
    </div>
  );
};

export default CatalogList;
