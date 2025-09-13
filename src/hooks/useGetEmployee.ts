import { useState, useEffect, useRef, useCallback } from 'react';
import { Employee } from '@/interfaces/employee';
import { employeeService } from '@/lib/api';

interface UseGetEmployeeReturn {
  employee: Employee | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGetEmployee = (name: string): UseGetEmployeeReturn => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastNameRef = useRef<string>('');

  const fetchEmployee = useCallback(async (): Promise<void> => {
    if (!name.trim() || name === lastNameRef.current) return;
    
    try {
      setLoading(true);
      setError(null);
      lastNameRef.current = name;
      const data = await employeeService.getByName(name);
      setEmployee(data.length > 0 ? data[0] : null);
    } catch (err) {
      setError('Erro ao carregar funcionário');
      console.error('Erro ao carregar funcionário:', err);
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  return {
    employee,
    loading,
    error,
    refetch: fetchEmployee,
  };
};









