'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, FileImage } from "lucide-react";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
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
import { Product } from '@/app/_types';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { on } from 'events';

type TfomrProduct = {
  name: string;
  description: string;
  price: number;
  image?: string | File;
}

export default function ProductTableLine({ product, onDelete, onEdit } : { product: Product, onDelete: (id: number) => void, onEdit: (id: number, data: FormData) => void }) {

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [image, setImage] = useState<string | File | undefined>(product.image);
    const [isOpen, setIsOpen] = useState(false);
    const [imageIssOpen, setImageIsOpen] = useState(false);

    const formProduct = useForm<TfomrProduct>({
      defaultValues: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image
      }
    })

    const handleSubmitProduct = (data: TfomrProduct) => {
      if (product.id !== undefined) {
        const formDataProduct = new FormData();
    
        formDataProduct.append("name", data.name);
        formDataProduct.append("description", data.description);
        formDataProduct.append("price", data.price.toString());
    
        if (data.image instanceof File) { // Garante que é um arquivo antes de adicionar
          formDataProduct.append("image", data.image);
        }
    
        console.log("Dados enviados:");
        formDataProduct.forEach((value, key) => {
          console.log(`${key}:`, value);
        });
    
        onEdit(product.id, formDataProduct);
      }
    };
    
  return (
    <TableRow key={product.id}>
              <TableCell> {product.name} </TableCell>
              <TableCell> {product.description} </TableCell>
              <TableCell> {product.price} </TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center justify-center gap-2">

                {/* DIALOG VISUALIZAR IMAGEM DO PRODUTO */}
                <Dialog open={imageIssOpen} onOpenChange={setImageIsOpen}>
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
                    {typeof product.image === 'string' ? <Image src={product.image} alt="product image" width={500} height={500} />
                    : 
                    <div className='flex items-center justify-center flex-col gap-4'>
                      <FileImage size={100} />
                      <p>Imagem não cadastrada</p>
                    </div>
                    }
                  </DialogContent>
                </Dialog>










                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex flex-row items-center gap-2">
                      <Pencil /> Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Editar produto</DialogTitle>
                      <DialogDescription>Preencha os dados do produto e clique em salvar.</DialogDescription>
                    </DialogHeader>




                    <Form {...formProduct}>
                      <form className='space-y-8' onSubmit={formProduct.handleSubmit(handleSubmitProduct)}>
                        <FormField
                        control={formProduct.control}
                        name="name" 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input type='text' placeholder={product.name} {...field} />
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
                              <Input type='text' placeholder={product.description} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                        />
                      <FormField
                        control={formProduct.control}
                        name="price" 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input type='text' placeholder={product.price.toString()} {...field} />
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
                                    onChange(file); // Atualiza o campo no `useForm`
                                  }
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                        <DialogClose>
                          <Button type='submit' className="text-secondary">Salvar</Button>
                        </DialogClose>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>








                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant="destructive" className="flex flex-row items-center gap-2">
                      <Trash2 /> Excluir
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Realmente deseja excluir este item? Essa ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction className="text-secondary" onClick={() => product.id !== undefined && onDelete(product.id)}>
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
  )
}
