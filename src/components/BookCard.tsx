import { useEffect, useState } from "react";
import { formatCurrency } from "../helpers/formatCurrencty";
import axios from "axios";
import { API_BOOKS_URL } from "../helpers/constants";
import { EditBookForm } from "./EditBookForm";
import { IBook } from "../helpers/interfaces";

export const BookCard = ({ book }: { book: IBook }) => {
  const [available, setAvailable] = useState(false);
  const [error, setError] = useState("");
  const [currBook, setCurrBook] = useState<IBook>(book);
  const [openEdit, setOpenEdit] = useState(false);

  async function setReserved(id: string, isReserved: string) {
    try {
      if (isReserved) {
        await axios.patch(API_BOOKS_URL + `/${id}`, {
          reserved: isReserved,
        });
        setAvailable(false);
      } else {
        await axios.patch(API_BOOKS_URL + `/${id}`, {
          reserved: isReserved,
        });
        setAvailable(true);
      }
    } catch (error) {
      if (error) setError("Klaida");
    }
  }

  async function getReserved(id: string) {
    try {
      const res = await axios.get(API_BOOKS_URL + `/${id}`);
      setCurrBook(res.data);
    } catch {
      setError("Klaida");
    }
  }

  useEffect(() => {
    getReserved(book.id);
  }, [currBook]);

  const handleEditForm = () => {
    setOpenEdit(true);
  };

  return (
    <div className="relative m-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href={`/knygos/${currBook.id}`}
      >
        <img
          className="object-cover"
          src={currBook.cover}
          alt={currBook.title}
        />
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href={`/knygos/${currBook.id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-slate-900">
            {currBook.title}
          </h5>
        </a>
        <h3 className="text-md">{currBook.author}</h3>
        <h4>{currBook.category}</h4>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p className="flex gap-2 items-end">
            <span className="text-2xl font-bold text-slate-800">
              {formatCurrency(currBook.price)}
            </span>
          </p>
        </div>
        <div className="flex gap-3">
          {currBook.reserved === "false" ? (
            <button
              onClick={() => setReserved(currBook.id, "true")}
              className="btn-generic bg-emerald-500 hover:bg-emerald-600 text-slate-50"
            >
              Išduoti
            </button>
          ) : (
            <button
              onClick={() => setReserved(currBook.id, "false")}
              className="btn-generic bg-slate-500 hover:bg-slate-600 text-slate-50"
            >
              Grąžinti
            </button>
          )}
          <button
            onClick={handleEditForm}
            className="btn-generic bg-sky-500 hover:bg-sky-600 text-sky-50"
          >
            Redaguoti
          </button>
        </div>
      </div>
      {openEdit && (
        <EditBookForm
          open={openEdit}
          book={currBook}
          onClose={() => setOpenEdit(false)}
          onYes={() => setCurrBook({ ...currBook })}
        />
      )}
    </div>
  );
};
