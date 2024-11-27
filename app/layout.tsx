import "./globals.css";

import Header from "./components/Header";

export const metadata = {
  title: "Library Catalog",
  description: "A catalog of books using Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">    
        <header className="p-4 bg-blue-500 text-white">
      <Header />
        </header>
        <main className="p-8">{children}</main>
        <footer className="p-4 text-center text-sm bg-gray-200">
          © 2024 Library Management
        </footer>
      </body>
    </html>
  );
}
