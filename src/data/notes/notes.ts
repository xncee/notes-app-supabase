import supabase from "@/lib/supabase/client";
import type { Note } from "@/lib/types";

export async function getNoteById(id: string) {
  const { data, error } = await supabase.from("notes").select().eq("id", id);

  return { data, error };
}

export async function getNotes() {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function createNote(note: Note) {
  const { data, error } = await supabase.from("notes").insert([note]).select();

  return { data, error };
}

export async function deleteNote(id: number) {
  const { data, error } = await supabase.from("notes").delete().eq("id", id);

  return { data, error };
}

export async function updateNote(note: Note) {
  const { data, error } = await supabase
    .from("notes")
    .update(note)
    .eq("id", note.id)
    .select();

  return { data, error };
}
