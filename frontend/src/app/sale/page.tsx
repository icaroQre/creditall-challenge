"use client";

const { format } = require("date-fns");
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sale } from "../_types";
import { salesService } from "../_services/salesService";
import SaleTableList from "@/components/tableList/saleTableList";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { TfomrSale } from "../_types/sale";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
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

  const handleEdit = async (salesId: number, data: Sale) => {
    // try {
    //   await salesService.(salesId, data);
    //   const newSales = await salesService.fetchAllSales();
    //   setSales(newSales);
    // } catch (err) {
    //   alert(err);
    // }
  };

  const handleCreateProducts = async (date: TfomrSale) => {
    const formatDate = format(new Date(date.date), "yyyy-MM-dd");
    try {
      await salesService.addNewSale({
        clientId: date.clientId,
        productId: date.productId,
        quantity: date.quantity,
        status: date.status,
        saleDate: formatDate,
      });
      const newSales = await salesService.fetchAllSales();
      setSales(newSales);
      setIsOpen(false);
    } catch (err) {
      alert(err);
    }
  };

  const formSale = useForm<TfomrSale>({
    defaultValues: {
      clientId: undefined,
      productId: undefined,
      date: new Date(),
      quantity: 1,
      status: "completed",
      discount: 0,
    },
  });

  const handleSubmitSale = (data: TfomrSale) => {
    handleCreateProducts(data);
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
              <Form {...formSale}>
                <form
                  className="space-y-4"
                  onSubmit={formSale.handleSubmit(handleSubmitSale)}
                >
                  <FormField
                    control={formSale.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID do Cliente</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formSale.control}
                    name="productId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID do Produto</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formSale.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formSale.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desconto</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formSale.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data da venda</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={
                              field.value
                                ? field.value.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formSale.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status da venda</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange} // Adicionando onChange corretamente
                            defaultValue={field.value} // Define o valor inicial
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="completed">
                                Finalizada
                              </SelectItem>
                              <SelectItem value="pending">Pendente</SelectItem>
                              <SelectItem value="canceled">
                                Cancelada
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <DialogClose>
                    <Button type="submit" className="text-secondary">
                      Salvar
                    </Button>
                  </DialogClose>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="w-full h-auto">
          {sales.length > 0 ? (
            <SaleTableList
              data={sales}
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
