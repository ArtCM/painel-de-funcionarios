import { useState } from 'react';
import { employeeService } from '@/lib/api';

interface UseDeleteEmployeeReturn {
  deleteEmployee: (id: number) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useDeleteEmployee = (): UseDeleteEmployeeReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteEmployee = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await employeeService.delete(id);
      return true;
    } catch (err) {
      setError('Erro ao excluir funcionário');
      console.error('Erro ao excluir funcionário:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteEmployee,
    loading,
    error,
  };
};
