"use client";
import "./globals.css";
import Navbar from "./components/nav";
import Footer from "./components/foot";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
      <Navbar />
        <SessionProvider>{children}</SessionProvider>
        <div className="mt-[200px]">
          <Footer />
        </div>
      </body>
    </html>
  );
}

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-100">{children}</body>
//     </html>
//   );
// }