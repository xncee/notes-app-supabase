import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Note } from "@/lib/types";
import PageNotFound from "./page-not-found";
import InternalServerError from "./internal-server-error";
import NoteDetails from "@/components/notes/note-details";
import { getNoteById } from "@/data/notes/notes";
import NoteDetailsSkeleton from "@/components/skeletons/note-details-skeleton";

export default function NoteDetailsPage() {
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
    return (
      <div className="p-4">
        <NoteDetailsSkeleton />
      </div>
    );
  }

  if (!note) {
    return <PageNotFound />;
  }
  return (
    <div className="p-4">
      <NoteDetails note={note} />
    </div>
  );
}
