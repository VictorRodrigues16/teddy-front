import { MinusIcon } from "@heroicons/react/24/outline";
import Client from "../../types/pages/Clients/interface-clients";


interface ClientSelectedCardProps {
  client: Client;
  onAdd?: (clientId: string) => void;
}

const ClientSelectedCard = ({ client, onAdd }: ClientSelectedCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center justify-center mb-4 text-center">
        <h2 className="text-lg font-bold">{client.name}</h2>
        <p className="text-gray-600">{client.salary}</p>
        <p className="text-gray-800">${client.value}</p>
      </div>
      <div className="w-full flex items-end justify-end mt-4">
        
          <button onClick={() => onAdd && onAdd(client.id)}>
          <MinusIcon className="h-8 w-8 text-red-900 cursor-pointer" />
        </button>
        
      </div>
    </div>
  );
};

export default ClientSelectedCard;
