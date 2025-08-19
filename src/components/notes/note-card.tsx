import type { Note } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function NoteCard({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: (id: number) => void;
}) {
  const formattedDate = new Date(note.created_at!).toLocaleDateString();
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <Card className="flex h-full w-full justify-between">
      <CardHeader className="text-lg font-bold">
        {note.title.slice(0, 20)}
        {note.title.length > 20 ? "..." : ""}
      </CardHeader>
      <CardContent className="line-clamp-3 align-text-top break-words whitespace-pre-line">
        {note.content}
      </CardContent>
      <CardFooter className="flex w-full items-center justify-between px-4">
        <p className="text-[var(--color-muted-foreground)]">{formattedDate}</p>
        <div className="flex gap-2">
          <Button onClick={handleView}>View</Button>
          <Button onClick={() => onDelete(note.id!)}>Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
