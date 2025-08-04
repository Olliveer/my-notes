import { getNotebookById } from "@/server/notebooks";

export default async function NotebookPage({
  params,
}: {
  params: { notebookId: string };
}) {
  const { notebookId } = await params;

  const data = await getNotebookById(notebookId);

  if (!data.success) {
    return <div>notebook not found</div>;
  }

  return <div>NotebookPage {data.notebook?.name}</div>;
}
