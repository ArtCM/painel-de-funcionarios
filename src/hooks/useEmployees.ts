import { useState, useEffect, useCallback, useRef } from 'react';
import { Employee } from '@/interfaces/employee';
import { employeeService } from '@/lib/api';
import { EmployeeFilters } from '@/interfaces/api';

let employeesCache: Employee[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 10000;

interface UseEmployeesReturn {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useEmployees = (filters?: EmployeeFilters): UseEmployeesReturn => {
  const [employees, setEmployees] = useState<Employee[]>(employeesCache || []);
  const [loading, setLoading] = useState(!employeesCache);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  const fetchEmployees = useCallback(async (forceRefresh = false): Promise<void> => {
    const now = Date.now();
    if (!forceRefresh && employeesCache && (now - lastFetchTime) < CACHE_DURATION) {
      setEmployees(employeesCache);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAll(filters);
      setEmployees(data);
      employeesCache = data;
      lastFetchTime = now;
    } catch (err) {
      setError('Erro ao carregar funcionários');
      console.error('Erro ao carregar funcionários:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchEmployees();
      hasFetchedRef.current = true;
    }
  }, [fetchEmployees]);

  return {
    employees,
    loading,
    error,
    refetch: () => fetchEmployees(true),
  };
};











