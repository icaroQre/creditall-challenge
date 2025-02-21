"use client";

import { format } from "date-fns";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sale } from "../_types";
import { salesService } from "../_services/salesService";
import SaleTableList from "@/components/tableList/saleTableList";
import SaleForm from "@/components/forms/saleForm";

export default function Home() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await salesService.fetchAllSales();
        console.log(data);
        setSales(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSales();
  }, []);

  const handleDelete = async (saletId: number) => {
    try {
      await salesService.removeSale(saletId);
      const newSales = await salesService.fetchAllSales();
      setSales(newSales);
    } catch (err) {
      alert(err);
    }
  };

  const handleCreateSales = async (date: FormData) => {
    const formatDate = format(
      new Date(date.get("date") as string),
      "yyyy-MM-dd"
    );
    try {
      await salesService.addNewSale({
        clientId: Number(date.get("clientId")),
        productId: Number(date.get("productId")),
        quantity: Number(date.get("quantity")),
        status: date.get("status") as "completed" | "pending" | "canceled",
        saleDate: new Date(formatDate),
        discount: Number(date.get("discount")),
      });
      const newSales = await salesService.fetchAllSales();
      setSales(newSales);
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
            <CardTitle className="text-4xl">Vendas</CardTitle>
            <CardDescription>
              Vendas realizadas pela Creditall Holding Empresarial
            </CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white px-4 py-2 rounded-md flex flex-row items-center justify-center gap-2">
                <CirclePlus /> Registrar Venda
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Produto</DialogTitle>
                <DialogDescription>
                  Preencha os dados do produto e clique em salvar.
                </DialogDescription>
              </DialogHeader>
              <SaleForm create={handleCreateSales} />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="w-full h-auto">
          {sales.length > 0 ? (
            <SaleTableList data={sales} onDelete={handleDelete} />
          ) : (
            <h1>Nenhum item encontrado.</h1>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
