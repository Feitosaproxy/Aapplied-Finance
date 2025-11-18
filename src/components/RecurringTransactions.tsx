"use client";

import { Transaction } from '@/lib/types';
import { Repeat, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type RecurringTransactionsProps = {
  transactions: Transaction[];
};

export function RecurringTransactions({ transactions }: RecurringTransactionsProps) {
  const recurringTransactions = transactions.filter(t => t.isRecurring);

  if (recurringTransactions.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Repeat size={20} />
          Transações Recorrentes
        </h2>
        <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
          Gerenciar
        </button>
      </div>

      <div className="space-y-3">
        {recurringTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${transaction.category.color}`}>
                <span className="text-xl">{transaction.category.icon}</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {transaction.description}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Calendar size={12} />
                  Todo dia {format(transaction.date, 'd')}
                </div>
              </div>
            </div>
            <div className={`font-semibold ${
              transaction.type === 'income'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
