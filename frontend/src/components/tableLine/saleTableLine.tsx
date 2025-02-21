"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
import { Sale } from "@/app/_types";
import { format, parseISO } from "date-fns";

export default function SaleTableLine({
  sale,
  onDelete,
}: {
  sale: Sale;
  onDelete: (id: number) => void;
  onEdit?: (id: number, data: Sale) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [product] = useState(sale.product.name);
  const [client] = useState(sale.client.name);
  const [value] = useState(sale.product.price * sale.quantity - sale.discount);
  const [saleDate] = useState(sale.saleDate);
  const formattedDate = format(parseISO(saleDate.toString()), "dd/MM/yyyy");

  return (
    <TableRow key={sale.id}>
      <TableCell> {sale.id} </TableCell>
      <TableCell> {product} </TableCell>
      <TableCell> {client} </TableCell>
      <TableCell> {value} </TableCell>
      <TableCell> {formattedDate} </TableCell>
      <TableCell className="flex justify-end">
        <div className="flex items-center justify-center gap-2">
          {/* DIALOG EDITAR CLIENT */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-row items-center gap-2"
              >
                <Eye /> Detalhes
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Visualizar compra</DialogTitle>
                <DialogDescription>
                  <div className="grid gap-4 py-4">
                    <Table>
                      <TableBody>
                        <TableRow className="text-primary">
                          <TableCell className="font-bold">Data:</TableCell>
                          <TableCell className="text-right">
                            {formattedDate}
                          </TableCell>
                        </TableRow>
                        <TableRow className="text-primary">
                          <TableCell className="font-bold">Status:</TableCell>
                          <TableCell className="text-right">
                            {sale.status}
                          </TableCell>
                        </TableRow>
                        <TableRow className="text-primary">
                          <TableCell className="font-bold">Cliente:</TableCell>
                          <TableCell className="text-right">
                            {sale.client.name}
                          </TableCell>
                        </TableRow>
                        <TableRow className="text-primary">
                          <TableCell className="font-bold">CPF:</TableCell>
                          <TableCell className="text-right">
                            {sale.client.cpf}
                          </TableCell>
                        </TableRow>
                        <TableRow className="text-primary">
                          <TableCell className="font-bold">Produto:</TableCell>
                          <TableCell className="text-right">
                            {product}
                          </TableCell>
                        </TableRow>
                        <TableRow className="text-primary">
                          <TableCell className="font-bold">
                            Descrição:
                          </TableCell>
                          <TableCell className="text-right">
                            {sale.product.description}
                          </TableCell>
                        </TableRow>
                        <TableRow className="text-primary">
                          <TableCell className="font-bold">
                            Valor Nominal:
                          </TableCell>
                          <TableCell className="text-right">
                            {sale.product.price}
                          </TableCell>
                        </TableRow>
                        <TableRow className="text-primary">
                          <TableCell className="font-bold">
                            Quantidade:
                          </TableCell>
                          <TableCell className="text-right">
                            {sale.quantity}
                          </TableCell>
                        </TableRow>
                        <TableRow className="text-primary">
                          <TableCell className="font-bold">Disconto:</TableCell>
                          <TableCell className="text-right">
                            {sale.discount}
                          </TableCell>
                        </TableRow>
                        <TableRow className="text-primary">
                          <TableCell className="font-bold">
                            Valor Total:
                          </TableCell>
                          <TableCell className="text-right">{value}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button className="text-secondary">Fechar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* DIALOG EXCLUIR PRODUTO */}
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
                  onClick={() => sale.id !== undefined && onDelete(sale.id)}
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
