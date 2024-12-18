export interface BorrowRequest {
  id: number;
  userId: number;
  userName: string;
  bookTitle: string;
  loanDate: string; 
  status: "En attente" | "Approuvée" | "Refusée";
  borrowedBooks?: string[];
}
