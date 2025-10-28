// app/worker/wallet/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Transaction = {
  id: number;
  type: string;
  amount: number;
  description: string;
  balanceAfter: number;
  createdAt: string;
};

export default function WorkerWalletPage() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [transactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const response = await fetch('/api/wallet/balance');
      const data = await response.json();
      
      if (data.wallet) {
        setBalance(data.wallet.balance || 0);
        setTotalEarnings(data.wallet.totalEarnings || 0);
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F9FAFB] dark:bg-[#101922]">
      
      {/* Header */}
      <header className="bg-white dark:bg-[#1F2937] shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] dark:hover:bg-[#101922]"
          >
            <span className="material-symbols-outlined text-[#6B7280] dark:text-[#9CA3AF]">
              arrow_back
            </span>
          </button>
          <h2 className="text-lg font-bold text-[#1F2937] dark:text-gray-100">
            My Wallet
          </h2>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4">
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6]"></div>
          </div>
        ) : (
          <>
            {/* Balance Card */}
            <div className="bg-linear-to-br from-[#3B82F6] to-[#60A5FA] rounded-2xl shadow-lg p-6 mb-6 text-white">
              <p className="text-white/80 text-sm mb-2">Available Balance</p>
              <h1 className="text-4xl font-bold mb-4">₹{balance.toLocaleString()}</h1>
              
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <p className="text-white/80">Total Earnings</p>
                  <p className="font-semibold">₹{totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => alert('Withdrawal feature coming soon!')}
                className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
              >
                <span className="material-symbols-outlined text-[#3B82F6] text-3xl">account_balance</span>
                <span className="text-sm font-semibold text-[#1F2937] dark:text-gray-100">Withdraw</span>
              </button>
              
              <button
                onClick={() => router.push('/worker/dashboard')}
                className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
              >
                <span className="material-symbols-outlined text-[#3B82F6] text-3xl">work</span>
                <span className="text-sm font-semibold text-[#1F2937] dark:text-gray-100">Find Jobs</span>
              </button>
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-[#1F2937] dark:text-gray-100 mb-4">
                Transaction History
              </h3>
              
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-3 block">
                    receipt_long
                  </span>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF]">
                    No transactions yet
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#101922]">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          txn.type === 'credit' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                        }`}>
                          <span className={`material-symbols-outlined ${
                            txn.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {txn.type === 'credit' ? 'arrow_downward' : 'arrow_upward'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[#1F2937] dark:text-gray-100 text-sm">
                            {txn.description}
                          </p>
                          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                            {new Date(txn.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          txn.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                        </p>
                        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                          Balance: ₹{txn.balanceAfter}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </main>
    </div>
  );
}
