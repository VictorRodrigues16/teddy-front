import { useEffect, useState } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { Button } from "../../../components/general/Button";
import ModalDelete from "../../../components/modals/modal-delete-client";
import ModalEdit from "../../../components/modals/modal-edit-client";
import ModalAdd from "../../../components/modals/modal-add-client";
import ClientCard from "../../../components/client/ClientCard";
import Client from "../../../types/pages/Clients/interface-clients";
import Modal from "../../../components/modals/modal-new-client";
import api from "../../../services/api";

export default function Clients() {
  const [totalClients, setTotalClients] = useState<number>(0);
  const [clientsPerPage, setClientsPerPage] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [clients, setClients] = useState<Client[]>([]);
  const [isCreateClientModalOpen, setIsCreateClientModalOpen] = useState<boolean>(false);
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState<boolean>(false);
  const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState<boolean>(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client>();

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/clients", {
        params: {
          page: currentPage,
          limit: clientsPerPage,
        },
      });

      const data = response.data?.data;
      if (Array.isArray(data)) {
        setClients(data);
        setTotalClients(response.data.totalItems);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [currentPage, clientsPerPage]);

  const handleDeleteClient = async (clientId: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await api.delete(`/clients/${clientId}`);
      setIsDeleteClientModalOpen(false);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClient = async (clientId: string, selected: boolean) => {
    if (isLoading) return;
    setIsLoading(true);

    const data = {
      selected: selected,
    };

    try {
      await api.put(`/clients/${clientId}`, data);
      setIsAddClientModalOpen(false);
      fetchClients();
    } catch (error) {
      console.error("Error adding client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClient = async (data: { name: string; salary: string; value: string }) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await api.post("/clients", data);
      setIsCreateClientModalOpen(false);
      fetchClients();
    } catch (error) {
      console.error("Error creating client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClient = async (data: Client) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await api.put(`/clients/${data.id}`, data);
      setIsEditClientModalOpen(false);
      fetchClients();
    } catch (error) {
      console.error("Error editing client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center mx-auto min-h-screen pt-14 bg-slate-100  px-8">
        <Modal
          isOpen={isCreateClientModalOpen}
          onCreate={handleCreateClient}
          onClose={() => setIsCreateClientModalOpen(false)}
        />
        <ModalEdit
          client={selectedClient || null}
          isOpen={isEditClientModalOpen}
          onEdit={handleEditClient}
          onClose={() => setIsEditClientModalOpen(false)}
        />
        <ModalDelete
          client={selectedClient || null}
          isOpen={isDeleteClientModalOpen}
          onClose={() => setIsDeleteClientModalOpen(false)}
          onDelete={handleDeleteClient}
        />
        <ModalAdd
          isOpen={isAddClientModalOpen}
          onClose={() => setIsAddClientModalOpen(false)}
          client={selectedClient || null}
          onAdd={handleAddClient}
        />
        {!clients || clients.length === 0 ? (
          <div className="flex items-start flex-col justify-start h-screen">
            <p className="text-gray-500">Nenhum cliente encontrado!</p>
            <Button
              onClick={() => setIsCreateClientModalOpen(true)}
              className="mt-6 bg-white border-2 w-full border-orange-500 cursor-pointer text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Criar cliente
            </Button>
          </div>
        ) : (
          <div className="w-3/4">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-base font-bold text-center text-gray-800 mb-4">
                <span className="font-semibold text-lg">
                  {totalClients} clientes encontrados:{" "}
                </span>
              </h1>
              <div className="flex items-center justify-center gap-4">
                <p className="text-lg text-gray-600">Clientes por página:</p>
                <input
                  type="number"
                  value={clientsPerPage}
                  onChange={(e) =>
                    setClientsPerPage(Math.max(1, Math.min(100, Number(e.target.value))))
                  }
                  className="border border-gray-300 w-20 h-7 text-center"
                  placeholder="Total Clients"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {clients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onEdit={(client) => {
                    setSelectedClient(client);
                    setIsEditClientModalOpen(true);
                  }}
                  onAdd={() => {
                    setSelectedClient(client);
                    setIsAddClientModalOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedClient(client);
                    setIsDeleteClientModalOpen(true);
                  }}
                />
              ))}
            </div>

            <Button
              onClick={() => setIsCreateClientModalOpen(true)}
              className="mt-6 bg-white border-2 w-full border-orange-500 cursor-pointer text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Criar Cliente
            </Button>

            <div className="w-full flex items-center justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`mx-1 px-3 py-1 rounded cursor-pointer ${
                    page === currentPage
                      ? "bg-orange-500 text-white"
                      : "bg-white text-orange-500 border border-orange-500"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
