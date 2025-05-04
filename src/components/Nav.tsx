import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { handleLogout } from "../utils/handleLogout";

export default function NavBar() {
  const [user, setUser] = useState<string>();
  const location = useLocation(); 


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/";
      return;
    }
    setUser(storedUser);
  }, []);

  const linkClass = "hover:text-orange-500 hover:underline hover:underline-orange-500 transition-all";

  return (
    <header className="bg-white shadow-xl text-white flex items-center justify-between p-4 z-50 w-full px-7">
      <div className="flex items-center gap-4">
        <Sidebar />
        <img src='https://iili.io/3wVXLvt.png' alt="Logo" className="w-28 hidden md:block" />
      </div>

      <nav className="flex gap-3 text-black font-base inter text-lg">
        <Link
          to="/clients"
          className={`${linkClass} ${location.pathname === "/clients" ? "text-orange-500 underline" : ""}`}
        >
          Clientes
        </Link>
        <Link
          to="/clients-selected"
          className={`${linkClass} ${location.pathname === "/clients-selected" ? "text-orange-500 underline" : ""}`}
        >
          Clientes Selecionados
        </Link>
        <button
          onClick={handleLogout}
          className={`cursor-pointer hidden sm:block ${linkClass} ${location.pathname === "/sair" ? "text-orange-500 underline" : ""}`}
        >
          Sair
        </button>
      </nav>

      <h1 className="hidden md:block text-lg inter items-center gap-2 text-black">
        Olá, <span className="font-bold">{user}!</span>
      </h1>
    </header>
  );
}
