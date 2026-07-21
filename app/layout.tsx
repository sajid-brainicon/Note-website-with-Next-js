import "./globals.css";

export const metadata = {
  title: "Notes App",
  description: "Create, edit and organize your notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}