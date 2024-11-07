'use client';

import React, { useState } from 'react';
import { AlertCircle, ArrowUpCircle, Clock, Coins } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import RewardsCard from './RewardsCard';
import TransactionHistory from './TransactionHistory';

const StakingInterface = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('ETH');
  const [amount, setAmount] = useState('');
  
  // Demo data for rewards
  const demoRewardStats = {
    available: {
      ETH: "0.125",
      BTC: "0.0025"
    },
    pending: {
      ETH: "0.045",
      BTC: "0.0012"
    },
    nextReward: new Date(Date.now() + 86400000).toISOString(),
    totalClaimed: {
      ETH: "1.254",
      BTC: "0.0234"
    }
  };

  // Demo data for transactions
  const demoTransactions = [
    {
      id: "1",
      type: "stake",
      asset: "ETH",
      amount: "2.5",
      status: "completed",
      timestamp: new Date().toISOString(),
      hash: "0x1234567890abcdef1234567890abcdef12345678"
    },
    {
      id: "2",
      type: "claim",
      asset: "ETH",
      amount: "0.125",
      status: "pending",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      hash: "0xabcdef1234567890abcdef1234567890abcdef12"
    }
  ];

  const handleStake = () => {
    console.log(`Staking ${amount} ${selectedCrypto}`);
    setAmount('');
  };

  const handleClaimRewards = () => {
    console.log('Claiming rewards...');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Main Staking Section */}
        <div className="bg-zinc-900 rounded-2xl border border-yellow-800 overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Stake Your Assets
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-400">
                    Select Asset
                  </label>
                  <select
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                    className="w-full p-3 bg-zinc-800 border border-yellow-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white"
                  >
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="BTC">Bitcoin (BTC)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-400">
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full p-3 bg-zinc-800 border border-yellow-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white"
                    />
                    <span className="absolute right-3 top-3 text-zinc-400">
                      {selectedCrypto}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleStake}
                  disabled={!amount}
                  className="group relative w-full px-6 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></div>
                  <span>Stake Now</span>
                </button>
              </div>

              <div className="bg-zinc-800/50 p-6 rounded-lg space-y-4 border border-yellow-700">
                <h3 className="font-semibold text-zinc-200">Staking Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Annual Percentage Yield</span>
                    <span className="font-medium text-orange-400">
                      {selectedCrypto === 'ETH' ? '5.5%' : '4.2%'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Minimum Stake</span>
                    <span className="font-medium text-zinc-200">
                      {selectedCrypto === 'ETH' ? '0.1 ETH' : '0.01 BTC'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Unlock Period</span>
                    <span className="font-medium text-zinc-200">7 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <RewardsCard 
          stats={demoRewardStats}
          onClaimRewards={handleClaimRewards}
        />

        {/* Transaction History */}
        <TransactionHistory 
          transactions={demoTransactions}
        />

        {/* Info Alert */}
        <Alert className="bg-zinc-900 border-yellow-800">
          <AlertCircle className="h-4 w-4 text-orange-400" />
          <AlertTitle className="text-zinc-200">Important Information</AlertTitle>
          <AlertDescription className="text-zinc-400">
            Staking rewards are calculated daily and distributed weekly. There is a 7-day unlock period for unstaking your assets.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default StakingInterface;