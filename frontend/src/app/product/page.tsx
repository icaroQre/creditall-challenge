"use client"

import { useEffect, useState } from "react";
import { productsService } from "@/app/_services/productsService";
import { Product } from "@/app/_types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import ProductTableList from "@/components/productTableList";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsService.fetchAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (clientId: number) => {
    try {
      await productsService.removeProduct(clientId);
      setProducts((prevProducts) => prevProducts.filter(client => client.id !== clientId));
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
    }
  };

  return (
    <>
      <Card className="w-[100%] h-auto">
        <CardHeader className="mb-8 flex flex-row justify-between items-center">
          <div className="flex flex-col items-start justify-start gap-2">
            <CardTitle className="text-4xl">Produtos</CardTitle>
            <CardDescription>
              Lista de produtos da Creditall Holding Empresarial
            </CardDescription>
          </div>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-md flex flex-row items-center justify-center gap-2">
            <CirclePlus /> Adicionar Produto
          </Button>
        </CardHeader>

        <CardContent className="w-full h-auto">
        {products.length > 0 ? <ProductTableList data={products} onDelete={handleDelete} /> : <h1>Nenhum item encontrado.</h1>}
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </>
  );
}
