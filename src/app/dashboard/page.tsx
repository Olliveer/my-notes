import CreateNotebookButton from "@/components/create-notebook-button";
import NotebookCard from "@/components/notebook-card";
import Notebooks from "@/components/notebooks";
import { getNotebooksByUser } from "@/server/notebooks";

export default async function DashboardPage() {
  const data = await getNotebooksByUser();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Notebooks</h1>
      <CreateNotebookButton />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
        {data.notebooks &&
          data.notebooks.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}
      </div>
    </div>
  );
}
