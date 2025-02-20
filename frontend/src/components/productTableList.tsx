import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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
import { Product } from "@/app/_types";

interface TableListProps{
  data: Product[];
  onDelete: (id: number) => void;
}

export default function ProductTableList({
  data,
  onDelete,
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
        {data.map((item) => (
          <TableRow key={item.id}>
              <TableCell> {item.name} </TableCell>
              <TableCell> {item.description} </TableCell>
              <TableCell> {item.price} </TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  className="flex flex-row items-center gap-2"
                >
                  <Eye /> Vizualisar foto
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-row items-center gap-2"
                >
                  <Pencil /> Editar
                </Button>
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
                      <AlertDialogAction className="text-secondary" onClick={() => item.id !== undefined && onDelete(item.id)}>
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
