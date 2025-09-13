import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
  text?: string;
}

export function Loading({ className, text = 'Carregando...' }: LoadingProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader className="w-5 h-5 animate-spin text-primary" />
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}