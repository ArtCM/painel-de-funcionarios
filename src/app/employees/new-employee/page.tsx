'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { employeeService } from '@/lib/api';
import { formatters } from '@/lib/masks';
import { CreateEmployeeData, createEmployeeSchema } from '@/lib/validations/employee';
import { toast } from 'sonner';
import { ZodError } from 'zod';

export default function NewEmployeePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateEmployeeData>({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    dateOfBith: '',
    typeOfHiring: 'CLT',
    status: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CreateEmployeeData, value: string | boolean) => {
    let formattedValue = value;
    
    if (typeof value === 'string') {
      formattedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      
      switch (field) {
        case 'cpf':
          formattedValue = formatters.cpf(formattedValue);
          break;
        case 'phone':
          formattedValue = formatters.phone(formattedValue);
          break;
        case 'dateOfBith':
          formattedValue = formatters.date(formattedValue);
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
    setIsSubmitting(true);
    setErrors({});

    try {
      createEmployeeSchema.parse(formData);
      
      const [day, month, year] = formData.dateOfBith.split('/');
      const isoDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
      
      const dataToSend = {
        ...formData,
        dateOfBith: isoDate
      };
      
      await employeeService.create(dataToSend);
      
      toast.success('Funcionário criado com sucesso!');
      router.push('/employees');
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
        toast.error('Erro ao criar funcionário');
        console.error('Erro:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 flex">
      <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Novo Funcionário</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
                maxLength={100}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                maxLength={150}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                className={errors.cpf ? 'border-red-500' : ''}
                maxLength={14}
                placeholder="999.999.999-99"
              />
              {errors.cpf && <p className="text-sm text-red-500">{errors.cpf}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Celular *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-red-500' : ''}
                maxLength={15}
                placeholder="(99) 99999-9999"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBith">Data de Nascimento *</Label>
              <Input
                id="dateOfBith"
                value={formData.dateOfBith}
                onChange={(e) => handleInputChange('dateOfBith', e.target.value)}
                className={errors.dateOfBith ? 'border-red-500' : ''}
                maxLength={10}
                placeholder="DD/MM/AAAA"
              />
              {errors.dateOfBith && <p className="text-sm text-red-500">{errors.dateOfBith}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="typeOfHiring">Tipo de Contratação *</Label>
              <Select
                value={formData.typeOfHiring}
                onValueChange={(value) => handleInputChange('typeOfHiring', value)}
              >
                <SelectTrigger className={errors.typeOfHiring ? 'border-red-500' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLT">CLT</SelectItem>
                  <SelectItem value="PJ">PJ</SelectItem>
                </SelectContent>
              </Select>
              {errors.typeOfHiring && <p className="text-sm text-red-500">{errors.typeOfHiring}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status ? "true" : "false"}
                onValueChange={(value) => handleInputChange('status', value === "true")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Ativo</SelectItem>
                  <SelectItem value="false">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
