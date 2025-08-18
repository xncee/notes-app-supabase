import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase/client";
import { useEffect, useState, type FormEvent } from "react";
import type { Note } from "@/lib/types";
import NoteCard from "@/components/note-card";
import { createNote, getNotes } from "@/data/notes/notes";

export default function NotesPage() {
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [isFetching, setFetching] = useState(false);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    retrieveNotes();
  }, []);

  const retrieveNotes = async () => {
    setFetching(true);
    const { data, error } = await getNotes();
    if (error) {
      console.error("Error fetching notes:", error);
    } else if (data && data.length > 0) setNotesList(data);

    setFetching(false);
  };

  const createNewNote = async (e: FormEvent) => {
    e.preventDefault();
    const note = {
      title: newNote.trim(),
      body: "",
    };

    const { data, error } = await createNote(note);
    if (error) {
      console.error("Error creating note:", error);
    } else if (data && data.length > 0) setNotesList([data[0], ...notesList]);

    setNewNote("");
  };

  const deleteNoteById = async (id: number) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      console.error("Error deleting note:", error);
    } else {
      setNotesList(notesList.filter((note) => note.id !== id));
    }
  };

  return (
    <div className="mt-5 flex h-screen w-full flex-col gap-4">
      <form
        onSubmit={createNewNote}
        className="flex w-full flex-col gap-2 self-center p-4 md:w-175"
      >
        <Input
          type="text"
          placeholder="Enter a note.."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Add Note
        </Button>
      </form>
      <h1 className="flex justify-center text-4xl font-bold md:text-3xl">
        Notes
      </h1>
      <ul className="m-4 grid grid-cols-1 items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
        {isFetching && <h1>Loading..</h1>}
        {notesList.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={deleteNoteById} />
        ))}
      </ul>
    </div>
  );
}
