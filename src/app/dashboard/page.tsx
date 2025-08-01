import Logout from "@/components/logout";
import Notebooks from "@/components/notebooks";
import { getNotebooksByUser } from "@/server/notebooks";

export default async function DashboardPage() {
  const notebooks = await getNotebooksByUser();

  return (
    <div>
      DashboardPage <Logout />
      <Notebooks notebooks={notebooks} />
    </div>
  );
}
