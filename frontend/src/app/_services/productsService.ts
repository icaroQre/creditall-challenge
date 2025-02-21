import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/app/_api/products";
import { Product } from "@/app/_types/product";

class ProductsService {
  // Buscar todos os produtos
  async fetchAllProducts(): Promise<Product[]> {
    try {
      return await getProducts();
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }

  // Criar um novo produto
  async addNewProduct(data: Product): Promise<Product> {
    if (!data.name || !data.description) {
      throw new Error("Todos os campos devem ser preenchidos.");
    }

    try {
      return await createProduct(data);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      throw error;
    }
  }

  // Atualizar um produto
  async editProduct(id: number, data: FormData): Promise<Product> {
    if (!id) throw new Error("ID do produto é obrigatório.");

    try {
      return await updateProduct(id, data);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw error;
    }
  }

  // Remover um produto
  async removeProduct(id: number): Promise<void> {
    if (!id) throw new Error("ID do produto é obrigatório.");

    try {
      await deleteProduct(id);
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      throw error;
    }
  }
}

export const productsService = new ProductsService();
