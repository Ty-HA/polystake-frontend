'use client';

import React from 'react';
import { Coins, ArrowUpCircle, Clock, Gift } from 'lucide-react';

type RewardStats = {
    available: {
        ETH: string;
        BTC: string;
    };
    pending: {
        ETH: string;
        BTC: string;
    };
    nextReward: string;
    totalClaimed: {
        ETH: string;
        BTC: string;
    };
}

type RewardsCardProps = {
    stats: RewardStats;
    onClaimRewards: () => void;
    className?: string;
}

const RewardsCard = ({ stats, onClaimRewards, className = '' }: RewardsCardProps) => {
    return (
        <div className={className}>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Gift className="text-orange-500" />
                        Staking Rewards
                    </h2>
                    <button
                        onClick={onClaimRewards}
                        className="group relative px-4 py-2 overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300"
                    >
                        <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></div>
                        <span className="relative z-10">Claim All Rewards</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Available Rewards */}
                    <div className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-yellow-800">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-zinc-400">Available Rewards</span>
                            <ArrowUpCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-zinc-400">ETH</span>
                                <span className="text-lg font-medium text-white">{stats.available.ETH}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-zinc-400">BTC</span>
                                <span className="text-lg font-medium text-white">{stats.available.BTC}</span>
                            </div>
                        </div>
                    </div>

                    {/* Pending Rewards */}
                    <div className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-yellow-800">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-zinc-400">Pending Rewards</span>
                            <Clock className="h-5 w-5 text-orange-500" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-zinc-400">ETH</span>
                                <span className="text-lg font-medium text-white">{stats.pending.ETH}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-zinc-400">BTC</span>
                                <span className="text-lg font-medium text-white">{stats.pending.BTC}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-black/30 backdrop-blur-xl rounded-lg p-4 border border-orange-500/10">
                        <div className="text-sm text-zinc-400 mb-1">Next Reward</div>
                        <div className="text-orange-400 font-medium">
                            {new Date(stats.nextReward).toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-black/30 backdrop-blur-xl rounded-lg p-4 border border-orange-500/10">
                        <div className="text-sm text-zinc-400 mb-1">Total Claimed</div>
                        <div className="space-y-1">
                            <div className="text-white font-medium">{stats.totalClaimed.ETH} ETH</div>
                            <div className="text-white font-medium">{stats.totalClaimed.BTC} BTC</div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-xl border border-yellow-800">
                    <div className="flex items-start space-x-3">
                        <Coins className="h-5 w-5 text-orange-500 mt-0.5" />
                        <div>
                            <div className="text-sm font-medium text-white">Rewards are calculated daily</div>
                            <div className="text-sm text-zinc-400">Pending rewards become available after a 24-hour validation period</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardsCard;