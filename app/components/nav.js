"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // Get the current route
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <nav className="bg-gray-00 text-black py-4 px-6 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black">
          Lost & Found
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-black">
          
          <NavLink href="/found" currentPath={pathname}>
            Found
          </NavLink>
          <NavLink href="/lost" currentPath={pathname}>
            Lost
          </NavLink>
          <NavLink href="/report" currentPath={pathname}>
            Report
          </NavLink>
          <NavLink href="/profile" currentPath={pathname}>
            Profile
          </NavLink>
          
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-4 px-6">
          
          <NavLink href="/found" currentPath={pathname}>
            Found
          </NavLink>
          <NavLink href="/lost" currentPath={pathname}>
            Lost
          </NavLink>
          <NavLink href="/report" currentPath={pathname}>
            report
          </NavLink>
          <NavLink href="/profile" currentPath={pathname}>
            Profile
          </NavLink>
          
        </div>
      )}
    </nav>
  );
}

// Reusable NavLink Component
const NavLink = ({ href, currentPath, children }) => {
  return (
    <Link
      href={href}
      className={`block md:inline-block px-4 py-2 ${
        currentPath === href
          ? "text-blue-400 border-b-2 border-blue-400"
          : "text-black"
      } hover:text-blue-400 transition duration-300`}
    >
      {children}
    </Link>
  );
};
