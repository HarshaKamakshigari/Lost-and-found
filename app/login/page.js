// import Login from "../components/login";

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex">
//       {/* Left side - Image */}
//       <div className="hidden md:flex w-1/2 bg-cover bg-center" 
//   style={{ backgroundImage: "url('https://cdna.artstation.com/p/media_assets/images/images/001/128/804/large/CPC_40.jpg?1687300934')" }}>
//       </div>

//       {/* Right side - Login Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
//         <Login />
//       </div>
//     </div>
//   );
// }
"use client"; 
import { useRouter } from "next/navigation";
import Login from "../components/login";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h- flex">
      {/* Left side - Image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://cdna.artstation.com/p/media_assets/images/images/001/128/804/large/CPC_40.jpg?1687300934')" }}
      ></div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <Login />
        {/* Admin Login Button */}
        <button
          onClick={() => router.push("/admin")}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}
