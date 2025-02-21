import { getClients, createClient, updateClient, deleteClient } from "@/app/_api/clients";
import { Client } from "@/app/_types/index";

class ClientsService {
  // Buscar todos os clientes
  async fetchAllClients(): Promise<Client[]> {
    try {
      return await getClients();
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      throw error;
    }
  }

  // Criar um novo cliente com validação
  async addNewClient(data: Client): Promise<Client> {

    if(data.name === "" || data.email === "" || data.cpf === "") {
      alert("Todos os campos devem ser preenchidos.");
      throw new Error("Todos os campos devem ser preenchidos.");
    }

    try {
      return await createClient(data);
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      throw error;
    }
  }

  // Atualizar um cliente
  async editClient(id: number, data: Partial<Client>): Promise<Client> {
    if (!id) throw new Error("ID do cliente é obrigatório.");

    try {
      return await updateClient(id, data);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      throw error;
    }
  }

  // Remover um cliente
  async removeClient(id: number): Promise<void> {
    if (!id) throw new Error("ID do cliente é obrigatório.");

    try {
      await deleteClient(id);
    } catch (error) {
      console.error("Erro ao remover cliente:", error);
      throw error;
    }
  }
}

// Criando uma instância única do serviço
export const clientsService = new ClientsService();
