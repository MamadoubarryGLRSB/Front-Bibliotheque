"use client";

import React, { useEffect, useState } from "react";

import { BorrowRequest } from "@/app/types/BorrowRequest";
import { FaGavel } from "react-icons/fa"; // Icône de marteau
import { io } from "socket.io-client";
import styles from "../../modules/librarian.module.css";

const socket = io("http://localhost:3000"); // Connectez-vous au serveur

interface UserDetails {
  userName: string;
  borrowedBooks: string[];
}
type BorrowRequestWithBooks = BorrowRequest & {
  borrowedBooks: string[];
};

const LibrarianPage: React.FC = () => {
  const [borrowRequests, setBorrowRequests] = useState<BorrowRequest[]>([]);
  //   const [selectedRequest, setSelectedRequest] = useState<BorrowRequest | null>(null);
  const [selectedRequest, setSelectedRequest] =
    useState<BorrowRequestWithBooks | null>(null);

  useEffect(() => {
    const mockRequests: BorrowRequest[] = [
      {
        id: 1,
        userId: 101,
        userName: "Alice Dupont",
        bookTitle: "Les Misérables",
        requestedAt: "2024-12-15T10:00:00Z",
        status: "En attente",
      },
      {
        id: 2,
        userId: 102,
        userName: "Jean Martin",
        bookTitle: "1984",
        requestedAt: "2024-12-15T12:30:00Z",
        status: "En attente",
      },
    ];
    setBorrowRequests(mockRequests);
  }, []);

  useEffect(() => {
    // Écoute les nouvelles demandes d'emprunt
    socket.on("new_borrow_request", (newRequest: BorrowRequest) => {
      setBorrowRequests((prevRequests) => [...prevRequests, newRequest]);
    });

    return () => {
      socket.off("new_borrow_request");
    };
  }, []);
  // Mock pour récupérer les détails d'un utilisateur et ses livres empruntés
  const fetchUserDetails = (userName: string): UserDetails => {
    const userMockData: UserDetails = {
      userName,
      borrowedBooks: ["Les Misérables", "1984", "L'Étranger"],
    };
    return userMockData;
  };

  // Ouvre la modale avec les détails de la demande
  const handleViewDetails = (request: BorrowRequest) => {
    const userDetails = fetchUserDetails(request.userName);
    setSelectedRequest({
      ...request,
      borrowedBooks: userDetails.borrowedBooks,
    });
  };

  const closeDetails = () => setSelectedRequest(null);

  // Action pour approuver ou refuser
  const handleAction = (status: "Approuvée" | "Refusée") => {
    if (selectedRequest) {
      const updatedRequest = { ...selectedRequest, status };
      setBorrowRequests((prev) =>
        prev.map((req) => (req.id === selectedRequest.id ? updatedRequest : req))
      );

      socket.emit("update_request", updatedRequest);

      setSelectedRequest(null); 
    }
  };

  return (
    <div className={styles.librarian}>
      <h2>Demandes d&#39;emprunt</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Livre</th>
            <th>Date de demande</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.userName}</td>
              <td>{request.bookTitle}</td>
              <td>{new Date(request.requestedAt).toLocaleString()}</td>
              <td>{request.status}</td>
              <td>
                <FaGavel
                  className={styles.gavelIcon}
                  onClick={() => handleViewDetails(request)}
                  title="Examiner la demande"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale */}
      {selectedRequest && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Informations de l&#39;utilisateur</h3>
            <p>
              <strong>Nom :</strong> {selectedRequest.userName}
            </p>
            <h4>Livres empruntés :</h4>
            <ul>
              {selectedRequest.borrowedBooks.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
            <h4>Demande actuelle :</h4>
            <p>
              <strong>Livre demandé :</strong> {selectedRequest.bookTitle}
            </p>
            <p>
              <strong>Date de demande :</strong>{" "}
              {new Date(selectedRequest.requestedAt).toLocaleString()}
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.approveButton}
                onClick={() => handleAction("Approuvée")}
              >
                Approuver
              </button>
              <button
                className={styles.rejectButton}
                onClick={() => handleAction("Refusée")}
              >
                Refuser
              </button>
            </div>
            <button className={styles.closeButton} onClick={closeDetails}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibrarianPage;
