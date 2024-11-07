'use client';

import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import RewardsCard from './RewardsCard';
import TransactionHistory from './TransactionHistory';
import type { Transaction } from '@/types/staking';

const StakingInterface = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('ETH');
  const [amount, setAmount] = useState('');

  const demoRewardStats = {
    available: {
      ETH: "0.125",
      BTC: "0.0025"
    },
    pending: {
      ETH: "0.045",
      BTC: "0.0012"
    },
    nextReward: "2024-03-16T10:00:00.000Z",
    totalClaimed: {
      ETH: "1.254",
      BTC: "0.0234"
    }
  };

  const demoTransactions: Transaction[] = [
    {
      id: "1",
      type: "stake",
      asset: "ETH",
      amount: "2.5",
      status: "completed",
      timestamp: "2024-03-15T10:00:00.000Z",
      hash: "0x1234567890abcdef1234567890abcdef12345678"
    },
    {
      id: "2",
      type: "claim",
      asset: "ETH",
      amount: "0.125",
      status: "pending",
      timestamp: "2024-03-15T09:00:00.000Z",
      hash: "0xabcdef1234567890abcdef1234567890abcdef12"
    },
    {
      id: "3",
      type: "unstake",
      asset: "ETH",
      amount: "1.0",
      status: "completed",
      timestamp: "2024-03-14T10:00:00.000Z",
      hash: "0x9876543210fedcba9876543210fedcba98765432"
    },
    {
      id: "4",
      type: "stake",
      asset: "BTC",
      amount: "0.5",
      status: "failed",
      timestamp: "2024-03-13T15:30:00.000Z",
      hash: "0xaabbcc1234567890aabbcc1234567890aabbcc12"
    },
    {
      id: "5",
      type: "claim",
      asset: "ETH",
      amount: "0.075",
      status: "completed",
      timestamp: "2024-03-12T08:45:00.000Z",
      hash: "0xddeeff1234567890ddeeff1234567890ddeeff12"
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
    <div className="min-h-screen backdrop-blur-3xl bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Main Staking Section */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-yellow-800 overflow-hidden shadow-xl shadow-orange-900/10">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent flex items-center gap-2">
              Stake Your Assets
              <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
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
                    className="w-full p-3 bg-black/50 border border-orange-500/20 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white backdrop-blur-xl transition-all duration-200 hover:border-orange-700"
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
                      className="w-full p-3 bg-black/50 border border-yellow-800 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white backdrop-blur-xl transition-all duration-200 hover:border-orange-700"
                    />
                    <span className="absolute right-3 top-3 text-orange-500 font-medium">
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
                  <span className="relative z-10">Stake Now</span>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              <div className="relative bg-gradient-to-br from-black/60 to-black/40 p-6 rounded-lg space-y-4 border border-orange-500/20 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent rounded-lg" />
                <h3 className="font-semibold text-white relative">Staking Information</h3>
                <div className="space-y-3 relative">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Annual Percentage Yield</span>
                    <span className="font-medium text-orange-400">
                      {selectedCrypto === 'ETH' ? '5.5%' : '4.2%'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Minimum Stake</span>
                    <span className="font-medium text-orange-300">
                      {selectedCrypto === 'ETH' ? '0.1 ETH' : '0.01 BTC'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Unlock Period</span>
                    <span className="font-medium text-orange-300">7 days</span>
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
          className="bg-black/40 backdrop-blur-xl border border-orange-500/20 shadow-xl shadow-orange-900/10"
        />

        {/* Transaction History */}
        <TransactionHistory 
          transactions={demoTransactions}
          className="bg-black/40 backdrop-blur-xl border border-orange-500/20 shadow-xl shadow-orange-900/10"
        />

        {/* Info Alert */}
        <Alert className="bg-black/40 backdrop-blur-xl border border-orange-500/20">
          <AlertCircle className="h-4 w-4 text-orange-400" />
          <AlertTitle className="text-zinc-200">Important Information</AlertTitle>
          <AlertDescription className="text-zinc-400">
            Staking rewards are calculated daily and distributed weekly. There is a 7-day unlock period for unstaking your assets.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

export default StakingInterface;