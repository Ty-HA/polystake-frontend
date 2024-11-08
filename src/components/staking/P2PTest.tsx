'use client'

import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Search, WalletIcon } from 'lucide-react';
import { useAccount } from 'wagmi';

interface TestResult {
  test: string;
  status: 'success' | 'error';
  data?: unknown;
  error?: string;
}

export interface P2PTestModuleProps {
  className?: string;
  defaultAddress?: string;
}

const P2PTest: React.FC<P2PTestModuleProps> = ({
  className = '',
  defaultAddress = ''
}) => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [customAddress, setCustomAddress] = useState(defaultAddress);

  // Utiliser l'adresse du wallet si connecté, sinon utiliser l'adresse personnalisée
  const currentAddress = isConnected ? address : customAddress;

  const API_CONFIG = {
    BASE_URL: 'https://api.p2p.org/api/v1/babylon-btc/testnet',
    BEARER_TOKEN: process.env.NEXT_PUBLIC_P2P_BEARER_TOKEN
  };

  // Mettre à jour l'adresse personnalisée quand l'adresse du wallet change
  useEffect(() => {
    if (isConnected && address) {
      setCustomAddress(address);
    }
  }, [address, isConnected]);

  const runTest = async () => {
    if (!currentAddress?.trim()) {
      setError('Please connect your wallet or enter a BTC address');
      return;
    }

    setLoading(true);
    setError(null);
    setTestResults([]);

    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/transaction/get-by-address/${currentAddress}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.BEARER_TOKEN}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setTestResults([{
        test: 'Get Transactions by Address',
        status: 'success',
        data: data
      }]);
    } catch (err) {
      setTestResults([{
        test: 'Get Transactions by Address',
        status: 'error',
        error: err instanceof Error ? err.message : 'An unknown error occurred'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 space-y-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-orange-500/20 ${className}`}>
      <h2 className="text-xl font-bold text-orange-400 flex items-center gap-2">
        <Search className="w-6 h-6" />
        P2P Transaction Lookup
      </h2>
      <h5 className="text-zinc-500 text-sm">https://api.p2p.org/api/v1/babylon-btc/testnet/transaction/get-by-address/{currentAddress}</h5>
      
      <div className="bg-black/20 p-4 rounded-lg">
        <h3 className="font-medium mb-2 text-yellow-800">Configuration Status</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white">
            <div className={`w-2 h-2 rounded-full ${API_CONFIG.BEARER_TOKEN ? 'bg-green-500' : 'bg-red-500'}`} />
            Bearer Token: {API_CONFIG.BEARER_TOKEN ? 'Configured' : 'Missing'}
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'}`} />
            Wallet Status: {isConnected ? 'Connected' : 'Not Connected'}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {!isConnected && (
          <>
            <label htmlFor="address" className="block text-sm font-medium text-zinc-400">
              Custom Address
            </label>
            <input
              id="address"
              type="text"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="text-yellow-800 w-full p-3 bg-black/50 border border-orange-500/20 rounded-lg text-sm"
              placeholder="Enter address or connect wallet"
            />
          </>
        )}
        
        {isConnected && (
          <div className="flex items-center gap-2 p-3 bg-black/50 border border-orange-500/20 rounded-lg">
            <WalletIcon className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-zinc-400">Connected Address:</span>
            <span className="text-sm text-yellow-800 font-mono">{address}</span>
          </div>
        )}
      </div>
      
      <button 
        onClick={runTest}
        disabled={loading}
        className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          'Looking up transactions...'
        ) : (
          <>
            Lookup Transactions
            <Search className="w-4 h-4" />
          </>
        )}
      </button>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {testResults.map((result, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${
              result.status === 'success' 
                ? 'border-green-500/20 bg-green-500/10' 
                : 'border-red-500/20 bg-red-500/10'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {result.status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              <h3 className="font-medium">{result.test}</h3>
            </div>
            
            {result.status === 'success' ? (
              <pre className="text-sm overflow-auto p-2 bg-black/20 rounded">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            ) : (
              <p className="text-red-400">{result.error}</p>
            )}
          </div>
        ))}
      </div>

      <div className="text-xs text-zinc-500">
        Note: This endpoint requires a valid BTC address
      </div>
    </div>
  );
};

export default P2PTest;