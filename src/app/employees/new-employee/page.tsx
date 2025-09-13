'use client';
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
export default function NewEmployeePage() {
  const router = useRouter();
  return (
    <main className="flex-1 flex">
      {' '}
      <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          {' '}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-0 hover:bg-transparent"
          >
            {' '}
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar{' '}
          </Button>
        </div>
        <div>
          {' '}
          <h1 className="font-bold text-3xl">Adicionar Funcionário</h1>
          <p className="font-bold opacity-75">Empresa DoQR Tecnologia</p>{' '}
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {' '}
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>{' '}
              <Input id="name" placeholder="Nome" className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              {' '}
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="e-mail"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              {' '}
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                className="bg-gray-50"
              />{' '}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>{' '}
              <Input
                id="phone"
                placeholder="(99) 99999-9999"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              {' '}
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                placeholder="00/00/0000"
                className="bg-gray-50"
              />{' '}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractType">Tipo de Contratação</Label>{' '}
              <Select>
                <SelectTrigger className="bg-gray-50">
                  {' '}
                  <SelectValue placeholder="Selecione uma opção..." />
                </SelectTrigger>{' '}
                <SelectContent>
                  <SelectItem value="CLT">CLT</SelectItem>{' '}
                  <SelectItem value="PJ">PJ</SelectItem>
                </SelectContent>{' '}
              </Select>
            </div>
            <div className="space-y-2">
              {' '}
              <Label htmlFor="status">Status</Label>
              <Select>
                {' '}
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Selecione uma opção..." />{' '}
                </SelectTrigger>
                <SelectContent>
                  {' '}
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>{' '}
                </SelectContent>
              </Select>{' '}
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            {' '}
            <Button className="bg-blue-600 hover:bg-blue-700">
              Cadastrar{' '}
            </Button>
          </div>{' '}
        </div>
      </div>{' '}
    </main>
  );
}
