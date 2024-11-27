import BookCard from "../catalog/components/BookCard";
import { books } from "../falseData/book";

const BookList = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          year={book.year}
          category={book.category}
        />
      ))}
    </div>
  );
};

export default BookList;
