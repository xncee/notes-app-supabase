import NewNoteForm from "@/components/notes/new-note-form";

export default function NewNotePage() {
  return (
    <div className="flex w-full flex-col gap-10 p-4">
      <NewNoteForm className="w-full self-center md:w-175" />
    </div>
  );
}
