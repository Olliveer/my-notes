import CreateNoteButton from "@/components/create-note-button";
import NoteCard from "@/components/note-card";
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{data.notebook?.name}</h1>
      <CreateNoteButton notebookId={notebookId} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
        {data.notebook?.notes &&
          data.notebook?.notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
      </div>
    </div>
  );
}
