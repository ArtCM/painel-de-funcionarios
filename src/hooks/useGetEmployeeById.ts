import { useState, useEffect, useCallback } from 'react';
import { Employee } from '@/interfaces/employee';
import { employeeService } from '@/lib/api';

interface UseGetEmployeeByIdReturn {
  employee: Employee | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGetEmployeeById = (id: number): UseGetEmployeeByIdReturn => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployee = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getById(id);
      setEmployee(data);
    } catch (err) {
      setError('Erro ao carregar funcionário');
      console.error('Erro ao carregar funcionário:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id, fetchEmployee]);

  return {
    employee,
    loading,
    error,
    refetch: fetchEmployee,
  };
};