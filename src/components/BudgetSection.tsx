"use client";

import { MonthlyBudget } from '@/lib/types';
import { AlertCircle, TrendingUp } from 'lucide-react';

type BudgetSectionProps = {
  budgets: MonthlyBudget[];
};

export function BudgetSection({ budgets }: BudgetSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Orçamento Mensal
        </h2>
        <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
          Configurar
        </button>
      </div>

      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.planned) * 100;
          const isOverBudget = percentage > 100;
          const isWarning = percentage > 80 && percentage <= 100;

          return (
            <div key={budget.categoryId} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${budget.color}`} />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {budget.categoryName}
                  </span>
                  {isOverBudget && (
                    <AlertCircle size={16} className="text-red-500" />
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  R$ {budget.spent.toFixed(2)} / R$ {budget.planned.toFixed(2)}
                </div>
              </div>

              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full transition-all ${
                    isOverBudget
                      ? 'bg-red-500'
                      : isWarning
                      ? 'bg-yellow-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className={`font-medium ${
                  isOverBudget
                    ? 'text-red-600 dark:text-red-400'
                    : isWarning
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  {percentage.toFixed(0)}% usado
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  Restam R$ {Math.max(0, budget.planned - budget.spent).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
