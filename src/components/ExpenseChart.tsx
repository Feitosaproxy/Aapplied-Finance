"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction } from '@/lib/types';

type ExpenseChartProps = {
  transactions: Transaction[];
};

export function ExpenseChart({ transactions }: ExpenseChartProps) {
  const expenses = transactions.filter(t => t.type === 'expense' && t.isPaid);
  
  // Agrupar por categoria
  const categoryTotals = expenses.reduce((acc, transaction) => {
    const categoryName = transaction.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = {
        name: categoryName,
        value: 0,
        color: transaction.category.color.replace('bg-', '').replace('-500', ''),
      };
    }
    acc[categoryName].value += transaction.amount;
    return acc;
  }, {} as Record<string, { name: string; value: number; color: string }>);

  const data = Object.values(categoryTotals);

  const COLORS: Record<string, string> = {
    orange: '#f97316',
    blue: '#3b82f6',
    green: '#22c55e',
    red: '#ef4444',
    purple: '#a855f7',
    indigo: '#6366f1',
    pink: '#ec4899',
    gray: '#6b7280',
  };

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Despesas por Categoria</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Nenhuma despesa registrada
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Despesas por Categoria</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.color] || '#6b7280'} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `R$ ${value.toFixed(2)}`}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
