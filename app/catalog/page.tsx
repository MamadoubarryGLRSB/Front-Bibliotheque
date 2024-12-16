import CatalogList from '@/components/book/cataog-wrapper';

export async function getBooks() {
  try {
    const res = await fetch('http://localhost:8080/api/books', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { tags: ['books'] }
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP : ${res.status}`);
    }

    const books = await res.json();
    return books;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erreur dans getBooks:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Une erreur inconnue est survenue');
      throw new Error('An unknown error occurred');
    }
  }
}

export default async function CatalogPage() {
  const dataBook = await getBooks();
  console.log(dataBook);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Book Catalog</h1>
      <p className="text-lg text-center">Explorez notre catalogue de livres disponibles.</p>

      <CatalogList dataBook={dataBook} />
    </div>
  );
}
