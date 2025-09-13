import { z } from 'zod';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

export const createEmployeeSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços')
    .transform(val => val.trim().replace(/\s+/g, ' ')),
  
  email: z
    .string()
    .email('E-mail inválido')
    .max(150, 'E-mail deve ter no máximo 150 caracteres')
    .toLowerCase()
    .transform(val => val.trim()),
  
  cpf: z
    .string()
    .regex(cpfRegex, 'CPF deve estar no formato 999.999.999-99')
    .refine(val => {
      const numbers = val.replace(/\D/g, '');
      if (numbers.length !== 11) return false;
      if (/^(\d)\1{10}$/.test(numbers)) return false;
      
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(numbers[i]) * (10 - i);
      }
      let digit1 = 11 - (sum % 11);
      if (digit1 > 9) digit1 = 0;
      
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(numbers[i]) * (11 - i);
      }
      let digit2 = 11 - (sum % 11);
      if (digit2 > 9) digit2 = 0;
      
      return parseInt(numbers[9]) === digit1 && parseInt(numbers[10]) === digit2;
    }, 'CPF inválido'),
  
  phone: z
    .string()
    .regex(phoneRegex, 'Telefone deve estar no formato (99) 99999-9999')
    .refine(val => {
      const numbers = val.replace(/\D/g, '');
      return numbers.length === 11;
    }, 'Telefone deve ter 11 dígitos'),
  
  dateOfBith: z
    .string()
    .regex(dateRegex, 'Data deve estar no formato DD/MM/AAAA')
    .refine(val => {
      const [day, month, year] = val.split('/').map(Number);
      
      if (month < 1 || month > 12) {
        return false;
      }
      
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day < 1 || day > daysInMonth) {
        return false;
      }
      
      const date = new Date(year, month - 1, day);
      const today = new Date();
      const minAge = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
      const maxAge = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
      
      return date <= minAge && date >= maxAge;
    }, 'Data inválida ou idade deve estar entre 16 e 100 anos'),
  
  typeOfHiring: z
    .enum(['CLT', 'PJ'], {
      message: 'Tipo de contratação deve ser CLT ou PJ'
    }),
  
  status: z.boolean()
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export type CreateEmployeeData = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeData = z.infer<typeof updateEmployeeSchema>;

