import { useState } from 'react';
import { employeeService, UpdateEmployeeData } from '@/lib/api';

interface UseUpdateEmployeeReturn {
  updateEmployee: (id: number, employeeData: UpdateEmployeeData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useUpdateEmployee = (): UseUpdateEmployeeReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEmployee = async (id: number, employeeData: UpdateEmployeeData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await employeeService.update(id, employeeData);
      return true;
    } catch (err) {
      setError('Erro ao atualizar funcionário');
      console.error('Erro ao atualizar funcionário:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateEmployee,
    loading,
    error,
  };
};