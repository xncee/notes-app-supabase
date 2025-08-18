import { useParams } from "react-router-dom";
import supabase from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Note } from "@/lib/types";
import PageNotFound from "./page-not-found";
import InternalServerError from "./internal-server-error";
import NoteCard from "@/components/note-card";

export default function NoteDetails() {
  const { noteId } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isValidId = noteId && !isNaN(Number(noteId));

  const fetchNote = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select()
      .eq("id", noteId);
    if (error) {
      return <InternalServerError />;
    }

    if (data) setNote(data[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isValidId) fetchNote();
  }, []);

  if (!isValidId) {
    return <PageNotFound />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {note ? <NoteCard note={note} onDelete={() => {}} /> : <PageNotFound />}
    </>
  );
}
