import axios from "axios"
import { API_BOOKS_URL } from "../helpers/constants"
import { IApiResponse } from "../helpers/interfaces";

export const getCategories = async() =>{
    try {
        const res= await axios.get<IApiResponse[]>(API_BOOKS_URL);
        const allCategories = res.data.map((books)=>{
            return books.category
        })
        return [...new Set(allCategories)]
   
    } catch (error) {
        return ["nepavyko gauti duomenu"]
    }
    
}