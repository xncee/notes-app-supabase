import type { Note } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Eye, Trash2 } from "lucide-react";

export default function NoteCard({
  note,
  fullView = false,
  onDelete,
}: {
  note: Note;
  fullView?: boolean;
  onDelete: (id: number) => void;
}) {
  const formattedDate = new Date(note.created_at!).toLocaleString();
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <Card className="flex h-full w-full justify-between">
      <CardHeader className="text-lg font-bold">
        {fullView
          ? note.title
          : note.title.length <= 20
            ? note.title
            : note.title.slice(0, 20) + "..."}
      </CardHeader>
      <Separator />
      <CardContent
        className={`${fullView ? "" : "line-clamp-3"} mb-auto align-text-top break-words whitespace-pre-line`}
      >
        {note.content}
      </CardContent>
      <CardFooter className="flex w-full items-center justify-between px-4">
        <p className="text-[var(--color-muted-foreground)]">{formattedDate}</p>
        <div className="flex gap-2">
          <Button onClick={handleView}>
            <Eye />
            View
          </Button>
          <Button variant="destructive" onClick={() => onDelete(note.id!)}>
            <Trash2 />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
