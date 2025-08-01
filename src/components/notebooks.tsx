import { Notebook } from "@/db/schema";

export default function Notebooks({ notebooks }: { notebooks: Notebook[] }) {
  return <div>{notebooks.map((notebook) => notebook.name)}</div>;
}
