export interface EditBookFormProps {
  book: IBook;
  onClose: () => void;
  onYes: () => void;
  open: boolean;
}

export interface IFormValues {
  title: string;
  author: string;
  category: string;
  price: number;
  cover: string;
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  cover: string;
  reserved: string;
}

export interface IApiResponse {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  cover: string;
  reserved: string;
}

export interface IBookNoId {
  title: string;
  author: string;
  category: string;
  cover: string;
  price: number;
  reserved: string;
}
