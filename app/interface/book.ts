export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  year_of_publication: string;
  publisher: string;
  genre: string;
  image_url_s: string;
  image_url_m: string;
  image_url_l: string;
  availability: boolean;
  library?: Library | null;
}

export interface Library {
  id: number;
  name: string;
}

export interface PaginatedResponse<T> {
  books: T[];
  currentPage: number;
  totalPages: number;
}

export interface CatalogListProps {
  searchTerm: string;
}
