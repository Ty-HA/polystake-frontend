// components/staking/P2PStakingCard.tsx
'use client'

import React, { useState } from 'react';
import { useP2pStaking } from '@/hooks/useP2pStaking';
import { Coins } from 'lucide-react';

const P2PStakingCard = () => {
  const { stake, loading, error } = useP2pStaking();
  const [amount, setAmount] = useState<string>('');

  const handleP2PStake = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const txHash = await stake(Number(amount), 150); // 150 jours par défaut
      console.log('P2P Staking successful:', txHash);
    } catch (err) {
      console.error('P2P Staking failed:', err);
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-orange-500/20 shadow-xl shadow-orange-900/10">
      <div className="p-6">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Coins className="text-orange-500 h-6 w-6" />
            <h2 className="text-xl font-bold text-white">P2P.org Staking</h2>
          </div>
          <div className="px-3 py-1 bg-orange-500/10 rounded-full">
            <span className="text-orange-400 text-sm">Powered by P2P.org</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/30 p-4 rounded-lg border border-orange-500/10">
            <span className="text-zinc-400 text-sm">APR</span>
            <p className="text-xl font-bold text-orange-400">5.5%</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg border border-orange-500/10">
            <span className="text-zinc-400 text-sm">Min. Stake</span>
            <p className="text-xl font-bold text-white">32 ETH</p>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleP2PStake} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Stake Amount (ETH)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full p-3 bg-black/50 border border-orange-500/20 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white"
              />
              <span className="absolute right-3 top-3 text-orange-500 font-medium">
                ETH
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-orange-500/5 border border-orange-500/10 rounded-lg p-4">
            <h3 className="text-sm font-medium text-orange-400 mb-2">P2P Staking Benefits</h3>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li>• Professional Node Operation</li>
              <li>• Secure Infrastructure</li>
              <li>• 24/7 Support</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading || !amount}
            className="w-full group relative px-6 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></div>
            <span>Stake with P2P.org</span>
          </button>

          {error && (
            <div className="text-red-400 text-sm mt-2 bg-red-500/10 p-3 rounded-lg">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default P2PStakingCard;