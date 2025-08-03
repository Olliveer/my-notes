import CreateNotebookButton from "@/components/create-notebook-button";
import Notebooks from "@/components/notebooks";
import { getNotebooksByUser } from "@/server/notebooks";

export default async function DashboardPage() {
  const data = await getNotebooksByUser();

  return (
    <div>
      <CreateNotebookButton />
      <h1 className="text-2xl font-bold">Notebooks</h1>

      {data.notebooks && <Notebooks notebooks={data.notebooks} />}
    </div>
  );
}
