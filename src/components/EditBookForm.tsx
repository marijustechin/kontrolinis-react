import { IoMdClose } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_BOOKS_URL } from "../helpers/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  EditBookFormProps,
  IApiResponse,
  IFormValues,
} from "../helpers/interfaces";

export const EditBookForm = ({
  book,
  onClose,
  onYes,
  open,
}: EditBookFormProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      title: book.title,
      author: book.author,
      price: book.price,
      cover: book.cover,
      category: book.category,
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = async (formData) => {
    console.log(formData);
    try {
      axios.put(API_BOOKS_URL + `/${book.id}`, formData);
      onYes();
      onClose();
    } catch (error) {
      if (error) setError("Klaida");
    }
  };

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
      return ["Nepavyko gauti kategorijų sąrašo"];
    }
  };

  return (
    /** overlejus */
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? "visible bg-slate-800/50" : "invisible"
      }`}
      onClick={onClose}
    >
      {/* langas */}
      <div
        // reikia sustabdyti is tevo
        // paveldeta onclik funkcija
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-100 rounded-xl shadow p-6 transition-all text-lg max-w-lg ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-slate-500 bg-slate-50 hover:bg-slate-200 hover:text-slate-600"
        >
          <IoMdClose />
        </button>

        <form
          className="max-w-lg border rounded-lg mx-auto p-2"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-2">
            {/* Info blokas */}
            <div className="h-16 w-full font-semibold text-lg text-center">
              <span>Knygos redagavimas</span>
              {error && <span className="text-rose-500">{error}</span>}
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
                    value={book.category}
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
                    step={"0.01"}
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
                      // pattern: {
                      //   value:
                      //     /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                      //   message: "Neteisingas knygos viršelio adreso formatas",
                      // },
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
            <div className="w-full flex gap-3">
              <button className="btn-generic bg-sky-500 hover:bg-sky-600 text-slate-50">
                Išsaugoti
              </button>
              <button onClick={onClose} className="btn-green">
                Atsisakyti
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
