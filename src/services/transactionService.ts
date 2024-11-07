// src/services/transactionService.ts

interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    blockNumber: number;
    timestamp: number;
  }
  
  interface TransactionStore {
    transactions: Transaction[];
    lastUpdate: number;
  }
  
  const API_CONFIG = {
    BASE_URL: 'https://api-test-holesky.p2p.org/testnet',
    API_KEY: '2C45IFhxN83nwrx5yyX64yDX6O8Ov'
  };
  
  // In-memory store for transactions
  let store: TransactionStore = {
    transactions: [],
    lastUpdate: 0
  };
  
  export const transactionService = {
    // Fetch transactions from P2P and store them
    async fetchAndStoreTransactions() {
      try {
        const response = await fetch(
          `${API_CONFIG.BASE_URL}/transactions`,
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${API_CONFIG.API_KEY}`
            }
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        // Process and store transactions
        store = {
          transactions: data,
          lastUpdate: Date.now()
        };
  
        return store.transactions;
      } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
      }
    },
  
    // Get stored transactions with filtering options
    getTransactions(options?: {
      fromBlock?: number;
      toBlock?: number;
      fromAddress?: string;
      toAddress?: string;
      startTime?: number;
      endTime?: number;
    }) {
      let filtered = [...store.transactions];
  
      if (options) {
        const {
          fromBlock,
          toBlock,
          fromAddress,
          toAddress,
          startTime,
          endTime
        } = options;
  
        if (fromBlock) {
          filtered = filtered.filter(tx => tx.blockNumber >= fromBlock);
        }
        if (toBlock) {
          filtered = filtered.filter(tx => tx.blockNumber <= toBlock);
        }
        if (fromAddress) {
          filtered = filtered.filter(tx => tx.from.toLowerCase() === fromAddress.toLowerCase());
        }
        if (toAddress) {
          filtered = filtered.filter(tx => tx.to.toLowerCase() === toAddress.toLowerCase());
        }
        if (startTime) {
          filtered = filtered.filter(tx => tx.timestamp >= startTime);
        }
        if (endTime) {
          filtered = filtered.filter(tx => tx.timestamp <= endTime);
        }
      }
  
      return filtered;
    },
  
    // Get transaction stats
    getStats() {
      return {
        totalTransactions: store.transactions.length,
        lastUpdate: store.lastUpdate,
        uniqueAddresses: new Set([
          ...store.transactions.map(tx => tx.from),
          ...store.transactions.map(tx => tx.to)
        ]).size
      };
    }
  };