import { useEffect, useState } from "react";
import { IApiResponse } from "../api/getCategories";
import { PageTitle } from "../components/shared/PageTitle";
import axios from "axios";
import { API_BOOKS_URL } from "../helpers/constants";
import { BookCard } from "../components/BookCard";
import { IBook } from "../helpers/interfaces";

const HomePage = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [apiError, setApiError] = useState("");

  async function getAllBooks(url: string) {
    try {
      const res = await axios.get<IApiResponse[]>(url);
      setBooks(res.data);
    } catch (error) {
      if (error) setApiError("Nepavyko gauti duomenų");
    }
  }

  useEffect(() => {
    getAllBooks(API_BOOKS_URL);
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
