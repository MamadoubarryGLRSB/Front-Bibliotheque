"use client";

import { useEffect, useState } from "react";

// Exemple de données utilisateur (à remplacer par un fetch API)
const mockUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  borrowedBooks: [
    { title: "1984", author: "George Orwell", borrowedDate: "2024-01-15" },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      borrowedDate: "2024-02-20",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      borrowedDate: "2024-03-05",
    },
  ],
};

interface BorrowedBook {
  title: string;
  author: string;
  borrowedDate: string;
}

interface User {
  name: string;
  email: string;
  borrowedBooks: BorrowedBook[];
}

const calculateReturnDate = (borrowedDate: string): string => {
  const borrowDateObj = new Date(borrowedDate);
  borrowDateObj.setDate(borrowDateObj.getDate() + 30);
  return borrowDateObj.toISOString().split("T")[0]; // Format YYYY-MM-DD
};

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  // Simule une récupération des données utilisateur (remplacez cela par une requête API)
  useEffect(() => {
    setUser(mockUser);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 p-6 min-h-screen bg-gray-100">
      {/* Informations utilisateur */}
      <aside className="lg:w-1/4 w-full bg-white p-4 rounded shadow-md mb-6 lg:mb-0">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Informations Utilisateur
        </h2>
        <p className="mb-2">
          <strong>Nom :</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Email :</strong> {user.email}
        </p>
      </aside>

      {/* Historique des livres */}
      <section className="flex-1 bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Historique des Livres Empruntés
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Titre</th>
                <th className="border border-gray-300 px-4 py-2">Auteur</th>
                <th className="border border-gray-300 px-4 py-2">
                  Date d&apos;emprunt
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Date de retour
                </th>
              </tr>
            </thead>
            <tbody>
              {user.borrowedBooks.map((book: BorrowedBook, index: number) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {book.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.author}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.borrowedDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {calculateReturnDate(book.borrowedDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
