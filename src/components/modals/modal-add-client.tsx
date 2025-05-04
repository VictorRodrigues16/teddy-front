import { XMarkIcon } from "@heroicons/react/24/outline";
import Client from "../../types/pages/Clients/interface-clients";
import { Button } from "../general/Button";

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onAdd: (idClient: string, statusAdd: boolean) => void;
}

export default function ModalAdd({
  isOpen,
  onClose,
  client,
  onAdd,
}: ModalAddProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 inter bg-black"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="bg-white p-6 rounded-lg w-96 relative z-60">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-600 text-xl"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">{client?.selected === true? "Remover Cliente": "Adicionar Cliente"}</h2>

        <p className="mb-4">Você está prestes a adicionar o cliente: <span className="font-semibold">{client?.name}</span></p>

        <Button
          className="w-full bg-orange-500 cursor-pointer text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
          onClick={() => client && onAdd(client.id, client.selected ? false : true)}
        >
          {client?.selected === true? "Remover Cliente": "Adicionar Cliente"}
        </Button>
      </div>
    </div>
  );
}
