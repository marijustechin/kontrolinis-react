import { useEffect, useState } from "react";
import { PageTitle } from "../components/shared/PageTitle";
import { BookCard } from "../components/BookCard";
import { IBook } from "../helpers/interfaces";
import { apiGetAllBooks } from "../api/getBooks";

const HomePage = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [apiError, setApiError] = useState("");

  async function getAllBooks() {
    const res = await apiGetAllBooks();
    if (typeof res === "string") {
      setApiError(res);
    } else {
      setBooks(res);
    }
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <main className="text-center">
      <PageTitle>Turimų knygų sąrašas</PageTitle>
      {apiError && <span>{apiError}</span>}
      <div className="grid grid-cols-3">
        {books.map((book) => (
          <div key={book.title}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
