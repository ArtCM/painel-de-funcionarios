import { useState, useEffect, useCallback, useMemo } from 'react';
import { Employee } from '@/interfaces/employee';
import { employeeService } from '@/lib/api';

interface UseEmployeesReturn {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setSearchTerm: (term: string) => void;
}

export const useEmployees = (): UseEmployeesReturn => {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAll();
      setAllEmployees(data);
    } catch (err) {
      setError('Erro ao carregar funcionários');
      console.error('Erro ao carregar funcionários:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return allEmployees;
    
    const term = searchTerm.toLowerCase();
    return allEmployees.filter(employee => 
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.cpf.includes(term) ||
      employee.phone.includes(term) ||
      employee.dateOfBith.includes(term)
    );
  }, [allEmployees, searchTerm]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return {
    employees: filteredEmployees,
    loading,
    error,
    refetch: fetchEmployees,
    setSearchTerm,
  };
};






























