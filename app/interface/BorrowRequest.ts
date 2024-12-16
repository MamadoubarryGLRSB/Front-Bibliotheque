export interface BorrowRequest {
    id: number;
    userId: number;
    userName: string;
    bookTitle: string;
    requestedAt: string; 
    status: 'En attente' | 'Approuvée' | 'Refusée';
    borrowedBooks?: string[];
  }