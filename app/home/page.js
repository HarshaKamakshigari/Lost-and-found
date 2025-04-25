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
// "use client";

// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-center items-center px-2">
//       {/* Hero Section */}
//       <div className="max-w-4xl text-center">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
//           Lost Something? Found Something?
//         </h1>
//         <p className="mt-4 text-lg text-gray-600">
//           Connect with people to return lost items or claim what's yours. Making your campus a better place!
//         </p>
//       </div>

//       {/* CTA Buttons */}
//       <div className="mt-8 flex flex-col sm:flex-row gap-4">
//         <Link href="/lost">
//           <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
//             View Lost Items
//           </button>
//         </Link>
//         <Link href="/found">
//           <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
//             View Found Items
//           </button>
//         </Link>
//       </div>

//       {/* Info Section */}
//       <div className="mt-12 max-w-3xl text-center">
//         <h2 className="text-2xl font-semibold text-gray-800">How It Works?</h2>
//         <p className="mt-3 text-gray-600">
//           1️⃣ Report a lost or found item.  
//           2️⃣ View listed lost & found items.  
//           3️⃣ Contact the person who posted it and reunite items with their owners.
//         </p>
//       </div>

     
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Lost It? <span className="text-gradient">Found It?</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-500 leading-relaxed">
          Join our campus community to reunite lost items with their owners. Let’s make every loss a happy reunion!
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <Link href="/lost">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Explore Lost Items
          </button>
        </Link>
        <Link href="/found">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Explore Found Items
          </button>
        </Link>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 max-w-5xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">How It Works</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800">1. Report</h3>
            <p className="mt-2 text-gray-600">Share details of a lost or found item quickly.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800">2. Browse</h3>
            <p className="mt-2 text-gray-600">Check listings of lost and found items.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800">3. Reunite</h3>
            <p className="mt-2 text-gray-600">Connect with others to return or claim items.</p>
          </div>
        </div>
      </motion.div>

      {/* Pics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 max-w-5xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Lost & Found Gallery</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Lost Wallet"
              className="w-full h-32 object-cover transform hover:scale-102 transition-transform duration-300"
            />
            <p className="p-3 text-gray-700 font-semibold text-sm">Lost Wallet</p>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all">
            <img
              src="https://images.unsplash.com/photo-1585060544949-cedf419a90c1"
              alt="Found Keys"
              className="w-full h-32 object-cover transform hover:scale-102 transition-transform duration-300"
            />
            <p className="p-3 text-gray-700 font-semibold text-sm">Found Keys</p>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all">
            <img
              src="https://images.unsplash.com/photo-1605405740316-3b1b4edef287"
              alt="Lost Phone"
              className="w-full h-32 object-cover transform hover:scale-102 transition-transform duration-300"
            />
            <p className="p-3 text-gray-700 font-semibold text-sm">Lost Phone</p>
          </div>
        </div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 max-w-5xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">What Our Community Says</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                SM
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-800 text-sm">Sarah M.</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
            <p className="mt-3 text-gray-600 text-sm">"Got my laptop back in hours thanks to this platform!"</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                JK
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-800 text-sm">James K.</p>
                <p className="text-xs text-gray-500">Faculty</p>
              </div>
            </div>
            <p className="mt-3 text-gray-600 text-sm">"Returned found glasses to their owner. So easy!"</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-semibold">
                ER
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-800 text-sm">Emily R.</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
            <p className="mt-3 text-gray-600 text-sm">"Love helping others find their lost items!"</p>
          </div>
        </div>
      </motion.div>

      {/* Subtle Decorative Element */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent opacity-50"></div>
      </div>
    </div>
  );
}