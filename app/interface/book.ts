export default interface IBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  image: string | null;
  availability: boolean;
  library: string | null;
  loans: string | null;
}

// export interface Library {
//   id: number;
//   name: string;
// }

// export interface PaginatedResponse<T> {
//   books: T[];
//   currentPage: number;
//   totalPages: number;
// }

// export interface CatalogListProps {
//   searchTerm: string;
// }
