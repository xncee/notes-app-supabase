import type { Note } from "@/lib/types";
import { Card, CardAction, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { generateLoremIpsum } from "@/lib/utils";

export default function NoteCard({ note }: { note: Note }) {
    const navigate = useNavigate();
    const handleView = () => {
        navigate(`/notes/${note.id}`);
    };

    return (
        <div>
            <Card>
                <CardHeader className="font-bold">{note.title}</CardHeader>
                <CardContent>{generateLoremIpsum(5)}</CardContent>
                <CardAction className="flex gap-1 w-full justify-end px-2">
                    <Button onClick={handleView}>View</Button>
                    <Button onClick={() => alert(`delete: ${note.title}`)}>
                        Delete
                    </Button>
                </CardAction>
            </Card>
        </div>
    );
}
