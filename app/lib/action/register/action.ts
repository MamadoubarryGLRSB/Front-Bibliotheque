'use server';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default async function createUser(data: CreateUserData) {
  try {
    const response = await fetch('http://localhost:8080/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      } as HeadersInit,
      body: JSON.stringify(data)
    });

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
