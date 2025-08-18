import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase/client";
import { useEffect, useState, type FormEvent } from "react";
import type { Note } from "@/lib/types";
import NoteCard from "@/components/note-card";

export default function NotesPage() {
    const [notesList, setNotesList] = useState<Note[]>([]);
    const [isFetching, setFetching] = useState(false);
    const [newNote, setNewNote] = useState("");

    const fetchData = async () => {
        setFetching(true);
        const { data, error } = await supabase.from("notes").select("*");

        if (error) {
            console.error("Error fetching notes:", error);
        }

        setNotesList(data || []);
        setFetching(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddNote = async (e: FormEvent) => {
        e.preventDefault();
        const note = {
            title: newNote,
        };
        const { data, error } = await supabase
            .from("notes")
            .insert([note])
            .select();
        if (error) {
            console.error("Error adding note:", error);
        }
        if (data && data.length > 0) setNotesList([...notesList, data[0]]);
        setNewNote("");
    };

    return (
        <div className="flex flex-col gap-4 h-screen w-screen mt-5">
            <form
                onSubmit={handleAddNote}
                className="flex flex-col gap-2 w-100 self-center"
            >
                <Input
                    type="text"
                    placeholder="Enter a note.."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full">
                    Add Note
                </Button>
            </form>
            <h1 className="flex justify-center text-2xl font-bold">Notes</h1>
            <ul className="grid grid-cols-3 gap-2 items-center">
                {isFetching && <h1>Loading..</h1>}
                {notesList.map((note) => (
                    <NoteCard key={note.id} note={note} />
                ))}
            </ul>
        </div>
    );
}
