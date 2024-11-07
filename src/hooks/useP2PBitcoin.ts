// src/hooks/useP2PBitcoin.ts
import { useState } from 'react';
import { p2pBitcoinService } from '../services/p2pBitcoinService';

export const useP2PBitcoin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTransactions = async (address: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await p2pBitcoinService.getTransactionsByAddress(address);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const initiateStaking = async (params: {
    stakerPublicKey: string;
    stakerAddress: string;
    stakeAmount: number;
    stakingDuration: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      return await p2pBitcoinService.initiateStakingRequest(params);
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const broadcastTx = async (params: { transactionHex: string; maxFee: number }) => {
    try {
      setLoading(true);
      setError(null);
      return await p2pBitcoinService.broadcastTransaction(params);
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getTransactions,
    initiateStaking,
    broadcastTx,
    loading,
    error
  };
};