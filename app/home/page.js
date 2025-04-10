// export default function HomePage() {
//     return (
//       <div className="flex items-center justify-center h-screen bg-green-100">
//         <h1 className="text-3xl font-bold">Welcome to the Home Page 🎉</h1>
//       </div>
//     );
//   }
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
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-2">
      {/* Hero Section */}
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Lost Something? Found Something?
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Connect with people to return lost items or claim what's yours. Making your campus a better place!
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link href="/lost">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
            View Lost Items
          </button>
        </Link>
        <Link href="/found">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
            View Found Items
          </button>
        </Link>
      </div>

      {/* Info Section */}
      <div className="mt-12 max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800">How It Works?</h2>
        <p className="mt-3 text-gray-600">
          1️⃣ Report a lost or found item.  
          2️⃣ View listed lost & found items.  
          3️⃣ Contact the person who posted it and reunite items with their owners.
        </p>
      </div>

     
    </div>
  );
}
