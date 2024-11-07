'use client'

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import P2PStakingForm from './P2PStakingForm';
import { ArrowUpCircle, ArrowLeft, Coins, Clock } from 'lucide-react';
import { p2pService } from '@/services/p2pService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface StakingStats {
  totalStaked: string;
  rewards: string;
  apr: string;
  stakingPeriod: number;
}

const P2PStakingInterface: React.FC = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState<'ETH' | 'BTC'>('ETH');
  const [stakingStats, setStakingStats] = useState<StakingStats>({
    totalStaked: '0',
    rewards: '0',
    apr: '5.5',
    stakingPeriod: 0
  });

  useEffect(() => {
    const fetchStakingData = async () => {
      if (!isConnected || !address) {
        setLoading(false);
        return;
      }
      
      try {
        const stakingInfo = await p2pService.getStakingInfo(address);
        setStakingStats(stakingInfo);
      } catch (error) {
        console.error('Error fetching staking data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStakingData();
  }, [address, isConnected]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      {/* En-tête P2P */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Coins className="h-8 w-8 text-orange-500" />
            <div>
              <h2 className="text-2xl font-bold text-white">P2P.org Staking</h2>
              <p className="text-zinc-400">Professional Staking Services</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-orange-500/10 rounded-full">
            <span className="text-orange-400">Current APR: {stakingStats.apr}%</span>
          </div>
        </div>

        {/* Crypto Selector */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedCrypto('ETH')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCrypto === 'ETH'
                ? 'bg-orange-500 text-white'
                : 'bg-black/40 text-zinc-400 hover:text-white'
            }`}
          >
            Ethereum
          </button>
          <button
            onClick={() => setSelectedCrypto('BTC')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCrypto === 'BTC'
                ? 'bg-orange-500 text-white'
                : 'bg-black/40 text-zinc-400 hover:text-white'
            }`}
          >
            Bitcoin
          </button>
        </div>

        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-black/30 p-4 rounded-lg border border-orange-500/10">
              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                <ArrowUpCircle className="h-4 w-4" />
                <span>Total Staked</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {loading ? 'Loading...' : `${stakingStats.totalStaked} ${selectedCrypto}`}
              </p>
            </div>

            <div className="bg-black/30 p-4 rounded-lg border border-orange-500/10">
              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                <Coins className="h-4 w-4" />
                <span>Total Rewards</span>
              </div>
              <p className="text-2xl font-bold text-orange-400">
                {loading ? 'Loading...' : `${stakingStats.rewards} ${selectedCrypto}`}
              </p>
            </div>

            <div className="bg-black/30 p-4 rounded-lg border border-orange-500/10">
              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                <Clock className="h-4 w-4" />
                <span>Staking Period</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {loading ? 'Loading...' : `${stakingStats.stakingPeriod} Days`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Formulaire de Staking */}
      <P2PStakingForm selectedCrypto={selectedCrypto} />

      {/* Lien vers la documentation */}
      <div className="text-center mt-6">
        <Link
          href="https://p2p.org/networks/ethereum"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 hover:text-orange-300 transition-colors text-sm inline-flex items-center gap-2"
        >
          Learn more about P2P.org Staking
          <ArrowUpCircle className="h-4 w-4 rotate-45" />
        </Link>
      </div>
    </div>
  );
};

export default P2PStakingInterface;