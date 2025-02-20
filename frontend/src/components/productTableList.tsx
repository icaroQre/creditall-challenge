import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/app/_types";
import ProductTableLine from "./productTableLine";

interface TableListProps{
  data: Product[];
  onDelete: (id: number) => void;
  onEdit: (id: number, data: Product) => void;
}

export default function ProductTableList({
  data,
  onDelete,
  onEdit,
}: TableListProps ) {
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((product) => (
          <ProductTableLine key={product.id} product={product} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </TableBody>
    </Table>
  );
}
