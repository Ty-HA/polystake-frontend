export interface StakingTransaction {
    id: number;
    type: 'ETH' | 'BTC';
    amount: string;
    status: 'active' | 'pending' | 'completed';
    apy: string;
    date: string;
    rewards: string;
}

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
    transactions: StakingTransaction[];
    stats: StakingStats;
}

export interface StakingConstants {
    minimumStake: {
        ETH: string;
        BTC: string;
    };
    unlockPeriod: number; // in days
    rewardDistributionInterval: number; // in days
    maxStakeAmount: {
        ETH: string;
        BTC: string;
    };
}

export type StakingStatus = 'active' | 'pending' | 'completed';