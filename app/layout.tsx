import './globals.css';

import Footer from '@/components/layout/footer';
import Nav from '@/components/layout/nav';

export const metadata = {
  title: 'Library Catalog',
  description: 'A catalog of books using Next.js and Tailwind CSS'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 p-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}