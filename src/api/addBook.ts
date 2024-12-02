import axios from "axios";
import { IApiResponse, IBookNoId } from "../helpers/interfaces";
import { API_BOOKS_URL } from "../helpers/constants";

export const apiAddBook = async (book: IBookNoId) => {
  try {
    const res = await axios.post<IApiResponse | string>(API_BOOKS_URL, book);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.message === "Network Error") {
        return "Nepavyko gauti duomenų: json-serveris neatsako - arba jis neveikia, arba neteisingas prievadas";
      }
    }
    return "Įvyko nenumatyta klaida";
  }
};
