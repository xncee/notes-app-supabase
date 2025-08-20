import type { Note } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { deleteNote, updateNote } from "@/data/notes/notes";
import { toast } from "sonner";
import TextEditor from "./text-editor";
import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function NoteDetails({ note }: { note: Note }) {
  const [currentNoteTitle, setCurrentNoteTitle] = useState<string>(note.title);
  const [currentNoteContent, setCurrentNoteContent] = useState<string>(
    note.content,
  );
  const [isEditing, setEditing] = useState(false);

  const handleDeleteNote = async () => {
    const { error } = await deleteNote(note.id!);
    if (error) {
      toast.error("Note Was Not Deleted", {
        description: error.message || "An error occurred.",
      });
    } else {
      window.location.href = "/notes";
      toast.warning("Note deleted.");
    }
  };

  useEffect(() => {
    if (!isEditing)
      setEditing(
        currentNoteContent !== note.content || currentNoteTitle !== note.title,
      );
  }, [currentNoteContent, currentNoteTitle]);

  const handleUpdateNote = async () => {
    if (
      currentNoteContent === note.content &&
      currentNoteTitle === note.title
    ) {
      setEditing(false);
      return;
    }

    note.content = currentNoteContent;
    note.title = currentNoteTitle;
    const { error } = await updateNote(note);
    if (error) {
      toast.error("Note Was Not Updated", {
        description: error.message || "An error occurred.",
      });
    } else {
      toast.message("Note updated.");
    }
    setEditing(false);
  };

  return (
    <Card className="flex h-full w-full justify-between">
      <CardHeader className="flex flex-col justify-between gap-5 md:flex-row">
        <div className="flex w-full flex-col gap-2">
          <p className="text-muted-foreground float-right">
            {formatDate(note.created_at!)}
          </p>
          <textarea
            className="font-poppins w-full resize-none border-none pb-2 text-2xl leading-tight font-extrabold text-balance break-words whitespace-pre-line outline-none"
            value={currentNoteTitle}
            onChange={(e) => setCurrentNoteTitle(e.target.value)}
            onBlur={handleUpdateNote}
          />
        </div>
        <div className="mb-auto ml-auto flex gap-2">
          <Button
            variant="outline"
            onClick={handleUpdateNote}
            className="text-muted-foreground hover:cursor-pointer"
            hidden={!isEditing}
          >
            Save
          </Button>
          <Button
            variant="destructive"
            className="hover:cursor-pointer hover:opacity-75"
            onClick={handleDeleteNote}
          >
            <Trash2 />
            Delete
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardFooter className="flex w-full items-center justify-between px-4"></CardFooter>
      <CardContent>
        <TextEditor>
          <textarea
            className="field-sizing-content h-full w-full resize-none border-none break-words whitespace-pre-line outline-none"
            value={currentNoteContent}
            onChange={(e) => setCurrentNoteContent(e.target.value)}
            onBlur={handleUpdateNote}
          />
        </TextEditor>
      </CardContent>
    </Card>
  );
}
