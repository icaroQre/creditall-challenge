"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, FileImage } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Product } from "@/app/_types";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { on } from "events";
import { TfomrProduct } from "@/app/_types/product";
import ProductForm from "../forms/productForm";
import { set } from "date-fns";

export default function ProductTableLine({
  product,
  onDelete,
  onEdit,
}: {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (id: number, data: FormData) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageIsOpen, setImageIsOpen] = useState(false);

  return (
    <TableRow key={product.id}>
      <TableCell> {product.id} </TableCell>
      <TableCell> {product.name} </TableCell>
      <TableCell> {product.description} </TableCell>
      <TableCell> {product.price} </TableCell>
      <TableCell className="flex justify-end">
        <div className="flex items-center justify-center gap-2">
          {/* DIALOG VISUALIZAR IMAGEM DO PRODUTO */}
          <Dialog open={imageIsOpen} onOpenChange={setImageIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-row items-center gap-2"
              >
                <Eye /> Visualizar produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] flex items-center justify-center flex-col gap-12">
              <DialogHeader>
                <DialogTitle>Visualizar produto</DialogTitle>
              </DialogHeader>
              {typeof product.image === "string" ? (
                <Image
                  src={product.image}
                  alt="product image"
                  width={500}
                  height={500}
                />
              ) : (
                <div className="flex items-center justify-center flex-col gap-4">
                  <FileImage size={100} />
                  <p>Imagem não cadastrada</p>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* DIALOG PARA EDITAR PRODUTO */}

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-row items-center gap-2"
              >
                <Pencil /> Editar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar produto</DialogTitle>
                <DialogDescription>
                  Preencha os dados do produto e clique em salvar.
                </DialogDescription>
              </DialogHeader>
              <ProductForm product={product} edit={onEdit} />
              <DialogClose>
                <Button className="w-full" variant={"outline"}>
                  Fechar
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant="destructive"
                className="flex flex-row items-center gap-2"
              >
                <Trash2 /> Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Realmente deseja excluir este item? Essa ação não pode ser
                  desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="text-secondary"
                  onClick={() =>
                    product.id !== undefined && onDelete(product.id)
                  }
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
