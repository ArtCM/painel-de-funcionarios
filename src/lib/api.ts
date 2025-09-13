import axios from 'axios';
import { Employee } from '@/interfaces/employee';
import { EmployeeFilters } from '@/interfaces/api';

const api = axios.create({
  baseURL: 'https://api-testefrontend.qforms.com.br',
});

export interface CreateEmployeeData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  dateOfBith: string;
  typeOfHiring: string;
  status: boolean;
}

export const employeeService = {
  getAll: async (filters?: EmployeeFilters): Promise<Employee[]> => {
    const params = new URLSearchParams();
    if (filters?.name) {
      params.append('name', filters.name);
    }
    
    const response = await api.get(`/employees?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Employee> => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  getByName: async (name: string): Promise<Employee[]> => {
    const response = await api.get(`/employees?name=${encodeURIComponent(name)}`);
    return response.data;
  },

  create: async (employeeData: CreateEmployeeData): Promise<Employee> => {
    const response = await api.post('/employees', employeeData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },
};

export default api;









