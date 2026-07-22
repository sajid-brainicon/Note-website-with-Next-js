"use client";

import { useMemo, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import Toolbar from "@/components/Toolbar";
import NoteCard from "@/components/NoteCard";
import NoteModal from "@/components/NoteModal";

export default function Home() {
  const { notes, ready, addNote, updateNote, deleteNote, toggleDone } = useNotes();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      const q = search.toLowerCase();
      const matchSearch =
        n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q);
      const matchCategory = category === "All Categories" || n.category === category;
      const matchStatus =
        status === "All Status" ||
        (status === "Done" && n.done) ||
        (status === "Pending" && !n.done);
      return matchSearch && matchCategory && matchStatus;
    });
  }, [notes, search, category, status]);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (note) => {
    setEditing(note);
    setModalOpen(true);
  };

  const handleSave = (form) => {
    if (editing) updateNote(editing.id, form);
    else addNote(form);
    setModalOpen(false);
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-2xl">
            📝
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
            <p className="text-sm text-gray-500">{notes.length} notes</p>
          </div>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + Add Note
        </button>
      </div>

      <div className="mt-8">
        <Toolbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
        />
      </div>

      {!ready ? null : filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-gray-400">No notes found. Add one to get started.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={openEdit}
              onDelete={deleteNote}
              onToggle={toggleDone}
            />
          ))}
        </div>
      )}

      <NoteModal
        open={modalOpen}
        note={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </main>
  );
}