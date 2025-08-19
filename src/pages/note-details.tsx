import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Note } from "@/lib/types";
import PageNotFound from "./page-not-found";
import InternalServerError from "./internal-server-error";
import FullNote from "@/components/notes/full-note";
import { getNoteById } from "@/data/notes/notes";

export default function NoteDetails() {
  const { noteId } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isValidId = noteId && !isNaN(Number(noteId));

  useEffect(() => {
    if (isValidId) fetchNote();
  }, []);

  const fetchNote = async () => {
    setIsLoading(true);
    const { data, error } = await getNoteById(noteId!);
    if (error) {
      return <InternalServerError />;
    }

    if (data) setNote(data[0]);
    setIsLoading(false);
  };

  if (!isValidId) {
    return <PageNotFound />;
  }

  if (isLoading) {
    return null;
  }

  if (!note) {
    return <PageNotFound />;
  }
  return (
    <div className="p-4">
      <FullNote note={note} onDelete={() => {}} />
    </div>
  );
}
