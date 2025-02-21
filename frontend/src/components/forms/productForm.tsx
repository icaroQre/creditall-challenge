"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/app/_types";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { TfomrProduct } from "@/app/_types/product";
import { DialogClose } from "../ui/dialog";

export default function ProductForm({
  product,
  create,
  edit,
}: {
  product?: Product;
  create?: (data: FormData) => void;
  edit?: (id: number, data: FormData) => void;
}) {
  const defaultValues = product
    ? {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      }
    : {};

  const formProduct = useForm<TfomrProduct>({
    defaultValues,
  });

  const handleSubmitProduct = (data: TfomrProduct) => {
    const formDataProduct = new FormData();
    formDataProduct.append("name", data.name);
    formDataProduct.append("description", data.description);
    formDataProduct.append("price", data.price.toString());

    if (data.image instanceof File) {
      formDataProduct.append("image", data.image);
    }

    if (edit) {
      if (product) {
        if (product.id !== undefined) {
          edit(product.id, formDataProduct);
        }
      }
    }

    if (create) {
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
                <Input type="text" placeholder="Preço" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={formProduct.control}
          name="image"
          render={({ field: { onChange, ...field } }) => (
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
  );
}
