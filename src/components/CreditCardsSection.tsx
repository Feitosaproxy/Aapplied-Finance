"use client";

import { CreditCard as CreditCardType } from '@/lib/types';
import { CreditCard, Calendar, AlertTriangle } from 'lucide-react';

type CreditCardsSectionProps = {
  cards: CreditCardType[];
};

export function CreditCardsSection({ cards }: CreditCardsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <CreditCard size={24} />
          Meus Cartões
        </h2>
        <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
          + Adicionar
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const usagePercentage = (card.used / card.limit) * 100;
          const isHighUsage = usagePercentage > 80;
          const available = card.limit - card.used;

          return (
            <div
              key={card.id}
              className={`relative p-6 rounded-2xl text-white overflow-hidden ${card.color}`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Cartão de Crédito</div>
                    <div className="text-xl font-bold">{card.name}</div>
                  </div>
                  <CreditCard size={32} className="opacity-80" />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs opacity-80 mb-1">Limite disponível</div>
                    <div className="text-2xl font-bold">
                      R$ {available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        isHighUsage ? 'bg-red-400' : 'bg-white'
                      }`}
                      style={{ width: `${usagePercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      {isHighUsage && <AlertTriangle size={14} />}
                      <span className="opacity-90">
                        {usagePercentage.toFixed(0)}% usado
                      </span>
                    </div>
                    <span className="opacity-90">
                      Limite: R$ {card.limit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs opacity-90">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Fecha dia {card.closingDay}</span>
                    </div>
                    <div>
                      <span>Vence dia {card.dueDay}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
