"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, ICONS } from "@/lib/constants";

const EMPTY = {
  icon: "😀",
  title: "",
  description: "",
  category: "Personal",
  done: false,
};

export default function NoteModal({ open, note, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(note ? note : EMPTY);
  }, [note, open]);

  if (!open) return null;

  const isEdit = Boolean(note);
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const save = () => {
    if (!form.title.trim() || !form.description.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{isEdit ? "Edit Note" : "Add Note"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Icon *</label>
            <div className="mt-2 grid grid-cols-9 gap-2">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  onClick={() => set("icon", icon)}
                  className={`flex h-10 items-center justify-center rounded-lg text-xl transition ${
                    form.icon === icon ? "bg-indigo-100 ring-2 ring-indigo-400" : "hover:bg-gray-100"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Title *</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Category *</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
            >
              {CATEGORIES.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Mark as complete *</label>
            <button
              onClick={() => set("done", !form.done)}
              className={`relative h-6 w-11 rounded-full transition ${form.done ? "bg-indigo-600" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  form.done ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={save} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
            {isEdit ? "Update Note" : "Add Note"}
          </button>
        </div>
      </div>
    </div>
  );
}