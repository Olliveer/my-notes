import { RichTextEditor } from "@/components/tiptap/rich-text-editor";
import { getNoteById } from "@/server/notes";
import { JSONContent } from "@tiptap/core";

type Params = Promise<{ noteId: string }>;

export default async function NotePage({ params }: { params: Params }) {
  const { noteId } = await params;

  const data = await getNoteById(noteId);

  if (!data.success) {
    return <div>note not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{data.note?.title}</h1>
      <RichTextEditor
        content={data.note?.content as JSONContent[]}
        nodeId={data.note?.id}
      />
    </div>
  );
}
