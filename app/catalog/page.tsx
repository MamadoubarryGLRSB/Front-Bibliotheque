import CatalogList from '@/components/book/CatalogList';

export default function CatalogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Book Catalog</h1>
      <p className="text-lg text-center">Explorez notre catalogue de livres disponibles.</p>

      <CatalogList />
    </div>
  );
}
