"use client";

import { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "../_types";
import { productsService } from "../_services/productsService";
import ProductTableList from "@/components/tableList/productTableList";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const handleDelete = async (productId: number) => {
    try {
      await productsService.removeProduct(productId);
      const newProducts = await productsService.fetchAllProducts();
      setProducts(newProducts);
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = async (productId: number, data: FormData) => {
    try {
      await productsService.editProduct(productId, data);

      const newProducts = await productsService.fetchAllProducts();
      setProducts(newProducts);
    } catch (err) {
      alert(err);
    }
  };

  const handleCreateProducts = async () => {
    try {
      await productsService.addNewProduct({
        name,
        description,
        price: Number(price),
        image,
      });
      const newProducts = await productsService.fetchAllProducts();
      setProducts(newProducts);
      setIsOpen(false);
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
    } catch (err) {
      alert(err);
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
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white px-4 py-2 rounded-md flex flex-row items-center justify-center gap-2">
                <CirclePlus /> Adicionar Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Produto</DialogTitle>
                <DialogDescription>
                  Preencha os dados do produto e clique em salvar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descrição
                  </Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Preço
                  </Label>
                  <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreateProducts}
                  className="text-secondary"
                >
                  Salvar Produto
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="w-full h-auto">
          {products.length > 0 ? (
            <ProductTableList
              data={products}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : (
            <h1>Nenhum item encontrado.</h1>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
