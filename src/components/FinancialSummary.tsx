"use client";

import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

type FinancialSummaryProps = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export function FinancialSummary({ totalIncome, totalExpense, balance }: FinancialSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Receitas */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-emerald-100 text-sm font-medium">Receitas</span>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold">R$ {totalIncome.toFixed(2)}</p>
      </div>

      {/* Despesas */}
      <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-red-100 text-sm font-medium">Despesas</span>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingDown size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold">R$ {totalExpense.toFixed(2)}</p>
      </div>

      {/* Saldo */}
      <div className={`bg-gradient-to-br ${balance >= 0 ? 'from-purple-500 to-indigo-600' : 'from-gray-600 to-gray-700'} rounded-2xl p-6 text-white shadow-lg`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-100 text-sm font-medium">Saldo</span>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Wallet size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold">R$ {balance.toFixed(2)}</p>
      </div>
    </div>
  );
}
