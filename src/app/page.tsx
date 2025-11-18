"use client";

import { useState, useMemo } from 'react';
import { Transaction, Account, Goal, CreditCard as CreditCardType, MonthlyBudget } from '@/lib/types';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/lib/categories';
import { FinancialSummary } from '@/components/FinancialSummary';
import { TransactionCard } from '@/components/TransactionCard';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { ExpenseChart } from '@/components/ExpenseChart';
import { BottomNav } from '@/components/BottomNav';
import { AccountsSection } from '@/components/AccountsSection';
import { BudgetSection } from '@/components/BudgetSection';
import { GoalsSection } from '@/components/GoalsSection';
import { CreditCardsSection } from '@/components/CreditCardsSection';
import { RecurringTransactions } from '@/components/RecurringTransactions';
import { Calendar, Filter, Menu, Bell, Search, TrendingUp, TrendingDown, Crown, Sparkles, Shield, Zap, Check } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      description: 'Salário',
      amount: 5000,
      type: 'income',
      category: INCOME_CATEGORIES[0],
      date: new Date(2024, 0, 5),
      isPaid: true,
      account: 'Conta Corrente',
      isRecurring: true,
    },
    {
      id: '2',
      description: 'Aluguel',
      amount: 1200,
      type: 'expense',
      category: EXPENSE_CATEGORIES[2],
      date: new Date(2024, 0, 10),
      isPaid: true,
      account: 'Conta Corrente',
      isRecurring: true,
    },
    {
      id: '3',
      description: 'Supermercado Pão de Açúcar',
      amount: 450,
      type: 'expense',
      category: EXPENSE_CATEGORIES[0],
      date: new Date(2024, 0, 12),
      isPaid: true,
      account: 'Cartão Nubank',
    },
    {
      id: '4',
      description: 'Uber para trabalho',
      amount: 85,
      type: 'expense',
      category: EXPENSE_CATEGORIES[1],
      date: new Date(2024, 0, 15),
      isPaid: false,
      account: 'Cartão Inter',
    },
    {
      id: '5',
      description: 'Academia SmartFit',
      amount: 120,
      type: 'expense',
      category: EXPENSE_CATEGORIES[3],
      date: new Date(2024, 0, 18),
      isPaid: true,
      account: 'Conta Corrente',
      isRecurring: true,
    },
    {
      id: '6',
      description: 'Netflix',
      amount: 55.90,
      type: 'expense',
      category: EXPENSE_CATEGORIES[5],
      date: new Date(2024, 0, 20),
      isPaid: true,
      account: 'Cartão Nubank',
      isRecurring: true,
    },
    {
      id: '7',
      description: 'Freelance Design',
      amount: 800,
      type: 'income',
      category: INCOME_CATEGORIES[1],
      date: new Date(2024, 0, 22),
      isPaid: true,
      account: 'Conta Corrente',
    },
  ]);

  const [accounts] = useState<Account[]>([
    {
      id: '1',
      name: 'Conta Corrente',
      type: 'checking',
      balance: 3245.50,
      icon: '💳',
      color: 'bg-slate-600',
    },
    {
      id: '2',
      name: 'Poupança',
      type: 'savings',
      balance: 8500.00,
      icon: '🏦',
      color: 'bg-slate-700',
    },
    {
      id: '3',
      name: 'Dinheiro',
      type: 'cash',
      balance: 250.00,
      icon: '💵',
      color: 'bg-slate-500',
    },
  ]);

  const [goals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Viagem para Europa',
      targetAmount: 15000,
      currentAmount: 8500,
      deadline: new Date(2024, 11, 1),
      icon: '✈️',
      color: 'bg-slate-600',
    },
    {
      id: '2',
      name: 'Reserva de Emergência',
      targetAmount: 20000,
      currentAmount: 12000,
      deadline: new Date(2024, 5, 30),
      icon: '🛡️',
      color: 'bg-slate-700',
    },
    {
      id: '3',
      name: 'Novo Notebook',
      targetAmount: 5000,
      currentAmount: 5000,
      deadline: new Date(2024, 2, 15),
      icon: '💻',
      color: 'bg-slate-500',
    },
  ]);

  const [creditCards] = useState<CreditCardType[]>([
    {
      id: '1',
      name: 'Nubank',
      limit: 5000,
      used: 1705.90,
      closingDay: 15,
      dueDay: 25,
      color: 'bg-gradient-to-br from-slate-600 to-slate-800',
    },
    {
      id: '2',
      name: 'Inter',
      limit: 3000,
      used: 685,
      closingDay: 10,
      dueDay: 20,
      color: 'bg-gradient-to-br from-slate-500 to-slate-700',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedPlan, setSelectedPlan] = useState<'semester' | 'annual'>('semester');

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    };
    setTransactions([transaction, ...transactions]);
  };

  const handleTogglePaid = (id: string) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...t, isPaid: !t.isPaid } : t
      )
    );
  };

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income' && t.isPaid)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
      .filter((t) => t.type === 'expense' && t.isPaid)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    };
  }, [transactions]);

  const budgets: MonthlyBudget[] = useMemo(() => {
    const categorySpending = transactions
      .filter((t) => t.type === 'expense' && t.isPaid)
      .reduce((acc, t) => {
        const key = t.category.id;
        if (!acc[key]) {
          acc[key] = {
            categoryId: t.category.id,
            categoryName: t.category.name,
            spent: 0,
            color: t.category.color,
          };
        }
        acc[key].spent += t.amount;
        return acc;
      }, {} as Record<string, { categoryId: string; categoryName: string; spent: number; color: string }>);

    const budgetPlans = {
      'alimentacao': 800,
      'transporte': 300,
      'moradia': 1500,
      'saude': 200,
      'lazer': 400,
    };

    return Object.entries(categorySpending)
      .map(([id, data]) => ({
        ...data,
        planned: budgetPlans[id as keyof typeof budgetPlans] || 500,
      }))
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 5);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

  const currentMonth = format(new Date(), "MMMM 'de' yyyy", { locale: ptBR });

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {/* Premium Banner com Planos */}
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop')] bg-cover bg-center opacity-20" />
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                      <Crown className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Applied Finance Premium</h3>
                      <p className="text-amber-100 text-sm">Controle total das suas finanças</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles size={20} className="text-amber-200" />
                    <span className="text-sm font-medium">Relatórios ilimitados</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Shield size={20} className="text-amber-200" />
                    <span className="text-sm font-medium">Backup automático</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Zap size={20} className="text-amber-200" />
                    <span className="text-sm font-medium">Sincronização em nuvem</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Crown size={20} className="text-amber-200" />
                    <span className="text-sm font-medium">Suporte prioritário</span>
                  </div>
                </div>

                {/* Seletor de Planos */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setSelectedPlan('semester')}
                    className={`flex-1 p-4 rounded-xl transition-all ${
                      selectedPlan === 'semester'
                        ? 'bg-white text-amber-600 shadow-lg'
                        : 'bg-white/20 text-white backdrop-blur-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-lg">Semestral</span>
                      {selectedPlan === 'semester' && <Check size={20} />}
                    </div>
                    <div className="text-2xl font-bold mb-1">R$ 24,99</div>
                    <div className="text-xs opacity-80">6x de R$ 24,99</div>
                    <div className="text-xs opacity-60 mt-1">Total: R$ 149,94</div>
                  </button>

                  <button
                    onClick={() => setSelectedPlan('annual')}
                    className={`flex-1 p-4 rounded-xl transition-all relative ${
                      selectedPlan === 'annual'
                        ? 'bg-white text-amber-600 shadow-lg'
                        : 'bg-white/20 text-white backdrop-blur-sm'
                    }`}
                  >
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Economize 20%
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-lg">Anual</span>
                      {selectedPlan === 'annual' && <Check size={20} />}
                    </div>
                    <div className="text-2xl font-bold mb-1">R$ 19,91</div>
                    <div className="text-xs opacity-80">12x de R$ 19,91</div>
                    <div className="text-xs opacity-60 mt-1">Total: R$ 238,90/ano</div>
                  </button>
                </div>

                <button className="w-full bg-white text-amber-600 font-bold py-4 rounded-2xl hover:bg-amber-50 transition-all transform hover:scale-105 shadow-xl">
                  {selectedPlan === 'semester' 
                    ? 'Assinar Premium - 6x R$ 24,99'
                    : 'Assinar Premium - 12x R$ 19,91'
                  }
                </button>
              </div>
            </div>

            <FinancialSummary
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              balance={balance}
            />

            <AccountsSection accounts={accounts} />

            {/* Banner Secundário - Investimentos */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-2xl shadow-lg">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=300&fit=crop')] bg-cover bg-center opacity-10" />
              <div className="relative p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Comece a investir hoje</h4>
                  <p className="text-slate-300 text-sm">Planeje seu futuro financeiro com inteligência</p>
                </div>
                <button className="px-6 py-3 bg-white text-slate-800 font-semibold rounded-xl hover:bg-slate-100 transition-all whitespace-nowrap">
                  Saiba mais
                </button>
              </div>
            </div>

            <BudgetSection budgets={budgets} />

            <RecurringTransactions transactions={transactions} />

            <ExpenseChart transactions={transactions} />

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Transações Recentes
                </h2>
                <button 
                  onClick={() => setActiveTab('transactions')}
                  className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:underline"
                >
                  Ver todas
                </button>
              </div>

              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onTogglePaid={handleTogglePaid}
                  />
                ))}
              </div>
            </div>
          </>
        );

      case 'transactions':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Todas as Transações
              </h2>
              
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Search size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Filter size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-slate-700 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('income')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  filter === 'income'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <TrendingUp size={16} />
                Receitas
              </button>
              <button
                onClick={() => setFilter('expense')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  filter === 'expense'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <TrendingDown size={16} />
                Despesas
              </button>
            </div>

            <div className="space-y-3">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  Nenhuma transação encontrada
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onTogglePaid={handleTogglePaid}
                  />
                ))
              )}
            </div>
          </div>
        );

      case 'cards':
        return <CreditCardsSection cards={creditCards} />;

      case 'goals':
        return <GoalsSection goals={goals} />;

      case 'profile':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Perfil
            </h2>
            
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                U
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Usuário
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                usuario@email.com
              </p>
            </div>

            {/* Banner Premium no Perfil */}
            <div className="mb-6 relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop')] bg-cover bg-center opacity-20" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="text-white" size={28} />
                  <h3 className="text-white font-bold text-lg">Seja Premium</h3>
                </div>
                <p className="text-amber-100 text-sm mb-4">Desbloqueie todos os recursos e tenha controle total</p>
                <button className="w-full bg-white text-amber-600 font-bold py-3 rounded-xl hover:bg-amber-50 transition-all">
                  Assinar agora
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Configurações', icon: '⚙️' },
                { label: 'Notificações', icon: '🔔' },
                { label: 'Categorias', icon: '📁' },
                { label: 'Exportar Dados', icon: '📊' },
                { label: 'Ajuda e Suporte', icon: '❓' },
                { label: 'Sobre', icon: 'ℹ️' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-gray-400">›</span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6 shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold">Applied Finance</h1>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-slate-200">
            <Calendar size={18} />
            <span className="text-sm capitalize">{currentMonth}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6 pb-24">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Add Transaction Button */}
      <AddTransactionModal onAddTransaction={handleAddTransaction} />
    </div>
  );
}
