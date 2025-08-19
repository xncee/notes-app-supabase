import type { Note } from "@/lib/types";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { createNote } from "@/data/notes/notes";
import { Textarea } from "../ui/textarea";

export default function NoteForm({
  addNewNote,
  className = "",
}: {
  addNewNote: (note: Note) => void;
  className?: string;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const note = {
      title: title.trim(),
      content: content.trim(),
    };

    const { data, error } = await createNote(note);
    if (error) {
      setError("Failed to create note. Please try again.");
      return;
    }
    if (data && data.length > 0) addNewNote(data[0]);

    setTitle("");
    setContent("");
    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create a new note</CardTitle>
          <CardDescription>Enter your note details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title.."
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter content.."
                  required
                />
                <p className="text-center text-red-400">{error}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className={`w-full ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {isLoading ? "Adding Note..." : "Add Note"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
