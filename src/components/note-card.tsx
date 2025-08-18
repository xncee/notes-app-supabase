import type { Note } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function NoteCard({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: (id: number) => void;
}) {
  const formattedDate = new Date(note.created_at).toLocaleDateString();
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <Card className="flex h-full w-full justify-between">
      <CardHeader className="text-lg font-bold">{note.title}</CardHeader>
      <CardContent>{note.body}</CardContent>
      <CardFooter className="flex w-full justify-between px-2">
        <p className="text-[var(--color-muted-foreground)]">{formattedDate}</p>
        <div className="flex gap-1">
          <Button onClick={handleView}>View</Button>
          <Button onClick={() => onDelete(note.id)}>Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
