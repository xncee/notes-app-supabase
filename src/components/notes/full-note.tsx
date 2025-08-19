import type { Note } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { updateNote } from "@/data/notes/notes";
import { toast } from "sonner";
import TextEditor from "./text-editor";

export default function FullNote({
  note,
}: {
  note: Note;
  fullView?: boolean;
  onDelete: (id: number) => void;
}) {
  const [currentNoteContent, setCurrentNoteContent] = useState<string>(
    note.content,
  );
  const formattedDate = new Date(note.created_at!).toLocaleString();

  const handleUpdateNote = async () => {
    if (currentNoteContent === note.content) return;

    note.content = currentNoteContent;
    const { error } = await updateNote(note);
    if (error) {
      toast.error("Note Was Not Updated", {
        description: error.message || "An error occurd.",
      });
    } else {
      toast.success("Note updated.");
    }
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
            hidden={note.content === currentNoteContent}
          >
            Save
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="hover:opacity-75"
            onClick={() => {}}
          >
            Delete
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardFooter className="flex w-full items-center justify-between px-4"></CardFooter>
      <CardContent className="break-words whitespace-pre-line">
        <TextEditor>
          <textarea
            className="field-sizing-content resize-none border-none outline-none"
            value={currentNoteContent}
            onChange={(e) => setCurrentNoteContent(e.target.value)}
          />
        </TextEditor>
      </CardContent>
    </Card>
  );
}
