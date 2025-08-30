import supabase from "@/lib/supabase/client";
import type { Note } from "@/lib/types";

export async function getNoteById(
  id: string,
): Promise<{ data: Note | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("notes")
    .select()
    .eq("id", id)
    .single();

  return { data, error };
}

export async function getNotes() {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("updated_at", { ascending: false });

  return { data, error };
}

export async function createNote(note: Pick<Note, "title" | "content">) {
  const { data, error } = await supabase.from("notes").insert([note]).select();

  return { data, error };
}

export async function deleteNote(id: number) {
  const { data, error } = await supabase.from("notes").delete().eq("id", id);

  return { data, error };
}

export async function updateNote(note: Pick<Note, "id" | "title" | "content">) {
  const { data, error } = await supabase
    .from("notes")
    .update({ ...note, updated_at: new Date().toISOString() })
    .eq("id", note.id)
    .select()
    .single();

  return { data, error };
}
