import { useEffect, useState } from "react";
import { AuthLayout } from "../../layouts/AuthLayout";
import { Button } from "../../components/general/Button";
import { isValidName } from "../../utils/validators";

export default function Home() {
  const [user, setUser] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = () => {
    if (user.trim() === "") {
      setError("Por favor, digite seu nome.");
      return;
    }

    if (!isValidName(user)) {
      setError("Por favor, digite um nome válido.");
      return;
    }

    localStorage.setItem("user", user);
    window.location.href = "/clients";  
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      window.location.href = "/clients";
    }
  }, []);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center mx-auto justify-center min-h-screen min-w-screen px-8">
        <h1 className="text-4xl font-normal mb-6 text-center inter">Olá, seja bem-vindo!</h1>
        <input
          type="text"
          name="name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Digite seu nome: "
          className="xl:w-1/3 lg:max-w-2/4 md:w-2/3 w-full placeholder:text-xl placeholder:text-slate-400 rounded-none text-xl text-slate-700 px-4 py-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
        />
        {error && <p className="text-red-500 text-lg mt-2">{error}</p>}
        <Button
          onClick={handleLogin}
          className="mt-4 xl:w-1/3 lg:max-w-2/4 md:w-2/3 w-full text-2xl bg-orange-500 hover:bg-orange-600 transition-all cursor-pointer text-white font-semibold"
        >
          Entrar
        </Button>
      </div>
    </AuthLayout>
  );
}
