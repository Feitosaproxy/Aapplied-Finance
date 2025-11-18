"use client";

import { Goal } from '@/lib/types';
import { Target, Calendar, TrendingUp } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type GoalsSectionProps = {
  goals: Goal[];
};

export function GoalsSection({ goals }: GoalsSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Target size={20} />
          Objetivos Financeiros
        </h2>
        <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
          + Novo
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100;
          const daysLeft = differenceInDays(goal.deadline, new Date());
          const isCompleted = percentage >= 100;

          return (
            <div
              key={goal.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                isCompleted
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${goal.color}`}>
                    <span className="text-2xl">{goal.icon}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {goal.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar size={14} />
                      {format(goal.deadline, "dd 'de' MMMM", { locale: ptBR })}
                      {!isCompleted && daysLeft > 0 && (
                        <span className="ml-1">({daysLeft} dias)</span>
                      )}
                    </div>
                  </div>
                </div>
                {isCompleted && (
                  <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Concluído!
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full transition-all ${
                      isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                    {percentage.toFixed(1)}% alcançado
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Faltam R$ {Math.max(0, goal.targetAmount - goal.currentAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
