import { Category } from './types';

export const EXPENSE_CATEGORIES: Category[] = [
  { id: '1', name: 'Alimentação', icon: '🍔', color: 'bg-orange-500', type: 'expense' },
  { id: '2', name: 'Transporte', icon: '🚗', color: 'bg-blue-500', type: 'expense' },
  { id: '3', name: 'Moradia', icon: '🏠', color: 'bg-green-500', type: 'expense' },
  { id: '4', name: 'Saúde', icon: '💊', color: 'bg-red-500', type: 'expense' },
  { id: '5', name: 'Lazer', icon: '🎮', color: 'bg-purple-500', type: 'expense' },
  { id: '6', name: 'Educação', icon: '📚', color: 'bg-indigo-500', type: 'expense' },
  { id: '7', name: 'Compras', icon: '🛍️', color: 'bg-pink-500', type: 'expense' },
  { id: '8', name: 'Outros', icon: '📦', color: 'bg-gray-500', type: 'expense' },
];

export const INCOME_CATEGORIES: Category[] = [
  { id: '9', name: 'Salário', icon: '💰', color: 'bg-emerald-500', type: 'income' },
  { id: '10', name: 'Freelance', icon: '💼', color: 'bg-teal-500', type: 'income' },
  { id: '11', name: 'Investimentos', icon: '📈', color: 'bg-cyan-500', type: 'income' },
  { id: '12', name: 'Outros', icon: '💵', color: 'bg-lime-500', type: 'income' },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
