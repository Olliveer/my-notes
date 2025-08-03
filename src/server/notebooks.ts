"use server";

import { db } from "@/db/drizzle";
import { NotebookInsert, notebooks } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const createNotebook = async (values: NotebookInsert) => {
  try {
    await db.insert(notebooks).values(values);

    revalidatePath("/dashboard");
  } catch (error) {
    console.log("createNotebook error", error);
    throw error;
  }
};

export const getNotebooksByUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    const response = await db.query.notebooks.findMany({
      where: eq(notebooks.userId, session.user.id),
      with: {
        notes: true,
      },
    });
    return {
      success: true,
      notebooks: response,
    };
  } catch (error) {
    console.log("getNotebooks error", error);
    return {
      success: false,
      error: error,
    };
  }
};

export const getNotebookById = async (id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    const response = await db.query.notebooks.findFirst({
      where: and(eq(notebooks.id, id), eq(notebooks.userId, session.user.id)),
      with: {
        notes: true,
      },
    });
    return response;
  } catch (error) {
    console.log("getNotebookById error", error);
    throw error;
  }
};

export const updateNotebook = async (id: string, values: NotebookInsert) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    await db
      .update(notebooks)
      .set(values)
      .where(and(eq(notebooks.id, id), eq(notebooks.userId, session.user.id)));
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("updateNotebook error", error);
    throw error;
  }
};

export const deleteNotebook = async (id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    await db
      .delete(notebooks)
      .where(and(eq(notebooks.id, id), eq(notebooks.userId, session.user.id)));
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("deleteNotebook error", error);
    throw error;
  }
};
