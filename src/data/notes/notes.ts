import supabase from "@/lib/supabase/client";

export async function getNotes() {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function createNote(note: { title: string; body: string }) {
  const { title, body } = note;

  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, body }])
    .select();

  return { data, error };
}

export async function deleteNote(id: number) {
  const { data, error } = await supabase.from("notes").delete().eq("id", id);

  return { data, error };
}
