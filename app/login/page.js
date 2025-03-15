import Login from "../components/login";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center" 
  style={{ backgroundImage: "url('https://cdna.artstation.com/p/media_assets/images/images/001/128/804/large/CPC_40.jpg?1687300934')" }}>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <Login />
      </div>
    </div>
  );
}
