"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Sale } from "@/app/_types";
import UserTableLine from "../tableLine/userTableLine";
import SaleTableLine from "../tableLine/saleTableLine";

interface TableListProps {
  data: Sale[];
  onDelete: (id: number) => void;
  onEdit: (id: number, data: Sale) => void;
}

export default function SaleTableList({
  data,
  onDelete,
  onEdit,
}: TableListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Valor Total</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((sale, index) => (
          <SaleTableLine
            key={index}
            sale={sale}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </TableBody>
    </Table>
  );
}
