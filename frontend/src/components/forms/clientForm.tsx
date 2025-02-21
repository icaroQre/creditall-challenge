import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Client } from "@/app/_types";

// Definindo o schema de validação com Zod para o formulário de Cliente
const clientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  cpf: z
    .string()
    .regex(/^\d+$/, "CPF deve conter apenas números") // Verifica se o CPF contém apenas números
    .length(11, "CPF deve ter 11 dígitos"), // Verifica o tamanho do CPF
});

type ClientFormData = z.infer<typeof clientSchema>;

export default function ClientForm({
  client,
  create,
  edit,
}: {
  client?: Client;
  create?: (data: FormData) => void;
  edit?: (id: number, data: FormData) => void;
}) {
  const formClient = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      email: client?.email || "",
      cpf: client?.cpf || "",
    },
  });

  const handleSubmitClient = (data: ClientFormData) => {
    const formDataClient = new FormData();
    formDataClient.append("name", data.name);
    formDataClient.append("email", data.email);
    formDataClient.append("cpf", data.cpf);

    if (client && edit) {
      // Adiciona a lógica de edição, se necessário
      if (client.id !== undefined) {
        edit(client.id, formDataClient);
      }
    } else if (create) {
      create(formDataClient);
    }
  };

  return (
    <Form {...formClient}>
      <form
        className="space-y-8"
        onSubmit={formClient.handleSubmit(handleSubmitClient)}
      >
        <FormField
          control={formClient.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nome" {...field} />
              </FormControl>
              {formClient.formState.errors.name && (
                <p className="text-red-500 text-sm">
                  {formClient.formState.errors.name.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={formClient.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              {formClient.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {formClient.formState.errors.email.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={formClient.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="CPF"
                  maxLength={11} // Limita o número de caracteres a 11
                  {...field}
                  value={field.value} // Garante a exibição correta
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Permite apenas números
                    if (value.length <= 11) {
                      field.onChange(value);
                    }
                  }}
                />
              </FormControl>
              {formClient.formState.errors.cpf && (
                <p className="text-red-500 text-sm">
                  {formClient.formState.errors.cpf.message}
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
