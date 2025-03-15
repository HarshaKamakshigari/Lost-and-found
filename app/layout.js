"use client";
import "./globals.css";
// import Navbar from "./components/nav";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
      {/* <Navbar /> */}
        <SessionProvider>{children}</SessionProvider>
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