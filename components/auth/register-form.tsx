'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { z } from 'zod';
import createUser from '@/app/lib/action/register/action';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<CreateUserData>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const schema = z
    .object({
      name: z.string().min(5, 'Le nom doit contenir au moins 5 caractères.'),
      email: z.string().email('Veuillez entrer une adresse email valide.'),
      password: z.string().min(5, 'Le mot de passe doit contenir au moins 5 caractères.'),
      passwordConfirm: z.string().min(5, 'La confirmation doit contenir au moins 5 caractères.')
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: 'Les mots de passe ne correspondent pas.',
      path: ['passwordConfirm']
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await schema.parseAsync(formData);

      const response = await createUser(formData);

      if (response?.message === 'User created successfully') {
        toast.success('Compte créé avec succès');
        router.push('/');
      } else {
        toast.error(response?.message || 'Erreur lors de la création du compte');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      } else {
        toast.error('Une erreur est survenue.');
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Créer un compte</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: 'Nom', name: 'name', type: 'text', placeholder: 'Votre nom' },
          { label: 'Email', name: 'email', type: 'email', placeholder: 'Votre email' },
          { label: 'Mot de passe', name: 'password', type: 'password', placeholder: 'Votre mot de passe' },
          {
            label: 'Confirmez le mot de passe',
            name: 'passwordConfirm',
            type: 'password',
            placeholder: 'Confirmez votre mot de passe'
          }
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof CreateUserData]}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[field.name] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Créer mon compte
        </button>
      </form>
    </div>
  );
}
