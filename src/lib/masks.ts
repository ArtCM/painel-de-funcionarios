export const masks = {
  cpf: "999.999.999-99",
  phone: "99 99999-9999",
  date: "99/99/9999",
} as const;

export const formatters = {
  cpf: (value: string) => {
    if (!value) return '';
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },
  phone: (value: string) => {
    if (!value) return '';
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  },
  date: (value: string) => {
    if (!value) return '';
    
    if (value.includes('T') || value.includes('-')) {
      const date = new Date(value);
      if (isNaN(date.getTime())) return value;
      
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    }
    
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  },
  email: (value: string) => value,
};

export const validators = {
  cpf: (value: string) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value),
  phone: (value: string) => /^\d{2} \d{5}-\d{4}$/.test(value),
  date: (value: string) => /^\d{2}\/\d{2}\/\d{4}$/.test(value),
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
};

