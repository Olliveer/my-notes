"use server";

import { db } from "@/db/drizzle";
import { notes, NoteInsert } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const createNote = async (values: NoteInsert) => {
  try {
    await db.insert(notes).values(values);

    revalidatePath("/dashboard");
  } catch (error) {
    console.log("createNotebook error", error);
    throw error;
  }
};

export const getNotesByUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    const response = await db
      .select()
      .from(notes)
      .where(eq(notes.notebookId, session.user.id));
    return response;
  } catch (error) {
    console.log("getNotes error", error);
    throw error;
  }
};

export const getNoteById = async (id: string) => {
  try {
    const note = await db.query.notes.findFirst({
      where: eq(notes.id, id),
      with: {
        notebook: true,
      },
    });

    return { success: true, note };
  } catch {
    return { success: false, message: "Failed to get notebook" };
  }
};

export const updateNote = async (id: string, values: Partial<NoteInsert>) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    await db.update(notes).set(values).where(eq(notes.id, id));
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("updateNote error", error);
    throw error;
  }
};

export const deleteNote = async (id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    await db.delete(notes).where(eq(notes.id, id));
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("deleteNote error", error);
    throw error;
  }
};
