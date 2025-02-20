import { getProducts, createProduct, updateProduct, deleteProduct } from "@/app/_api/products";
import { Product } from "@/app/_types/product";

class ProductsService {
  // Buscar todos os produtos
  async fetchAllProducts(): Promise<Product[]> {
    try {
      return await getProducts();
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw new Error("Não foi possível carregar a lista de produtos.");
    }
  }

  // Criar um novo produto
  async addNewProduct(data: Product): Promise<Product> {
    if (!data.name || data.price <= 0 || data.stock < 0) {
      throw new Error("Nome, preço positivo e estoque não negativo são obrigatórios.");
    }

    try {
      return await createProduct(data);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      throw new Error("Não foi possível adicionar o produto.");
    }
  }

  // Atualizar um produto
  async editProduct(id: number, data: Partial<Product>): Promise<Product> {
    if (!id) throw new Error("ID do produto é obrigatório.");

    try {
      return await updateProduct(id, data);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw new Error("Não foi possível atualizar o produto.");
    }
  }

  // Remover um produto
  async removeProduct(id: number): Promise<void> {
    if (!id) throw new Error("ID do produto é obrigatório.");

    try {
      await deleteProduct(id);
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      throw new Error("Não foi possível remover o produto.");
    }
  }
}

export const productsService = new ProductsService();
