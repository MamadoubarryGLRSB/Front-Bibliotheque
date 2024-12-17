'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import { login } from '@/app/lib/action/auth/action';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/app/lib/action/redux/features/auth.slice';
import { createSession } from '@/app/lib/action/session/session';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      if (response?.message === 'User connected successfully') {
        dispatch(
          setAuth({
            accessToken: response.token,
            isAuth: true
          })
        );

        await createSession({
          email,
          token: response.token
        });

        toast.success('Connexion réussie');
        router.push('/profil');
      } else {
        toast.error(response?.message || 'Erreur de connexion');
      }
    } catch (error) {
      toast.error((error as Error).message || 'Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Se connecter</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Entrez votre email"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Entrez votre mot de passe"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Connexion
      </button>
    </form>
  );
}
