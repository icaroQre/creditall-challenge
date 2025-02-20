import { getClients, createClient, updateClient, deleteClient } from "@/app/_api/clients";
import { Client } from "@/app/_types/index";

class ClientsService {
  // Buscar todos os clientes
  async fetchAllClients(): Promise<Client[]> {
    try {
      const clients = await getClients();
      return clients;
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      throw new Error("Não foi possível carregar a lista de clientes.");
    }
  }

  // Criar um novo cliente com validação
  async addNewClient(data: Client): Promise<Client> {
    if (!data.name || !data.email) {
      throw new Error("Nome e e-mail são obrigatórios.");
    }

    try {
      return await createClient(data);
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      throw new Error("Não foi possível adicionar o cliente.");
    }
  }

  // Atualizar um cliente
  async editClient(id: number, data: Partial<Client>): Promise<Client> {
    if (!id) throw new Error("ID do cliente é obrigatório.");

    try {
      return await updateClient(id, data);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      throw new Error("Não foi possível atualizar o cliente.");
    }
  }

  // Remover um cliente
  async removeClient(id: number): Promise<void> {
    if (!id) throw new Error("ID do cliente é obrigatório.");

    try {
      await deleteClient(id);
    } catch (error) {
      console.error("Erro ao remover cliente:", error);
      throw new Error("Não foi possível remover o cliente.");
    }
  }
}

// Criando uma instância única do serviço
export const clientsService = new ClientsService();
