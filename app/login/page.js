
"use client"; 
import { useRouter } from "next/navigation";
import Login from "../components/login";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h- flex ">
      
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://cdna.artstation.com/p/media_assets/images/images/001/128/804/large/CPC_40.jpg?1687300934')" }}
      ></div>

      
      <div className="w-full md:w-1/2 flex flex-row gap-10 items-center justify-center p-8 bg-white">
        <Login />
        {/* Admin Login Button */}
        <button
          onClick={() => router.push("/admin/login")}
          className=" px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}
