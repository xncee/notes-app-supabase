import supabase from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Note } from "@/lib/types";
import NoteCard from "@/components/notes/note-card";
import { getNotes } from "@/data/notes/notes";
import { NoteCardSkeleton } from "@/components/skeletons/note-card-skeleton";
import { toast } from "sonner";

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
      toast.error("Failed to fetch notes. Try refreshing the page.", {
        description: error.message,
      });
    } else {
      setNotesList(data!);
    }
    setFetching(false);
  };

  const deleteNoteById = async (id: number) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      console.error("Error deleting note:", error);
    } else {
      setNotesList(notesList.filter((note) => note.id !== id));
    }
  };
  const renderSkeletons = () => {
    let count = 2;
    if (window.innerWidth >= 1024) {
      count = 6;
    } else if (window.innerWidth >= 768) {
      count = 4;
    }

    return (
      <>
        {Array.from({ length: count }, (_, index) => (
          <NoteCardSkeleton key={index} />
        ))}
      </>
    );
  };

  return (
    <div className="mt-10 flex w-full flex-col p-4">
      <div className="flex flex-col gap-10">
        <h1 className="text-center text-4xl font-extrabold">Notes</h1>
        <ul className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isFetching && renderSkeletons()}
          {notesList.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={deleteNoteById} />
          ))}
        </ul>
      </div>
    </div>
  );
}
