"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Client } from "@/app/_types";
import UserTableLine from "../tableLine/userTableLine";

interface TableListProps {
  data: Client[];
  onDelete: (id: number) => void;
  onEdit: (id: number, data: Client) => void;
}

export default function UserTableList({
  data,
  onDelete,
  onEdit,
}: TableListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((client, index) => (
          <UserTableLine
            key={index}
            client={client}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </TableBody>
    </Table>
  );
}
