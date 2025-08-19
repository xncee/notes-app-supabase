import type { Note } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { deleteNote, updateNote } from "@/data/notes/notes";
import { toast } from "sonner";
import TextEditor from "./text-editor";
import { Trash2 } from "lucide-react";

export default function NoteDetail({ note }: { note: Note }) {
  const [currentNoteContent, setCurrentNoteContent] = useState<string>(
    note.content,
  );
  const [isSaving, setSaving] = useState(false);

  const formattedDate = new Date(note.created_at!).toLocaleString();

  const handleDeleteNote = async () => {
    const { error } = await deleteNote(note.id!);
    if (error) {
      toast.error("Note Was Not Deleted", {
        description: error.message || "An error occurred.",
      });
    } else {
      toast.warning("Note deleted.");
      window.location.href = "/notes";
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
      <CardHeader className="flex flex-wrap-reverse justify-between gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-[var(--color-muted-foreground)]">
            {formattedDate}
          </p>
          <h1 className="text-2xl font-bold text-balance">{note.title}</h1>
        </div>
        <div className="mb-auto ml-auto flex gap-2">
          <Button
            variant="outline"
            size="lg"
            onClick={handleUpdateNote}
            className="text-muted-foreground hover:cursor-pointer"
            hidden={currentNoteContent === note.content || isSaving}
          >
            Save
          </Button>
          <Button
            variant="destructive"
            size="lg"
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
