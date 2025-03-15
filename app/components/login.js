// "use client";

// import { useState } from "react";
// import { auth, provider } from "../firebase"; // Adjust path if needed
// import { signInWithPopup } from "firebase/auth";
// import { FcGoogle } from "react-icons/fc"; // Google icon

// export default function Login() {
//   const [loading, setLoading] = useState(false);

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       await signInWithPopup(auth, provider);
//       console.log("Login Successful!");
//     } catch (error) {
//       console.error("Login Failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
//       <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Sign in</h2>
//       <button
//         onClick={handleGoogleLogin}
//         className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-200"
//         disabled={loading}
//       >
//         <FcGoogle className="text-2xl mr-2" />
//         {loading ? "Signing in..." : "Continue with Google"}
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct for App Router
import { auth, provider, signInWithPopup } from "../firebase"; // Ensure correct Firebase import

export default function Login() {
  const router = useRouter(); // Get Next.js router

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        console.log("User signed in:", result.user);
        router.push("/home"); // Redirect to Home page
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button 
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}
