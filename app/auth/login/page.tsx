"use client";

import Link from "next/link";
import api from "@/api"; // Import de l'instance Axios
import axios from "axios";
import { useRouter } from "next/navigation"; // Hook pour la redirection
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter(); // Initialisation du routeur
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await api.post("/connect", formData); // Envoie les données au backend
      console.log("Connexion réussie :", response.data);

      // Redirige vers la page de catalogue après la connexion
      router.push("/catalog");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data || "Une erreur est survenue.");
      } else {
        setErrorMessage("Une erreur inattendue est survenue.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Se connecter
          </button>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
        <p className="text-sm text-center mt-4">
          Vous n&#39;avez pas de compte ?{" "}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Créez-en un
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
