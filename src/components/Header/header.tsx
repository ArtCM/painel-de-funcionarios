import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

export default function Header() {
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
          <Avatar className="w-6 h-6">
            <AvatarFallback className="bg-primary text-white text-sm">
              {/* Name */}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">Seu Nome</span>
        </div>
      </div>
    </header>
  );
}
