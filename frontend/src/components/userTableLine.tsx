'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
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
import { Client } from '@/app/_types';

export default function UserTableLine({ client, onDelete, onEdit } : { client: Client, onDelete: (id: number) => void, onEdit: (id: number, data: Client) => void }) {

    const [name, setName] = useState(client.name);
    const [email, setEmail] = useState(client.email);
    const [cpf, setCpf] = useState(client.cpf);
    const [isOpen, setIsOpen] = useState(false);

  return (
    <TableRow key={client.id}>
              <TableCell> {client.name} </TableCell>
              <TableCell> {client.email} </TableCell>
              <TableCell> {client.cpf} </TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center justify-center gap-2">
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
                    <DialogTitle>Editar cliente</DialogTitle>
                    <DialogDescription>Preencha os dados do cliente e clique em salvar.</DialogDescription>
                  </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right" >Nome</Label>
                        <Input id="name" placeholder={client.name} value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" placeholder={client.email} value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cpf" className="text-right">CPF</Label>
                        <Input id="cpf" placeholder={client.cpf} value={cpf} onChange={(e) => setCpf(e.target.value)} className="col-span-3" />
                      </div>
                    </div>
                  <DialogFooter>
                   <DialogClose>
                   <Button onClick={() => client.id !== undefined && onEdit(client.id, {name, email, cpf})} className="text-secondary">Salvar Cliente</Button>
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
                      <AlertDialogAction className="text-secondary" onClick={() => client.id !== undefined && onDelete(client.id)}>
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
