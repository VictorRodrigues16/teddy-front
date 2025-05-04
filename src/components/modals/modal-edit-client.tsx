import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Client from "../../types/pages/Clients/interface-clients";
import { Button } from "../general/Button";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onEdit: (client: Client) => void;
}

export default function ModalEdit({
  isOpen,
  onClose,
  client,
  onEdit,
}: ModalEditProps) {
  const [name, setName] = useState<string>(client?.name || "");
  const [salary, setSalary] = useState<string>(client?.salary || "");
  const [value, setValue] = useState<string>(client?.value || "");

  useEffect(() => {
    if (client) {
      setName(client.name);
      setSalary(client.salary);
      setValue(client.value);
    }
  }, [client]);

  const handleSubmit = () => {
    if (!client) return;
    onEdit({
      id: client.id,
      name,
      salary,
      value,
    });
  };
  
  if (!isOpen || !client) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="bg-white p-6 rounded-lg w-96 relative z-60">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-600 text-xl"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Editar Cliente:</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              placeholder="Digite o nome: "
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={salary}
              placeholder="Digite o salário: "
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={value}
              placeholder="Digite o valor: "
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <Button
            className="w-full bg-orange-500 cursor-pointer text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
            type="submit"
          >
            Editar Cliente
          </Button>
        </form>
      </div>
    </div>
  );
}
