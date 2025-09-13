'use client';

import { useState } from 'react';
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
import { CreateEmployeeData } from '@/lib/api';
import { useCreateEmployee } from '@/hooks/useCreateEmployee';

export default function NewEmployeePage() {
  const router = useRouter();
  const { createEmployee, loading, error } = useCreateEmployee();
  const [formData, setFormData] = useState<CreateEmployeeData>({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    dateOfBith: '',
    typeOfHiring: '',
    status: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEmployee(formData);
  };

  const handleInputChange = (field: keyof CreateEmployeeData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
          <h1 className="font-bold text-3xl">Adicionar Funcionário</h1>
          <p className="font-bold opacity-75">Empresa DoQR Tecnologia</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Nome"
                  className="bg-gray-50"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e-mail"
                  className="bg-gray-50"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  className="bg-gray-50"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Celular</Label>
                <Input
                  id="phone"
                  placeholder="(99) 99999-9999"
                  className="bg-gray-50"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  className="bg-gray-50"
                  value={formData.dateOfBith}
                  onChange={(e) => handleInputChange('dateOfBith', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractType">Tipo de Contratação</Label>
                <Select
                  value={formData.typeOfHiring}
                  onValueChange={(value) => handleInputChange('typeOfHiring', value)}
                >
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue placeholder="Selecione uma opção..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLT">CLT</SelectItem>
                    <SelectItem value="PJ">PJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status ? 'true' : 'false'}
                  onValueChange={(value) => handleInputChange('status', value === 'true')}
                >
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue placeholder="Selecione uma opção..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Ativo</SelectItem>
                    <SelectItem value="false">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
