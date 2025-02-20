import { getSales, createSale, deleteSale } from "@/app/_api/sales";
import { Sale } from "@/app/_types/sale";

class SalesService {
  // Buscar todas as vendas
  async fetchAllSales(): Promise<Sale[]> {
    try {
      return await getSales();
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
      throw new Error("Não foi possível carregar a lista de vendas.");
    }
  }

  // Criar uma nova venda
  async addNewSale(data: Sale): Promise<Sale> {
    if (!data.clientId || !data.productId || data.quantity <= 0) {
      throw new Error("Cliente, produto e quantidade válida são obrigatórios.");
    }

    try {
      return await createSale(data);
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      throw new Error("Não foi possível registrar a venda.");
    }
  }

  // Remover uma venda
  async removeSale(id: number): Promise<void> {
    if (!id) throw new Error("ID da venda é obrigatório.");

    try {
      await deleteSale(id);
    } catch (error) {
      console.error("Erro ao remover venda:", error);
      throw new Error("Não foi possível remover a venda.");
    }
  }
}

export const salesService = new SalesService();
