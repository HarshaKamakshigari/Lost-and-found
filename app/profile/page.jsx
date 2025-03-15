"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, signOut } from "../firebase";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // Redirect to login
      } else {
        setUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
      {/* Profile Card */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <img
          src={user?.photoURL || "/default-avatar.png"} // Default avatar if null
          alt="Profile Picture"
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
        />
        <h2 className="text-2xl font-bold mt-4">{user?.displayName || "User"}</h2>
        <p className="text-gray-400">{user?.email}</p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
