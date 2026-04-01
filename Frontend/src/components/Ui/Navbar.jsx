import { Menu, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <nav
      className="w-full bg-[#f3ebd9]/80 backdrop-blur-md px-6 py-3 flex items-center justify-between 
shadow-sm sticky top-0 z-50 border-b border-[#e5dcc8]"
    >
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="AgroChain"
          className="h-10 w-auto object-contain transition duration-300 
               hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.8)] 
               hover:scale-105
               hover:cursor-pointer"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <div className="relative">
          <button
            className="p-2 bg-white rounded-lg shadow transition duration-300 
               hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.8)] 
               hover:scale-105
               hover:cursor-pointer"
          >
            <Bell size={20} />
          </button>
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
            1
          </span>
        </div>

        {/* Menu Button */}
        <button
          className="p-2 bg-white rounded-lg shadow transition duration-300 
               hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.8)] 
               hover:scale-105
               hover:cursor-pointer"
        >
          <Menu size={20} />
        </button>

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/40?img=12"
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-green-500 object-cover transition duration-300 
               hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.8)] 
               hover:scale-105 
                hover:cursor-pointer
               "
        />
      </div>
    </nav>
  );
}
