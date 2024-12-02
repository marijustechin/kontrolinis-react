import axios from "axios";
import { IApiResponse, IBook } from "../helpers/interfaces";
import { API_BOOKS_URL } from "../helpers/constants";

export const apiGetAllBooks = async () => {
  try {
    const res = await axios.get<IApiResponse[] | string>(API_BOOKS_URL);
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

export const apiGetBookById = async (bookId: string) => {
  try {
    const res = await axios.get<IBook | string>(`${API_BOOKS_URL}/${bookId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      if (error.message === "Network Error") {
        return "Nepavyko gauti duomenų: json-serveris neatsako - arba jis neveikia, arba neteisingas prievadas";
      } else if (error.message === "Request failed with status code 404")
        return "Tokio ID nepavyko rasti";
    }
    return "Įvyko nenumatyta klaida";
  }
};
