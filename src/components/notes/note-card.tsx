import type { Note } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Eye, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function NoteCard({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: (id: number) => void;
}) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <Card className="flex h-full w-full justify-between">
      <CardHeader>
        <p className="text-muted-foreground">{formatDate(note.created_at!)}</p>
        <h2 className="line-clamp-1 text-lg font-bold">{note.title}</h2>
      </CardHeader>
      <Separator />
      <CardContent className="mb-auto line-clamp-3 align-text-top break-words whitespace-pre-line">
        {note.content}
      </CardContent>
      <CardFooter className="flex w-full items-center justify-end px-4">
        {/* <p className="text-[var(--color-muted-foreground)]">{formattedDate}</p> */}
        <div className="flex gap-2">
          <Button className="hover:cursor-pointer" onClick={handleView}>
            <Eye />
            View
          </Button>
          <Button
            variant="destructive"
            className="hover:cursor-pointer hover:opacity-75"
            onClick={() => onDelete(note.id!)}
          >
            <Trash2 />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
