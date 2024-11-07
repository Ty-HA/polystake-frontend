// src/components/StakingForm.tsx
'use client'

import React, { useState } from 'react';
import { useP2pStaking } from '@/hooks/useP2pStaking';
import { useAccount } from 'wagmi'; // Import useAccount hook from wagmi

interface P2PStakingFormProps {
  selectedCrypto: 'ETH' | 'BTC';
}

const P2PStakingForm: React.FC<P2PStakingFormProps> = ({ selectedCrypto }) => {
  const { stake, loading, error } = useP2pStaking();
  const [amount, setAmount] = useState<string>('');
  const [duration, setDuration] = useState<string>('150');
  
  // Get account info using wagmi's useAccount
  const { address, isConnected } = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !duration) return;

    try {
      const txHash = await stake(Number(amount), Number(duration));
      console.log('Staking successful! Transaction hash:', txHash);
    } catch (err) {
      console.error('Staking failed:', err);
    }
  };

  return (
    <div className="p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-orange-500/20">
      
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
        Stake via P2P.org
      </h2>
      
      {/* Display the connected account */}
      {isConnected && (
        <p className="text-sm text-zinc-400 mb-6">
          Connected account: <span className="font-medium text-orange-400">{address}</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Stake Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 bg-black/50 border border-orange-500/20 rounded-lg"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Duration (days)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 bg-black/50 border border-orange-500/20 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg"
        >
          {loading ? 'Processing...' : `Stake your ${selectedCrypto}`}
        </button>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default P2PStakingForm;
