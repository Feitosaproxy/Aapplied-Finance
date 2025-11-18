// Types for Mobills Clone
export type TransactionType = 'income' | 'expense';

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
};

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: Date;
  isPaid: boolean;
  account?: string;
  isRecurring?: boolean;
  notes?: string;
};

export type MonthlyBudget = {
  categoryId: string;
  categoryName: string;
  planned: number;
  spent: number;
  color: string;
};

export type Account = {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'cash';
  balance: number;
  icon: string;
  color: string;
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  icon: string;
  color: string;
};

export type CreditCard = {
  id: string;
  name: string;
  limit: number;
  used: number;
  closingDay: number;
  dueDay: number;
  color: string;
};
