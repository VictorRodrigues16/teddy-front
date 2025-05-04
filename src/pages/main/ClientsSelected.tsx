import { useEffect, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import Client from "../../types/pages/Clients/interface-clients";
import { Button } from "../../components/general/Button";
import ClientSelectedCard from "../../components/client/ClientSelectedCard";
import api from "../../services/api";

export default function ClientsSelected() {
  const [totalClients, setTotalClients] = useState<number>(0);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/clients", {
        params: {
          page: 1,
          limit: 10000,
          selected: true,
        },
      });

      const data = response.data?.data;
      if (Array.isArray(data)) {
        setClients(data);
        setTotalClients(response.data.totalItems);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleRemoveAllClients = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const data = {
        ids: clients.map((client) => client.id),
      };
      await api.post(`/clients/select`, data);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveClient = async (clientId: string, selected: boolean) => {
    if (isLoading) return;
    setIsLoading(true);

    const data = {
      selected: selected,
    };

    try {
      await api.put(`/clients/${clientId}`, data);
      fetchClients();
    } catch (error) {
      console.error("Error adding client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center mx-auto min-h-screen pt-14 bg-slate-100 min-w-screen px-8">
        {!clients || clients.length === 0 ? (
          <div className="flex items-start flex-col justify-start h-screen">
            <p className="text-gray-500">Nenhum Cliente Selecionado!</p>
          </div>
        ) : (
          <div className="w-3/4">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-base font-bold text-center text-gray-800 mb-4">
                <span className="font-semibold text-lg">
                  {totalClients} clientes encontrados:{" "}
                </span>
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {clients.map((client) => (
                <ClientSelectedCard
                  client={client}
                  key={client.id}
                  onAdd={() => handleRemoveClient(client.id, false)}
                />
              ))}
            </div>

            <Button
              onClick={() => handleRemoveAllClients()}
              className="bg-orange-500 w-full hover:bg-orange-600 transition-all cursor-pointer text-white font-bold py-2 px-4 rounded mt-4"
            >
              Limpar clientes selecionados
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
