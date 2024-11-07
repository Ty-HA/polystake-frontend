import React from 'react';
import { Coins, ArrowUpCircle, Clock, Gift } from 'lucide-react';

interface RewardStats {
    available: {
        ETH: string;
        BTC: string;
    };
    pending: {
        ETH: string;
        BTC: string;
    };
    nextReward: string; // timestamp
    totalClaimed: {
        ETH: string;
        BTC: string;
    };
}

interface RewardsCardProps {
    stats: RewardStats;
    onClaimRewards: () => void;
}

const RewardsCard: React.FC<RewardsCardProps> = ({ stats, onClaimRewards }) => {
    return (
        <div className="bg-zinc-900 rounded-2xl border border-yellow-800 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Gift className="text-orange-500" />
                    Staking Rewards
                </h2>
                <button
                    onClick={onClaimRewards}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200"
                >
                    Claim All Rewards
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Available Rewards */}
                <div className="bg-zinc-800/50 rounded-xl p-4 border border-yellow-700">
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
                <div className="bg-zinc-800/50 rounded-xl p-4 border border-yellow-700">
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
                <div className="bg-zinc-800/30 rounded-lg p-4">
                    <div className="text-sm text-zinc-400 mb-1">Next Reward</div>
                    <div className="text-orange-400 font-medium">
                        {new Date(stats.nextReward).toLocaleString()}
                    </div>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-4">
                    <div className="text-sm text-zinc-400 mb-1">Total Claimed</div>
                    <div className="space-y-1">
                        <div className="text-white font-medium">{stats.totalClaimed.ETH} ETH</div>
                        <div className="text-white font-medium">{stats.totalClaimed.BTC} BTC</div>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-start space-x-3">
                    <Coins className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-white">Rewards are calculated daily</div>
                        <div className="text-sm text-zinc-400">Pending rewards become available after a 24-hour validation period</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardsCard;