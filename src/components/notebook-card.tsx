import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notebook } from "@/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import { EyeIcon, Trash2Icon } from "lucide-react";

interface Props {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{notebook.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{notebook.notes.length} notes</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href={`/dashboard/notebook/${notebook.id}`}>
            <EyeIcon className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="destructive">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
