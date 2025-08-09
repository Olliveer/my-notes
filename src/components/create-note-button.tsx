"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { LoaderIcon, PlusIcon } from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { createNotebook } from "@/server/notebooks";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { createNote } from "@/server/notes";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
});

interface CreateNoteButtonProps {
  notebookId: string;
}

export default function CreateNoteButton({
  notebookId,
}: CreateNoteButtonProps) {
  const session = authClient.useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return toast.error("Unauthorized");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await createNote({
        title: values.name,
        content: {},
        notebookId,
      });
      toast.success("Note created");
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.log("createNote error", error);
      toast.error("Failed to create note" + error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create note</DialogTitle>
          <DialogDescription>
            Create a new note to store your notes.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Note" {...field} />
                  </FormControl>
                  <FormDescription>Give your note a name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderIcon className="mr-2 size-4 animate-spin" />{" "}
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
