'use client';

import React, { useEffect, useState } from "react";

import { BorrowRequest } from "@/app/interface/BorrowRequest";
import { FaGavel } from "react-icons/fa";
import axios from "axios";
import styles from "../../modules/librarian.module.css";

type BorrowRequestWithBooks = BorrowRequest & { borrowedBooks: string[] };

const LibrarianPage: React.FC = () => {
  const [borrowRequests, setBorrowRequests] = useState<BorrowRequest[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<BorrowRequestWithBooks | null>(null);

  // Récupérer les demandes en attente depuis l'API
  useEffect(() => {
    const fetchBorrowRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/loans/requests"
        );
        setBorrowRequests(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des demandes :", error);
      }
    };

    fetchBorrowRequests();
  }, []);

  

  // Afficher les détails d'une demande
  const handleViewDetails = async (request: BorrowRequest) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${request.userId}/details`
      );
      const userDetails = response.data;

      setSelectedRequest({
        ...request,
        borrowedBooks: userDetails.borrowedBooks || [],
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails utilisateur :",
        error
      );
    }
  };

  // Valider une demande
  const validateLoanRequest = async (loanId: number, isApproved: boolean) => {
    try {
      await axios.put(`http://localhost:8080/api/loans/validate/${loanId}`, {
        isApproved,
      });
      setBorrowRequests((prev) => prev.filter((req) => req.id !== loanId));
      alert(`Demande ${isApproved ? "approuvée" : "refusée"} avec succès.`);
    } catch (error) {
      console.error("Erreur lors de la validation :", error);
      alert("Erreur : Impossible de valider la demande.");
    }
  };

  const closeDetails = () => setSelectedRequest(null);

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
          {borrowRequests.length > 0 ? (
            borrowRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.userName}</td>
                <td>{request.bookTitle}</td>
                {/* <td>{new Date(request.requestedAt).toLocaleString()}</td>
                 */}
                <td>
                  {request.loanDate
                    ? new Date(request.loanDate).toLocaleString()
                    : "Date invalide"}
                </td>
                <td>{request.status}</td>
                <td>
                  <FaGavel
                    className={styles.gavelIcon}
                    onClick={() => handleViewDetails(request)}
                    title="Examiner la demande"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Aucune demande en attente.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modale des détails */}
      {selectedRequest && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Détails de la demande</h3>
            <p>
              <strong>Utilisateur :</strong> {selectedRequest.userName}
            </p>
            <p>
              <strong>Livre demandé :</strong> {selectedRequest.bookTitle}
            </p>
            <p>
              <strong>Date de demande :</strong>{" "}
              {new Date(selectedRequest.requestedAt).toLocaleString()}
            </p>
            <h4>Livres empruntés :</h4>
            <ul>
              {selectedRequest.borrowedBooks.length > 0 ? (
                selectedRequest.borrowedBooks.map((book, index) => (
                  <li key={index}>{book}</li>
                ))
              ) : (
                <li>Aucun livre emprunté.</li>
              )}
            </ul>
            <div className={styles.modalActions}>
              <button
                className={styles.approveButton}
                onClick={() => validateLoanRequest(selectedRequest.id, true)}
              >
                Approuver
              </button>
              <button
                className={styles.rejectButton}
                onClick={() => validateLoanRequest(selectedRequest.id, false)}
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
