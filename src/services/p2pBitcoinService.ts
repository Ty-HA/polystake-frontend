// src/services/p2pBitcoinService.ts

const P2P_CONFIG = {
    API_BASE_URL: 'https://api-test-holesky.p2p.org/',
    BEARER_TOKEN: process.env.NEXT_PUBLIC_P2P_BEARER_TOKEN
  };
  
  const getAuthorizationHeaders = () => ({
    'Accept': 'application/json',
    'Authorization': `Bearer ${P2P_CONFIG.BEARER_TOKEN}`,
    'Content-Type': 'application/json'
  });
  
  export const p2pBitcoinService = {
    // Récupérer les transactions par adresse
    async getTransactionsByAddress(address: string) {
      try {
        const response = await fetch(
          `${P2P_CONFIG.API_BASE_URL}/transaction/get-by-address/${address}`,
          {
            method: 'GET',
            headers: getAuthorizationHeaders()
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        console.log(response.json());
        return response.json();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`P2P BTC transaction error: ${error.message}`);
        }
        throw error;
      }
    },
  
    // Initialiser une requête de staking
    async initiateStakingRequest(data: {
      stakerPublicKey: string;
      stakerAddress: string;
      stakeAmount: number;
      stakingDuration: number;
    }) {
      try {
        const response = await fetch(`${P2P_CONFIG.API_BASE_URL}/staking/stake`, {
          method: 'POST',
          headers: getAuthorizationHeaders(),
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        console.log(response.json());
        return response.json();
        
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`P2P BTC staking error: ${error.message}`);
        }
        throw error;
      }
    },
  
    // Diffuser une transaction
    async broadcastTransaction(data: {
      transactionHex: string;
      maxFee: number;
    }) {
      try {
        const response = await fetch(`${P2P_CONFIG.API_BASE_URL}/transaction/send`, {
          method: 'POST',
          headers: getAuthorizationHeaders(),
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
  
        return response.json();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`P2P BTC broadcast error: ${error.message}`);
        }
        throw error;
      }
    }
  };