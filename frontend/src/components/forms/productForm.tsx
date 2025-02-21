"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Product } from "@/app/_types";

// Definindo o schema de validação com Zod
const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  price: z
    .string()
    .regex(/^\d+\.\d{2}$/, "O preço deve ter duas casas decimais (ex: 2.00)"),
  image: z.any().optional(), // Evita erro no servidor
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductForm({
  product,
  create,
  edit,
}: {
  product?: Product;
  create?: (data: FormData) => void;
  edit?: (id: number, data: FormData) => void;
}) {
  const formProduct = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price.toString() || "",
      image: product?.image || undefined,
    },
  });

  const handleSubmitProduct = (data: ProductFormData) => {
    const formDataProduct = new FormData();
    formDataProduct.append("name", data.name);
    formDataProduct.append("description", data.description);
    formDataProduct.append("price", data.price);

    // Verifica se a imagem foi alterada antes de adicionar ao FormData
    if (data.image instanceof File) {
      formDataProduct.append("image", data.image);
    }

    if (product && edit) {
      if (product.id !== undefined) {
        edit(product.id, formDataProduct);
      }
    } else if (create) {
      create(formDataProduct);
    }
  };

  return (
    <Form {...formProduct}>
      <form
        className="space-y-8"
        onSubmit={formProduct.handleSubmit(handleSubmitProduct)}
      >
        <FormField
          control={formProduct.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nome" {...field} />
              </FormControl>
              {/* Exibindo erro se existir */}
              {formProduct.formState.errors.name && (
                <p className="text-red-500 text-sm">
                  {formProduct.formState.errors.name.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={formProduct.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Descrição" {...field} />
              </FormControl>
              {/* Exibindo erro se existir */}
              {formProduct.formState.errors.description && (
                <p className="text-red-500 text-sm">
                  {formProduct.formState.errors.description.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={formProduct.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="0.00"
                  {...field}
                  value={field.value} // Garante a exibição correta
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, ""); // Permite apenas números e ponto
                    if (value.includes(".")) {
                      const parts = value.split(".");
                      if (parts.length > 2) {
                        value = parts[0] + "." + parts.slice(1).join(""); // Impede mais de um ponto
                      }
                      value = parts[0] + "." + (parts[1]?.slice(0, 2) || ""); // Garante 2 casas decimais
                    }
                    field.onChange(value);
                  }}
                />
              </FormControl>
              {/* Exibindo erro se existir */}
              {formProduct.formState.errors.price && (
                <p className="text-red-500 text-sm">
                  {formProduct.formState.errors.price.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={formProduct.control}
          name="image"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Imagem do Produto</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                />
              </FormControl>
              {/* Exibindo erro se existir */}
              {formProduct.formState.errors.image && (
                <p className="text-red-500 text-sm">
                  {formProduct.formState.errors.image?.message?.toString()}
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
