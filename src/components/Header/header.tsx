'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function Header() {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
    setIsLoading(false);

    const handleStorageChange = () => {
      const updatedName = localStorage.getItem('userName');
      setUserName(updatedName || '');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="flex justify-center border-b-2 py-3 mb-5">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Image
          src="/logo.png"
          alt="Teste Doqr logo"
          width={126}
          height={32}
          priority
        />
        <div className="flex items-center gap-2">
          {isLoading ? (
            <>
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </>
          ) : (
            <>
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-primary text-white text-sm">
                  {userName ? getInitials(userName) : 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700">
                {userName || 'Usuário'}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
