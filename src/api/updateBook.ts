import axios from "axios";
import { API_BOOKS_URL } from "../helpers/constants";
import { IBook, IBookNoId } from "../helpers/interfaces";

export const updateBook = async (bookId: string, book: IBookNoId) => {
  try {
    const res = await axios.put<IBook | string>(
      `${API_BOOKS_URL}/${bookId}`,
      book
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      if (error.message === "Network Error") {
        return "Nepavyko gauti duomenų: json-serveris neatsako - arba jis neveikia, arba neteisingas prievadas";
      }
    }
    return "Įvyko nenumatyta klaida";
  }
};
