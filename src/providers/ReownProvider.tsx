'use client'

import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { walletConnect, coinbaseWallet, injected } from 'wagmi/connectors'
import { CreateConnectorFn, cookieToInitialState, WagmiProvider, type Config,  } from 'wagmi'
import { type ReactNode } from 'react'
import { wagmiAdapter, projectId, babyty } from '@/config/wagmi'
import { arbitrumSepolia } from '@reown/appkit/networks'

const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const metadata = {
  name: 'PolyStake',
  description: 'Decentralized Staking Platform',
  url: 'https://polystake.example.com',
  icons: ['https://polystake.example.com/icon.png']
}

// Création des connecteurs avec le bon typage
const connectors: CreateConnectorFn[] = []
connectors.push(walletConnect({ projectId, metadata, showQrModal: false })) // showQrModal must be false
connectors.push(injected({ shimDisconnect: true }))
connectors.push(
  coinbaseWallet({
    appName: metadata.name,
    appLogoUrl: metadata.icons[0]
    
  })
)

export const config = wagmiAdapter.wagmiConfig

// Configuration du modal Reown sans l'option transactionHistory
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [arbitrumSepolia, babyty],
  defaultNetwork: arbitrumSepolia,
  metadata,
  features: {
    analytics: true
  },
  
})

interface ReownProviderProps {
  children: ReactNode;
  cookies?: string | null;
}

function ReownProvider({ children, cookies = null }: ReownProviderProps) {
  const initialState = cookies 
    ? cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
    : undefined

  

  return (
    <WagmiProvider 
      config={config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ReownProvider