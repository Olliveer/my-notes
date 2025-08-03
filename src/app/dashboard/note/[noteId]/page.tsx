import { getNoteById } from "@/server/notes";

type Params = Promise<{ noteId: string }>;

export default async function NotePage({ params }: { params: Params }) {
  const { noteId } = await params;

  const data = await getNoteById(noteId);

  if (!data.success) {
    return <div>note not found</div>;
  }

  return <div>note page {data.note?.title}</div>;
}
