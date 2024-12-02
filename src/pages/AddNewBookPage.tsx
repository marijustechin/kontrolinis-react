import { NewBookForm } from "../components/NewBookForm";
import { PageTitle } from "../components/shared/PageTitle";

export default function AddNewBookPage() {
  return (
    <main className="ms-container">
      <PageTitle>Nauja knyga</PageTitle>
      <NewBookForm />
    </main>
  );
}
