'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash, Plus } from 'lucide-react';
import { formatters } from '@/lib/masks';
import Link from 'next/link';
import { useEmployees } from '@/hooks/useEmployees';
import { useDeleteEmployee } from '@/hooks/useDeleteEmployee';
import { Loading } from '@/components/ui/loading';
import { DeleteConfirmationModal } from '@/components/ui/delete-confirmation-modal';

export default function EmployeesPage() {
  const { employees, loading, error, refetch, setSearchTerm } = useEmployees();
  const { deleteEmployee, loading: deleteLoading } = useDeleteEmployee();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    employeeId: number | null;
    employeeName: string;
  }>({
    isOpen: false,
    employeeId: null,
    employeeName: '',
  });

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteModal({
      isOpen: true,
      employeeId: id,
      employeeName: name,
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.employeeId) {
      const success = await deleteEmployee(deleteModal.employeeId);
      if (success) {
        await refetch();
        setDeleteModal({ isOpen: false, employeeId: null, employeeName: '' });
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, employeeId: null, employeeName: '' });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

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
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Link href="/employees/new-employee">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Funcionário
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="border rounded-lg p-8">
            <Loading />
          </div>
        ) : error ? (
          <div className="border rounded-lg p-8 text-red-500 text-center">{error}</div>
        ) : (
          <div className="border rounded-lg">
            <Table data-testid="employees-table">
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
                  <TableRow key={employee.id} data-testid="employee-row">
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{formatters.cpf(employee.cpf)}</TableCell>
                    <TableCell>{formatters.phone(employee.phone)}</TableCell>
                    <TableCell>{formatters.date(employee.dateOfBith)}</TableCell>
                    <TableCell>{employee.typeOfHiring}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === true
                            ? 'secondary'
                            : 'destructive'
                        }
                        className={
                          employee.status === true
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                      >
                        {employee.status ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Link href={`/employees/${employee.id}/edit?name=${encodeURIComponent(employee.name)}`}>
                          <Button variant="ghost" size="sm" data-testid="edit-button">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          data-testid="delete-button"
                          onClick={() => handleDeleteClick(employee.id, employee.name)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          employeeName={deleteModal.employeeName}
          loading={deleteLoading}
          data-testid="delete-modal"
        />
      </div>
    </main>
  );
}
