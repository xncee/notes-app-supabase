import type { Note } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { deleteNote, updateNote } from "@/data/notes/notes";
import { toast } from "sonner";
import TextEditor from "./text-editor";
import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function NoteDetails({ note }: { note: Note }) {
  const [currentNoteContent, setCurrentNoteContent] = useState<string>(
    note.content,
  );
  const [isSaving, setSaving] = useState(false);

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
  const handleUpdateNote = async () => {
    if (currentNoteContent === note.content) return;
    setSaving(true);

    note.content = currentNoteContent;
    const { error } = await updateNote(note);
    if (error) {
      toast.error("Note Was Not Updated", {
        description: error.message || "An error occurred.",
      });
    } else {
      toast.message("Note updated.");
    }
    setSaving(false);
  };

  return (
    <Card className="flex h-full w-full justify-between">
      <CardHeader className="flex flex-col justify-between gap-5 md:flex-row">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground float-right">
            {formatDate(note.created_at!)}
          </p>
          <h1 className="pb-2 text-2xl leading-tight font-extrabold text-balance break-words">
            {note.title}
          </h1>
        </div>
        <div className="mb-auto ml-auto flex gap-2">
          <Button
            variant="outline"
            onClick={handleUpdateNote}
            className="text-muted-foreground hover:cursor-pointer"
            hidden={currentNoteContent === note.content || isSaving}
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
            className="field-sizing-content w-full resize-none border-none break-words whitespace-pre-line outline-none"
            value={currentNoteContent}
            onChange={(e) => setCurrentNoteContent(e.target.value)}
            onBlur={handleUpdateNote}
          />
        </TextEditor>
      </CardContent>
    </Card>
  );
}
