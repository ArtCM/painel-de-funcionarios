import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash, Plus } from "lucide-react";
import { formatters } from "@/lib/masks";

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "joedoe@doqr.com.br",
    cpf: "11122233344",
    phone: "1499123-4567",
    birthDate: "01/01/2000",
    contractType: "CLT",
    status: "Ativo"
  },
  {
    id: 2,
    name: "John Doe",
    email: "joao@doqr.com.br",
    cpf: "111.222.333-44",
    phone: "1499123-4567",
    birthDate: "01/01/2000",
    contractType: "PJ",
    status: "Ativo"
  },
  {
    id: 3,
    name: "John Doe",
    email: "joao@doqr.com.br",
    cpf: "111.222.333-44",
    phone: "1499123-4567",
    birthDate: "01/01/2000",
    contractType: "CLT",
    status: "Inativo"
  }
];

export default function EmployeesPage() {
  return (
    <main className="flex-1 flex">
      <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
        <div>
          <h1 className="font-bold text-3xl">Controle de Funcionários</h1>
          <p className="font-bold opacity-75">Empresa DoQR Tecnologia</p>
        </div>

        <div className="flex justify-between items-center gap-4">
          <Input
            placeholder="Buscar Funcionário..."
            className="max-w-sm"
          />
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Funcionário
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Celular</TableHead>
                <TableHead>Data de Nascimento</TableHead>
                <TableHead>Tipo Contratação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{formatters.cpf(employee.cpf)}</TableCell>
                  <TableCell>{formatters.phone(employee.phone)}</TableCell>
                  <TableCell>{formatters.date(employee.birthDate)}</TableCell>
                  <TableCell>{employee.contractType}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={employee.status === "Ativo" ? "secondary" : "destructive"}
                      className={employee.status === "Ativo" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
