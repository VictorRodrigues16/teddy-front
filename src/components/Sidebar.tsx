import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline"; // Ícone de barrinhas
import { Link } from "react-router-dom";
import { HomeIcon, Squares2X2Icon, UserIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="m-4 text-gray-700" onClick={toggleSidebar}>
        <Bars3Icon className="h-8 w-8" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white text-white transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <div className="bg-zinc-700 h-1/5 flex items-center justify-center">
          <img src='https://iili.io/3wVXLvt.png' alt="Logo" className="w-28" />
        </div>

        <nav className="flex flex-col gap-10 text-black pt-10 px-8 inter">
          <Link to="" className="hover:text-gray-400 flex gap-3 font-semibold transition">
          <HomeIcon className="h-6 w-6 inline-block mr-2" />
            Home
          </Link>
          <Link to="/clients" className=" flex gap-3  hover:text-orange-600 text-orange-500 transition-all" >
          <UserIcon className="h-6 w-6 inline-block mr-2" />
            Clientes
          </Link>
          <Link to="" className="hover:text-gray-400 flex gap-3 transition">
          <Squares2X2Icon className="h-6 w-6 inline-block mr-2" />
            Produtos
          </Link>
        </nav>
      </div>

      {isOpen && <div className="fixed inset-0 z-30" onClick={toggleSidebar} />}
    </>
  );
}
