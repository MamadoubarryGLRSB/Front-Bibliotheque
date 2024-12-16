'use client';

import { Book } from '@/app/interface/book';
import { useState } from 'react';

const BookCard = ({ title, author, year_of_publication, genre }: Omit<Book, 'id'>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBorrowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{author}</p>
      <p className="text-sm text-gray-400">Year: {year_of_publication}</p>
      <p className="text-sm text-gray-400">Genre: {genre}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleBorrowClick}>
        Emprunter
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Emprunter &quot;{title}&quot;</h3>
            <p>Voulez-vous emprunter ce livre ?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => {
                  console.log(`You borrowed "${title}"`);
                  handleCloseModal();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
