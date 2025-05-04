import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../general/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; salary: string; value: string }) => void;
}

export default function Modal({ isOpen, onClose, onCreate }: ModalProps) {
  const [name, setName] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!name || !salary || !value) {
      setError(true) 
      return
    };
    
    const data = {
      name,
      salary,
      value,
    };
    onCreate(data);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="bg-white p-6 rounded-lg w-96 relative z-60">
        <button
          name="close-button"
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-600 text-xl"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Criar Cliente:</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Digite o nome: "
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 "
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="salary"
              value={salary}
              placeholder="Digite o salário: "
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-2 border border-gray-300 "
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              name="value"
              value={value}
              placeholder="Digite o valor: "
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border border-gray-300 "
              required
            />
          </div>
          {error && (
            <p className="text-red-500 mb-4">
              Preencha todos os campos corretamente.
            </p>
          )}

          <Button
            className="w-full bg-orange-500 cursor-pointer text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
            onClick={handleSubmit}
          >
            Criar Cliente
          </Button>
        </form>
      </div>
    </div>
  );
}
