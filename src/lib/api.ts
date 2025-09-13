import axios from 'axios';
import { Employee } from '@/interfaces/employee';

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
  getAll: async (): Promise<Employee[]> => {
    const response = await api.get('/employees');
    return response.data;
  },

  create: async (employeeData: CreateEmployeeData): Promise<Employee> => {
    const response = await api.post('/employees', employeeData);
    return response.data;
  },
};

export default api;

