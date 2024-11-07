import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain, arbitrumSepolia } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { http } from 'viem'
import 'dotenv/config'

// Définition de la chaîne Babyty
export const babyty = defineChain({
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
  contracts: {},
  isTestnet: true,
  // Ajout des méthodes de transport
  transport: http()
})

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not defined')
}

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Metadata for the application
export const metadata = {
  name: 'PolyStake',
  description: 'Staking Platform',
  url: 'https://polystake.xyz', // Changez pour votre domaine
  icons: ['https://polystake.xyz/icon.png'] // Changez pour votre icône
}

// Configuration de l'adaptateur Wagmi
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [arbitrumSepolia.id]: http(),
    [babyty.id]: http()
  },
  ssr: true,
  projectId,
  networks: [arbitrumSepolia, babyty]
})

export const config = wagmiAdapter.wagmiConfig

// Configuration AppKit
export const appKit = createAppKit({
  projectId,
  adapters: [wagmiAdapter],
  networks: [babyty, arbitrumSepolia],
  defaultNetwork: arbitrumSepolia,
  metadata,
  features: {
    analytics: true,
    swaps: true,
    onramp: true
  }
})