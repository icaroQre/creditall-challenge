"use client";

import { useEffect, useState } from "react";
import { clientsService } from "@/app/_services/clientsService";
import { Client } from "@/app/_types/client";
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
import UserTableList from "@/components/tableList/userTableList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClientForm from "@/components/forms/clientForm";

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await clientsService.fetchAllClients();
        setClients(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (clientId: number) => {
    try {
      await clientsService.removeClient(clientId);
      const newClients = await clientsService.fetchAllClients();
      setClients(newClients);
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = async (clientId: number, data: Client) => {
    try {
      await clientsService.editClient(clientId, data);
      const newClients = await clientsService.fetchAllClients();
      setClients(newClients);
    } catch (err) {
      alert(err);
    }
  };

  const handleCreateClient = async (data: FormData) => {
    try {
      await clientsService.addNewClient({
        name: data.get("name") as string,
        email: data.get("email") as string,
        cpf: data.get("cpf") as string,
      });
      const newClients = await clientsService.fetchAllClients();
      setClients(newClients);
      setIsOpen(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Card className="w-[100%] h-auto">
        <CardHeader className="mb-8 flex flex-row justify-between items-center">
          <div className="flex flex-col items-start justify-start gap-2">
            <CardTitle className="text-4xl">Clientes</CardTitle>
            <CardDescription>
              Lista de clientes da Creditall Holding Empresarial
            </CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white px-4 py-2 rounded-md flex flex-row items-center justify-center gap-2">
                <CirclePlus /> Adicionar Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Cliente</DialogTitle>
                <DialogDescription>
                  Preencha os dados do cliente e clique em salvar.
                </DialogDescription>
              </DialogHeader>
              <ClientForm create={handleCreateClient} />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="w-full h-auto">
          {clients.length > 0 ? (
            <UserTableList
              data={clients}
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
