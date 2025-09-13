import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { employeeService, CreateEmployeeData } from '@/lib/api';

interface UseCreateEmployeeReturn {
  createEmployee: (employeeData: CreateEmployeeData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useCreateEmployee = (): UseCreateEmployeeReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const createEmployee = async (employeeData: CreateEmployeeData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await employeeService.create(employeeData);
      router.push('/employees');
    } catch (err) {
      setError('Erro ao criar funcionário');
      console.error('Erro ao criar funcionário:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createEmployee,
    loading,
    error,
  };
};
