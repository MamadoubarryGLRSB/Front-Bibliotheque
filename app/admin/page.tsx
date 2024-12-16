"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";

interface Librarian {
  id: string;
  name: string;
  email: string;
}

const AdminRole: React.FC = () => {
  const [librarians, setLibrarians] = useState<Librarian[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadLibrarians();
  }, []);

  const loadLibrarians = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Librarian[]>("/api/librarians");
      setLibrarians(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des bibliothécaires", error);
      setError("Impossible de charger les bibliothécaires.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddLibrarian = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Le nom et l'email sont requis.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post<Librarian>("/api/librarians", { name, email });
      setLibrarians([...librarians, response.data]);
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du bibliothécaire", error);
      setError("Impossible d'ajouter le bibliothécaire.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLibrarian = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce bibliothécaire ?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`/api/librarians/${id}`);
      setLibrarians(librarians.filter((librarian) => librarian.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
      setError("Impossible de supprimer le bibliothécaire.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-role-container">
      <h1>Gestion des bibliothécaires</h1>

      <form onSubmit={handleAddLibrarian} className="add-librarian-form">
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Ajout..." : "Ajouter"}
        </button>
      </form>

      <div className="librarian-list">
        <h2>Liste des bibliothécaires</h2>
        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <ul>
            {librarians.map((librarian) => (
              <li key={librarian.id}>
                <span>
                  {librarian.name} ({librarian.email})
                </span>
                <button
                  onClick={() => handleDeleteLibrarian(librarian.id)}
                  disabled={loading}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminRole;
