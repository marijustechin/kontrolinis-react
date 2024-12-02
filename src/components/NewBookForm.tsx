import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_BOOKS_URL } from "../helpers/constants";
import axios from "axios";
import { IApiResponse, IFormValues } from "../helpers/interfaces";
import { useNavigate } from "react-router";

export const NewBookForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({});

  useEffect(() => {
    getAllCategories(API_BOOKS_URL);
  }, []);

  const getAllCategories = async (url: string) => {
    try {
      const res = await axios.get<IApiResponse[]>(url);
      const allCategories = res.data.map((book) => {
        return book.category;
      });
      const categories = [...new Set(allCategories)];
      setCategories(categories);
    } catch (error) {
      if (error) return error;
      return ["Klaida"];
    }
  };

  const onSubmit: SubmitHandler<IFormValues> = async (formData) => {
    try {
      await axios.post(API_BOOKS_URL, formData);

      setSuccess(
        "Knyga sėkmingai pridėta prie knygų sąrašo. Po 5 sekundžių busite nukreipti į knygų sąrašą."
      );
      setError("");
      reset();
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      if (error) setError("Nepavyko prideti knygos");
      setSuccess("");
    }
  };

  return (
    <form
      className="max-w-lg border rounded-lg mx-auto p-2"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        {/* Info blokas */}
        <div className="h-16 w-full font-semibold text-lg text-center">
          {success && <span className="text-emerald-600">{success}</span>}
          {error && <span className="text-rose-500">{error}</span>}
          {!error && !success && (
            <span>
              Norėdami pridėti naują knygą, užpildykite formą. Visi formos
              laukai privalomi!
            </span>
          )}
        </div>
        {/* Pavadinimas ******************************************/}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-9 items-center gap-2">
            <div className="col-span-3 justify-end">
              <label className="font-semibold text-right" htmlFor="title">
                Knygos pavadinimas
              </label>
            </div>
            <div className="col-span-6">
              <input
                className="w-full p-2 rounded-lg border border-slate-500"
                aria-invalid={errors.title ? "true" : "false"}
                type="text"
                id="title"
                autoComplete="on"
                {...register("title", {
                  required: "Pamiršote įvesti knygos pavadinimą",
                  minLength: {
                    value: 3,
                    message:
                      "Knygos pavadinimmas turi būti ne trumpesnis kaip 3 simboliai",
                  },
                  maxLength: {
                    value: 100,
                    message:
                      "Knygos pavadinimas negali būti ilgesnis kaip 100 simbolių",
                  },
                })}
              />
            </div>
          </div>
          {errors.title && (
            <span className="text-sm text-right text-rose-500" role="alert">
              {errors.title.message}
            </span>
          )}
        </div>
        {/* Autorius **********************************************/}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-9 items-center gap-2">
            <div className="col-span-3 justify-self-end">
              <label className="font-semibold" htmlFor="author">
                Autorius
              </label>
            </div>
            <div className="col-span-6">
              <input
                className="w-full p-2 rounded-lg border border-slate-500"
                aria-invalid={errors.author ? "true" : "false"}
                type="text"
                id="author"
                autoComplete="on"
                {...register("author", {
                  required: "Pamiršote įvesti el. pašto adresą",
                  pattern: {
                    value: /^[\w\-\s]+$/,
                    message:
                      "Autorius vardas ir pavardė gali būti sudarytas tik iš raidžių ir tarpų",
                  },
                })}
              />
            </div>
          </div>
          {errors.author && (
            <span className="text-sm text-right text-rose-500" role="alert">
              {errors.author.message}
            </span>
          )}
        </div>

        {/* Kategorija ******************************************/}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-9 items-center gap-2">
            <div className="col-span-3 justify-self-end">
              <label className="font-semibold" htmlFor="category">
                Kategorija
              </label>
            </div>
            <div className="col-span-6">
              <select
                className="border border-slate-400 w-full p-2 rounded-lg"
                id="category"
                {...register("category", {
                  required: "Prašome pasirinkti kategoriją",
                })}
              >
                <option className="bg-rose-500" value={""}>
                  --pasirinkite kategoriją--
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.category && (
            <span className="text-sm text-right text-rose-500" role="alert">
              {errors.category.message}
            </span>
          )}
        </div>
        {/* Kaina **********************************************/}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-9 items-center gap-2">
            <div className="col-span-3 justify-self-end">
              <label className="font-semibold" htmlFor="price">
                Kaina
              </label>
            </div>
            <div className="col-span-6">
              <input
                className="w-full p-2 rounded-lg border border-slate-500"
                aria-invalid={errors.price ? "true" : "false"}
                type="number"
                id="price"
                autoComplete="on"
                {...register("price", {
                  required: "Pamiršote nurodyti kainą",
                  min: {
                    value: 1,
                    message:
                      "Kaina turi būti teigiamas skaičius didesnis už nulį",
                  },
                })}
              />
            </div>
          </div>
          {errors.price && (
            <span className="text-sm text-right text-rose-500" role="alert">
              {errors.price.message}
            </span>
          )}
        </div>

        {/* Viršelis **********************************************/}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-9 items-center gap-2">
            <div className="col-span-3 justify-self-end">
              <label className="font-semibold" htmlFor="cover">
                Viršelis
              </label>
            </div>
            <div className="col-span-6">
              <input
                className="w-full p-2 rounded-lg border border-slate-500"
                aria-invalid={errors.cover ? "true" : "false"}
                type="text"
                id="cover"
                autoComplete="on"
                {...register("cover", {
                  required: "Pamiršote nurodyti knygos viršelį",
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg))$/,
                    message: "Neteisingas knygos viršelio adreso formatas",
                  },
                })}
              />
            </div>
          </div>
          {errors.cover && (
            <span className="text-sm text-right text-rose-500" role="alert">
              {errors.cover.message}
            </span>
          )}
        </div>

        <button className="py-2 bg-slate-500 hover:bg-slate-600 text-slate-50 font-semibold rounded-lg">
          Pridėti knygą
        </button>
      </div>
    </form>
  );
};
