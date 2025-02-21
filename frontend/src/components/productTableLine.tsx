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

export default function ProductTableLine({ product, onDelete, onEdit } : { product: Product, onDelete: (id: number) => void, onEdit: (id: number, data: Product) => void }) {

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [image, setImage] = useState(product.image);
    const [isOpen, setIsOpen] = useState(false);
    const [imageIssOpen, setImageIsOpen] = useState(false);

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
                    {product.image ? <Image src={product.image} alt="product image" width={500} height={500} />
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
                    <DialogDescription>Preencha os dados do produto e clique em salvar.</DialogDescription>
                  </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right" >Nome</Label>
                        <Input id="name" placeholder={product.name} value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Descrição</Label>
                        <Input id="description" placeholder={product.description} value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Preço</Label>
                        <Input id="price" placeholder={product.price.toString()} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="col-span-3" />
                      </div>
                    </div>
                  <DialogFooter>
                   <DialogClose>
                   <Button onClick={() => product.id !== undefined && onEdit(product.id, {name, description, price})} className="text-secondary">Salvar Produto</Button>
                   </DialogClose>
                  </DialogFooter>
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
