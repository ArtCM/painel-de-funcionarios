'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserNameModalProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
}

export function UserNameModal({ isOpen, onSubmit }: UserNameModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-2">Bem-vindo!</h2>
          <p className="text-gray-600 mb-4">Por favor, informe seu nome para continuar.</p>
          
          <div className="mb-4">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="mt-2"
              autoFocus
            />
          </div>
          
          <Button type="submit" disabled={!name.trim()} className="w-full">
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
}