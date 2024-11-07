// src/hooks/useP2PStaking.ts
import { useState } from 'react';
import { useAccount, useSignMessage, useWalletClient } from 'wagmi';
import { p2pService, type StakeRequest, type BroadcastRequest } from '@/services/p2pService';
import { type Hash } from 'viem';

interface StakingError {
  message: string;
  code?: number;
}

export const useP2pStaking = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { signMessageAsync } = useSignMessage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // La fonction generateKeys est maintenant une méthode interne du hook
  const generateKeys = async (): Promise<string> => {
    if (!walletClient || !address) throw new Error('Wallet not connected');
    return address;
  };

  // La fonction signTX est maintenant une méthode interne du hook
  const signTX = async (txHex: string): Promise<string> => {
    try {
      const signature = await signMessageAsync({ message: txHex });
      return signature;
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw new Error('Failed to sign transaction');
    }
  };

  const stake = async (amount: number, duration: number): Promise<Hash | undefined> => {
    if (!address || !walletClient) {
      setError('No wallet connected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const publicKey = await generateKeys();

      const stakingData: StakeRequest = {
        stakerPublicKey: publicKey,
        stakerAddress: address,
        stakeAmount: amount,
        stakingDuration: duration
      };

      const stakingResponse = await p2pService.initiateStakingRequest(stakingData);

      if (stakingResponse?.stakeTransactionHex) {
        const signedTx = await signTX(stakingResponse.stakeTransactionHex);

        if (signedTx) {
          const broadcastData: BroadcastRequest = {
            transactionHex: signedTx,
            maxFee: 1000000
          };

          const txHash = await p2pService.broadcastTransaction(broadcastData);
          return txHash as Hash;
        }
      }
    } catch (err) {
      const error = err as StakingError;
      setError(error.message || 'An unknown error occurred');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getStats = async () => {
    if (!address) return null;
    try {
      setLoading(true);
      const stats = await p2pService.getStakingInfo(address);
      return stats;
    } catch (err) {
      const error = err as StakingError;
      setError(error.message || 'Failed to fetch staking stats');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getValidatorStats = async () => {
    try {
      setLoading(true);
      const stats = await p2pService.getValidatorStats();
      return stats;
    } catch (err) {
      const error = err as StakingError;
      setError(error.message || 'Failed to fetch validator stats');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    stake,
    getStats,
    getValidatorStats,
    loading,
    error
  };
};