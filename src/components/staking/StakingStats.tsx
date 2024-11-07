'use client';

import React from 'react';
import type { StakingStats as StakingStatsType } from '../../types/staking';
import { TrendingUp, Coins, Clock } from 'lucide-react';

interface StakingStatsProps {
    stats: StakingStatsType;
}

const StakingStats: React.FC<StakingStatsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900 rounded-2xl border border-yellow-800 p-6">
                <div className="flex items-center space-x-4">
                    <div className="bg-orange-500/10 p-3 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-400">Total Value Staked</p>
                        <div className="space-y-1 mt-1">
                            <p className="font-medium text-white">{stats.totalStaked.ETH} ETH</p>
                            <p className="font-medium text-white">{stats.totalStaked.BTC} BTC</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl border border-yellow-800 p-6">
                <div className="flex items-center space-x-4">
                    <div className="bg-orange-500/10 p-3 rounded-lg">
                        <Coins className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-400">Total Rewards Earned</p>
                        <div className="space-y-1 mt-1">
                            <p className="font-medium text-white">{stats.totalRewards.ETH} ETH</p>
                            <p className="font-medium text-white">{stats.totalRewards.BTC} BTC</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl border border-yellow-800 p-6">
                <div className="flex items-center space-x-4">
                    <div className="bg-orange-500/10 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-400">Average APY</p>
                        <div className="space-y-1 mt-1">
                            <p className="font-medium text-orange-400">{stats.averageApy.ETH} ETH</p>
                            <p className="font-medium text-orange-400">{stats.averageApy.BTC} BTC</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StakingStats;