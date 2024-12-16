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
