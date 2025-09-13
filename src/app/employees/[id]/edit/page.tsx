'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetEmployee } from '@/hooks/useGetEmployee';
import { Loading } from '@/components/ui/loading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeleteEmployee } from '@/hooks/useDeleteEmployee';
import { DeleteConfirmationModal } from '@/components/ui/delete-confirmation-modal';
import { formatters } from '@/lib/masks';

export default function EditEmployeePage() {
  const searchParams = useSearchParams();
  const employeeName = searchParams.get('name') || '';
  const { employee, loading, error } = useGetEmployee(employeeName);
  const router = useRouter();
  const { deleteEmployee, loading: deleteLoading } = useDeleteEmployee();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteConfirm = async () => {
    if (employee) {
      const success = await deleteEmployee(employee.id);
      if (success) {
        router.push('/employees');
      }
    }
    setDeleteModal(false);
  };

  if (loading) return <Loading />;
  if (error) return <div>Erro: {error}</div>;
  if (!employee) return <div>Funcionário não encontrado</div>;

  return (
    <main className="flex-1 flex">
      <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-0 hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div>
          <h1 className="font-bold text-3xl">Editar Funcionário</h1>
          <p className="font-bold opacity-75">Empresa DoQR Tecnologia</p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue={employee.name} className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                defaultValue={employee.email}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                defaultValue={formatters.cpf(employee.cpf)}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>
              <Input
                id="phone"
                defaultValue={formatters.phone(employee.phone)}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                defaultValue={formatters.date(employee.dateOfBith)}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractType">Tipo de Contratação</Label>
              <Select defaultValue={employee.typeOfHiring}>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLT">CLT</SelectItem>
                  <SelectItem value="PJ">PJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={employee.status ? "Ativo" : "Inativo"}>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="destructive" onClick={() => setDeleteModal(true)}>
              Excluir
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Salvar
            </Button>
          </div>
        </div>

        <DeleteConfirmationModal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          employeeName={employee.name}
          loading={deleteLoading}
        />
      </div>
    </main>
  );
}
