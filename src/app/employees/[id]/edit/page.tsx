'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetEmployeeById } from '@/hooks/useGetEmployeeById';
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
import { useUpdateEmployee } from '@/hooks/useUpdateEmployee';
import { updateEmployeeSchema } from '@/lib/validations/employee';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditEmployeePage() {
  const params = useParams();
  const employeeId = parseInt(params.id as string);
  const { employee, loading, error } = useGetEmployeeById(employeeId);
  const router = useRouter();
  const { deleteEmployee, loading: deleteLoading } = useDeleteEmployee();
  const { updateEmployee, loading: updateLoading } = useUpdateEmployee();
  const [deleteModal, setDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    dateOfBith: '',
    typeOfHiring: '',
    status: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        cpf: employee.cpf || '',
        phone: employee.phone || '',
        dateOfBith: formatters.date(employee.dateOfBith) || '',
        typeOfHiring: employee.typeOfHiring || '',
        status: employee.status ?? true,
      });
    }
  }, [employee]);

  const handleInputChange = (field: string, value: string | boolean) => {
    let formattedValue = value;
    
    if (typeof value === 'string') {
      switch (field) {
        case 'cpf':
          formattedValue = formatters.cpf(value);
          break;
        case 'phone':
          formattedValue = formatters.phone(value);
          break;
        case 'dateOfBith':
          formattedValue = formatters.date(value);
          break;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    try {
      updateEmployeeSchema.parse(formData);
      
      const [day, month, year] = formData.dateOfBith.split('/');
      const isoDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
      
      const dataToSend = {
        ...formData,
        dateOfBith: isoDate
      };
      
      const success = await updateEmployee(employee.id, dataToSend);
      if (success) {
        toast.success('Funcionário atualizado com sucesso!');
        router.push('/employees');
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path && issue.path.length > 0) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Por favor, corrija os erros no formulário');
      } else {
        toast.error('Erro ao atualizar funcionário');
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (employee) {
      const success = await deleteEmployee(employee.id);
      if (success) {
        router.push('/employees');
      }
    }
    setDeleteModal(false);
  };

  if (loading) {
    return (
      <main className="flex-1 flex">
        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-20" />
          </div>

          <div>
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-48" />
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
      </main>
    );
  }

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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-gray-50"
                  maxLength={100}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-gray-50"
                  maxLength={150}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  className="bg-gray-50"
                  maxLength={14}
                  placeholder="999.999.999-99"
                />
                {errors.cpf && <p className="text-sm text-red-500">{errors.cpf}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Celular</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-gray-50"
                  maxLength={15}
                  placeholder="(99) 99999-9999"
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  value={formData.dateOfBith}
                  onChange={(e) => handleInputChange('dateOfBith', e.target.value)}
                  className="bg-gray-50"
                  maxLength={10}
                  placeholder="DD/MM/AAAA"
                />
                {errors.dateOfBith && <p className="text-sm text-red-500">{errors.dateOfBith}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractType">Tipo de Contratação</Label>
                <Select 
                  value={formData.typeOfHiring}
                  onValueChange={(value) => handleInputChange('typeOfHiring', value)}
                >
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLT">CLT</SelectItem>
                    <SelectItem value="PJ">PJ</SelectItem>
                  </SelectContent>
                </Select>
                {errors.typeOfHiring && <p className="text-sm text-red-500">{errors.typeOfHiring}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status ? "true" : "false"}
                  onValueChange={(value) => handleInputChange('status', value === "true")}
                >
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Ativo</SelectItem>
                    <SelectItem value="false">Inativo</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button 
                type="button"
                variant="destructive" 
                onClick={() => setDeleteModal(true)}
              >
                Excluir
              </Button>
              <Button 
                type="submit"
                disabled={updateLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {updateLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
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
