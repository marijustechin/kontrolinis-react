import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AddNewBookPage from "./pages/AddNewBookPage";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="nauja-knyga" element={<AddNewBookPage />} />
          <Route path="knygos/:id" element={<BookDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
