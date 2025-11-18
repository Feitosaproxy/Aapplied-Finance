"use client";

import { Account } from '@/lib/types';
import { Wallet, CreditCard, PiggyBank, Banknote, ChevronRight } from 'lucide-react';

type AccountsSectionProps = {
  accounts: Account[];
};

export function AccountsSection({ accounts }: AccountsSectionProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'checking': return Wallet;
      case 'credit': return CreditCard;
      case 'savings': return PiggyBank;
      case 'cash': return Banknote;
      default: return Wallet;
    }
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Contas
        </h2>
        <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
          Ver todas
        </button>
      </div>

      <div className="mb-4 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl text-white">
        <div className="text-sm opacity-90 mb-1">Saldo Total</div>
        <div className="text-2xl font-bold">
          R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
      </div>

      <div className="space-y-3">
        {accounts.map((account) => {
          const Icon = getIcon(account.type);
          
          return (
            <div
              key={account.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${account.color}`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {account.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    R$ {account.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
