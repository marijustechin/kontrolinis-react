import { useParams } from "react-router";

export default function BookDetails() {
  const params = useParams();
  return (
    <main className="ms-container">
      single book with id{" "}
      <span className="text-lg font-semibold">{params.id}</span>
    </main>
  );
}
