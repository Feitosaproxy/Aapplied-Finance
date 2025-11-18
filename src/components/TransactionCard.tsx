"use client";

import { Transaction } from '@/lib/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, X } from 'lucide-react';

type TransactionCardProps = {
  transaction: Transaction;
  onTogglePaid: (id: string) => void;
};

export function TransactionCard({ transaction, onTogglePaid }: TransactionCardProps) {
  const isIncome = transaction.type === 'income';
  
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
      <div className="flex items-center gap-3 flex-1">
        <div className={`w-12 h-12 rounded-xl ${transaction.category.color} flex items-center justify-center text-2xl`}>
          {transaction.category.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {transaction.description}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{transaction.category.name}</span>
            <span>•</span>
            <span>{format(transaction.date, "dd 'de' MMM", { locale: ptBR })}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className={`font-bold text-lg ${isIncome ? 'text-emerald-600' : 'text-red-600'}`}>
            {isIncome ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
          </p>
        </div>
        
        <button
          onClick={() => onTogglePaid(transaction.id)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            transaction.isPaid
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
          }`}
        >
          {transaction.isPaid ? <Check size={16} /> : <X size={16} />}
        </button>
      </div>
    </div>
  );
}
