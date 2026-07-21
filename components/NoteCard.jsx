"use client";

import { categoryBadge } from "@/lib/constants";

export default function NoteCard({ note, onEdit, onDelete, onToggle }) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-3xl">{note.icon}</span>
        <div className="flex gap-2 text-gray-400">
          <button onClick={() => onEdit(note)} className="hover:text-indigo-500" aria-label="Edit">
            ✏️
          </button>
          <button onClick={() => onDelete(note.id)} className="hover:text-red-500" aria-label="Delete">
            🗑️
          </button>
        </div>
      </div>

      <h3
        className={`mt-4 text-lg font-bold ${
          note.done ? "text-gray-400 line-through" : "text-gray-900"
        }`}
      >
        {note.title}
      </h3>
      <p className="mt-2 text-sm text-gray-500">{note.description}</p>

      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${categoryBadge(note.category)}`}>
          {note.category}
        </span>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={note.done}
            onChange={() => onToggle(note.id)}
            className="h-4 w-4 accent-green-600"
          />
          {note.done ? "Done" : "Mark done"}
        </label>
      </div>
    </div>
  );
}