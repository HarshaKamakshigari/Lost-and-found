export default function HomePage() {
    return (
      <div className="flex items-center justify-center h-screen bg-green-100">
        <h1 className="text-3xl font-bold">Welcome to the Home Page 🎉</h1>
      </div>
    );
  }
//   "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import app from "./firebaseConfig"; // Ensure Firebase is configured
// import Navbar from "./components/Navbar";

// export default function Home() {
//   const router = useRouter();
//   const auth = getAuth(app);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         router.push("/login"); // Redirect to login if user is not authenticated
//       } else {
//         setUser(user);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   if (!user) return null; // Show nothing while checking authentication

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Welcome {user.displayName || "User"}!
//         </h1>
//       </div>
//     </div>
//   );
// }
