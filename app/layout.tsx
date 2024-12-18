import './globals.css';

import Footer from '@/components/layout/footer';
import Nav from '@/components/layout/nav';
import { Toaster } from 'react-hot-toast';
import { Providers } from './lib/action/redux/provider';

export const metadata = {
  title: 'Library Catalog',
  description: 'A catalog of books using Next.js and Tailwind CSS'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          <div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
          <main className="p-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
