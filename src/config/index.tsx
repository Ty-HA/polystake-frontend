import { cookieStorage, createStorage } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { defineChain } from '@reown/appkit/networks';
import { arbitrumSepolia } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit';
import 'dotenv/config';


// Définition de la chaîne Babyty
const babyty = defineChain({
  id: 778887,
  name: 'Babyty',
  caipNetworkId: 'eip155:778887',
  chainNamespace: 'eip155',
  nativeCurrency: {
    decimals: 18,
    name: 'Babyty',
    symbol: 'BBY',
  },
  rpcUrls: {
    default: {
      http: ['https://babyty.alt.technology'],
      webSocket: ['wss://babyty.alt.technology/ws'],
    },
    public: {
      http: ['https://babyty.alt.technology'],
      webSocket: ['wss://babyty.alt.technology/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BabytyExplorer',
      url: 'https://explorer.babyty.alt.technology',
    },
  },
  contracts: {
    // Add the contracts here
  }
});

export default babyty;

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
console.log ('projectId', projectId);

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Ajout de arbitrumSepolia et babyty aux réseaux
export const networks = [arbitrumSepolia, babyty]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig;

// Pass the wagmiAdapter and networks to the AppKit
createAppKit({
    projectId,
    adapters: [wagmiAdapter],
    networks: [babyty, arbitrumSepolia],
  });