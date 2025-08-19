import supabase from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Note } from "@/lib/types";
import NoteCard from "@/components/note-card";
import { getNotes } from "@/data/notes/notes";
import NoteForm from "@/components/note-form";
import { NoteSkeleton } from "@/components/note-skeleton";

export default function NotesPage() {
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [isFetching, setFetching] = useState(false);

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

  const addNewNote = async (note: Note) => {
    setNotesList((prevNotes) => [note, ...prevNotes]);
  };

  const deleteNoteById = async (id: number) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      console.error("Error deleting note:", error);
    } else {
      setNotesList(notesList.filter((note) => note.id !== id));
    }
  };
  const renderSkeletons = (count: number) => {
    return (
      <>
        {Array.from({ length: count }, (_, index) => (
          <NoteSkeleton key={index} />
        ))}
      </>
    );
  };

  return (
    <div className="mt-10 flex w-full flex-col gap-10 p-4">
      <NoteForm
        className="w-full self-center md:w-[100%] lg:w-[75%]"
        addNewNote={addNewNote}
      />
      <div className="flex flex-col gap-5">
        <h1 className="text-center text-4xl font-bold md:text-3xl">Notes</h1>
        <ul className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isFetching && renderSkeletons(screen.width <= 768 ? 2 : 4)}
          {notesList.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={deleteNoteById} />
          ))}
        </ul>
      </div>
    </div>
  );
}
