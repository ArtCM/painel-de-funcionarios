
'use client';

import { useState, useEffect } from 'react';
import { UserNameModal } from '@/components/ui/user-name-modal';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    } else {
      setShowModal(true);
    }
    setIsLoading(false);
  }, []);

  const handleNameSubmit = (name: string) => {
    localStorage.setItem('userName', name);
    setUserName(name);
    setShowModal(false);
    
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <>
      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Bem-vindo{userName || isLoading ? ', ' : '!'}
            {isLoading ? (
              <Skeleton className="inline-block h-10 w-32 ml-1" />
            ) : userName ? (
              `${userName}!`
            ) : null}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sistema de controle de funcionários - DoQR Tecnologia
          </p>
          
          <Link href="/employees">
            <Button className="bg-primary hover:bg-primary/90" size="lg">
              <Users className="w-5 h-5 mr-2" />
              Gerenciar Funcionários
            </Button>
          </Link>
        </div>
      </main>

      <UserNameModal 
        isOpen={showModal} 
        onSubmit={handleNameSubmit}
      />
    </>
  );
}

