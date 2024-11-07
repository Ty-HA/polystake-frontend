// src/types/staking.ts

export interface StakingStats {
    totalStaked: {
        ETH: string;
        BTC: string;
    };
    totalRewards: {
        ETH: string;
        BTC: string;
    };
    averageApy: {
        ETH: string;
        BTC: string;
    };
}

export interface StakingFormData {
    cryptoType: 'ETH' | 'BTC';
    amount: string;
}

export interface UserStakingData {
    address: string;
    transactions: Transaction[];
    stats: StakingStats;
}

export interface StakingConstants {
    minimumStake: {
        ETH: string;
        BTC: string;
    };
    unlockPeriod: number;
    rewardDistributionInterval: number;
    maxStakeAmount: {
        ETH: string;
        BTC: string;
    };
}

export type StakingStatus = 'active' | 'pending' | 'completed';


export type Transaction = {
    id: string;
    type: "stake" | "claim" | "unstake";
    asset: "ETH" | "BTC";
    amount: string;
    status: "completed" | "pending" | "failed";
    timestamp: string;
    hash: string;
}

export type RewardStats = {
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