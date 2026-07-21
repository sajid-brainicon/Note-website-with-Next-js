export const ICONS = [
  "😀", "🔥", "📚", "🚀", "💯", "✨", "😎", "🎉", "❤️",
  "😂", "👍", "🌟", "🤖", "🎮", "⚡", "🧠", "🌍", "🏆",
];

export const CATEGORIES = [
  { name: "Personal", dot: "bg-purple-500", badge: "bg-purple-600" },
  { name: "Work", dot: "bg-blue-500", badge: "bg-blue-600" },
  { name: "Shopping", dot: "bg-green-500", badge: "bg-green-600" },
  { name: "Health", dot: "bg-red-500", badge: "bg-red-600" },
  { name: "Study", dot: "bg-amber-500", badge: "bg-amber-600" },
];

export const STATUS_OPTIONS = ["All Status", "Done", "Pending"];

export function categoryBadge(name) {
  const found = CATEGORIES.find((c) => c.name === name);
  return found ? found.badge : "bg-gray-500";
}