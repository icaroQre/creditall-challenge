import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Sale } from "@/app/_types";

// Definindo o schema de validação com Zod para o formulário de Venda
const saleSchema = z.object({
  clientId: z
    .string()
    .regex(/^\d+$/, "ID do Cliente deve conter apenas números") // Verifica se o ID do Cliente contém apenas números
    .min(1, "ID do Cliente é obrigatório"),
  productId: z
    .string()
    .regex(/^\d+$/, "ID do Produto deve conter apenas números") // Verifica se o ID do Produto contém apenas números
    .min(1, "ID do Produto é obrigatório"),
  quantity: z
    .string()
    .regex(/^\d+$/, "Quantidade deve conter apenas números") // Verifica se a Quantidade contém apenas números
    .min(1, "Quantidade é obrigatória"),
  discount: z
    .string()
    .regex(/^\d+\.\d{2}$/, "Desconto deve ter duas casas decimais (ex: 2.00)") // Desconto com duas casas decimais
    .optional(),
  date: z.date().max(new Date(), "Data da venda não pode ser no futuro"), // Data obrigatória e não pode ser no futuro
  status: z.enum(["completed", "pending", "canceled"], {
    errorMap: () => ({ message: "Status é obrigatório" }),
  }), // Status obrigatório
});

type SaleFormData = z.infer<typeof saleSchema>;

export default function SaleForm({
  sale,
  create,
  edit,
}: {
  sale?: Sale;
  create?: (data: FormData) => void;
  edit?: (id: number, data: FormData) => void;
}) {
  const formSale = useForm<SaleFormData>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      clientId: sale?.clientId?.toString() || "",
      productId: sale?.productId?.toString() || "",
      quantity: sale?.quantity?.toString() || "",
      discount: sale?.discount?.toString() || "",
      date: sale?.saleDate ? new Date(sale.saleDate) : new Date(),
      status: sale?.status || "pending",
    },
  });

  const handleSubmitSale = (data: SaleFormData) => {
    const formDataSale = new FormData();
    formDataSale.append("clientId", data.clientId);
    formDataSale.append("productId", data.productId);
    formDataSale.append("quantity", data.quantity);
    formDataSale.append("discount", data.discount || "0.00");
    formDataSale.append("date", data.date.toISOString());
    formDataSale.append("status", data.status);

    if (sale && edit) {
      // Lógica de edição
      edit(sale.id, formDataSale);
    } else if (create) {
      create(formDataSale);
    }
  };

  return (
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
              {formSale.formState.errors.clientId && (
                <p className="text-red-500 text-sm">
                  {formSale.formState.errors.clientId.message}
                </p>
              )}
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
              {formSale.formState.errors.productId && (
                <p className="text-red-500 text-sm">
                  {formSale.formState.errors.productId.message}
                </p>
              )}
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
              {formSale.formState.errors.quantity && (
                <p className="text-red-500 text-sm">
                  {formSale.formState.errors.quantity.message}
                </p>
              )}
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
                <Input
                  type="text"
                  placeholder="0.00"
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, ""); // Permite apenas números e ponto
                    if (value.includes(".")) {
                      const parts = value.split(".");
                      if (parts.length > 2) {
                        value = parts[0] + "." + parts.slice(1).join("");
                      }
                      value = parts[0] + "." + (parts[1]?.slice(0, 2) || ""); // Garante 2 casas decimais
                    }
                    field.onChange(value);
                  }}
                />
              </FormControl>
              {formSale.formState.errors.discount && (
                <p className="text-red-500 text-sm">
                  {formSale.formState.errors.discount.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={formSale.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data da Venda</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value ? field.value.toISOString().split("T")[0] : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              {formSale.formState.errors.date && (
                <p className="text-red-500 text-sm">
                  {formSale.formState.errors.date.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={formSale.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status da Venda</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Finalizada</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="canceled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              {formSale.formState.errors.status && (
                <p className="text-red-500 text-sm">
                  {formSale.formState.errors.status.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="text-secondary">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
