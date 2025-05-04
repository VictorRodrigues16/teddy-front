import { useNavigate } from "react-router-dom";
import { Button } from "../../components/general/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center inter min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página não encontrada</h2>
      <Button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-orange-500 text-xl font-semibold cursor-pointer text-white rounded-lg hover:bg-orange-600 transition-all"
      >
        Voltar para o Início
      </Button>
    </div>
  );
}
