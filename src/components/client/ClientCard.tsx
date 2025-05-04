import { MinusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import Client from "../../types/pages/Clients/interface-clients";
import { formatValues } from "../../utils/formatValues";


interface ClientCardProps {
  client: Client;
  onEdit?: (client: Client) => void;
  onDelete?: (clientId: string) => void;
  onAdd?: (clientId: string) => void;
}

const ClientCard = ({ client, onEdit, onDelete, onAdd }: ClientCardProps) => {
  return (
    <div className=" client-card bg-white shadow-md rounded-lg p-4 flex flex-col h-60 items-center justify-between">
      <div className="w-full flex flex-col items-center justify-center mb-4 gap-2 text-center">
        <h2 className="text-lg font-bold">{client.name}</h2>
        <p className="text-base text-gray-600">Salário: {formatValues(client.salary)}</p>
        <p className="text-gray-800">Empresa: {formatValues(client.value)}</p>
      </div>
      <div className="w-full flex items-center justify-between mt-4">
        {client.selected === true ? (
          <button onClick={() => onAdd && onAdd(client.id)}>
          <MinusIcon className="h-8 w-8 text-red-900 cursor-pointer" />
        </button>
        ): (

        <button onClick={() => onAdd && onAdd(client.id)}>
          <PlusIcon className="h-8 w-8 text-green-900 font-bold cursor-pointer" />
        </button>
        )}
        <button onClick={() => onEdit && onEdit(client)}>
          <PencilIcon className="h-6 w-6 text-gray-900 cursor-pointer" />
        </button>
        <button name="delete" onClick={() => onDelete && onDelete(client.id)}>
          <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
