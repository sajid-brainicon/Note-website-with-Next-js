"use client";

import { useEffect, useState } from "react";

const KEY = "notes-app-data";

const SEED = [
  {
    id: "1",
    icon: "🔥",
    title: "Please Subscribe to the channel",
    description: "Don't forget to subscribe to the channel if you haven't already!",
    category: "Personal",
    done: true,
  },
  {
    id: "2",
    icon: "📚",
    title: "Study",
    description: "Revise math chapter 3, Complete science assignment",
    category: "Work",
    done: false,
  },
  {
    id: "3",
    icon: "🌟",
    title: "Shopping",
    description: "Milk, Fruits, Vegetables",
    category: "Shopping",
    done: false,
  },
  {
    id: "4",
    icon: "📚",
    title: "Health",
    description: "Drink enough water",
    category: "Health",
    done: false,
  },
];

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    setNotes(stored ? JSON.parse(stored) : SEED);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(notes));
  }, [notes, ready]);

  const addNote = (note) => {
    setNotes((prev) => [{ ...note, id: crypto.randomUUID() }, ...prev]);
  };

  const updateNote = (id, note) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...note } : n)));
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleDone = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, done: !n.done } : n))
    );
  };

  return { notes, ready, addNote, updateNote, deleteNote, toggleDone };
}