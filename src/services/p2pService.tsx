// src/services/p2pService.ts
import axios from 'axios';
import { P2P_CONFIG } from '@/config/p2p';

interface StakingInfo {
  totalStaked: string;
  rewards: string;
  apr: string;
  stakingPeriod: number;
}

interface ValidatorStats {
  totalValidators: number;
  activeValidators: number;
  uptime: number;
  performance: number;
  totalStaked: string;
  averageReward: string;
  successRate: number;
}

interface ApiResponse<T> {
  success: boolean;
  result: T;
  error?: {
    code: number;
    message: string;
  };
}

interface ApiError {
  response?: {
    data: unknown;
    status: number;
    statusText: string;
  };
  message: string;
}

const getAuthorizationHeaders = () => ({
  accept: 'application/json',
  authorization: P2P_CONFIG.P2P_AUTH_TOKEN,
  'content-type': 'application/json'
});

export interface StakeRequest {
  stakerPublicKey: string;
  stakerAddress: string;
  stakeAmount: number;
  stakingDuration: number;
}

export interface BroadcastRequest {
  transactionHex: string;
  maxFee: number;
}

export interface StakingResponse {
  stakeTransactionHex: string;
  transactionId: string;
}

export interface BroadcastResponse {
  transactionHash: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export const p2pService = {
  async initiateStakingRequest(data: StakeRequest): Promise<StakingResponse> {
    try {
      const response = await axios.post<ApiResponse<StakingResponse>>(
        `${P2P_CONFIG.P2P_API_BASE_URL}/staking/stake`,
        data,
        { headers: getAuthorizationHeaders() }
      );
      return response.data.result;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error initiating staking request:',
        apiError.response ? apiError.response.data : apiError.message
      );
      throw error;
    }
  },

  async broadcastTransaction(data: BroadcastRequest): Promise<string> {
    try {
      const response = await axios.post<ApiResponse<BroadcastResponse>>(
        `${P2P_CONFIG.P2P_API_BASE_URL}/transaction/send`,
        data,
        { headers: getAuthorizationHeaders() }
      );
      return response.data.result.transactionHash;
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error broadcasting transaction:',
        apiError.response ? apiError.response.data : apiError.message
      );
      throw error;
    }
  },

  async getStakingInfo(address: string): Promise<StakingInfo> {
    try {
      const response = await axios.get<ApiResponse<StakingInfo>>(
        `${P2P_CONFIG.P2P_API_BASE_URL}/staking/info/${address}`,
        { headers: getAuthorizationHeaders() }
      );
      return {
        totalStaked: response.data.result.totalStaked || '0',
        rewards: response.data.result.rewards || '0',
        apr: response.data.result.apr || '5.5',
        stakingPeriod: response.data.result.stakingPeriod || 0
      };
    } catch (error) {
      console.error('Error fetching staking info:', error);
      return {
        totalStaked: '0',
        rewards: '0',
        apr: '5.5',
        stakingPeriod: 0
      };
    }
  },

  async getValidatorStats(): Promise<ValidatorStats | null> {
    try {
      const response = await axios.get<ApiResponse<ValidatorStats>>(
        `${P2P_CONFIG.P2P_API_BASE_URL}/validator/stats`,
        { headers: getAuthorizationHeaders() }
      );
      return response.data.result;
    } catch (error) {
      console.error('Error fetching validator stats:', error);
      return null;
    }
  }
};