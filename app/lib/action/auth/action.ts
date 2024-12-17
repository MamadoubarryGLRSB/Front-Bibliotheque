'use server';

interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  try {
    const response = await fetch('http://localhost:8080/api/user/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la connexion. Veuillez vérifier vos informations.');
    }

    const sessionData = await response.json();

    return sessionData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Une erreur inconnue est survenue.');
    }
  }
}
