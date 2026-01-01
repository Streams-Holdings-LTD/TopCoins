"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors"

export type WalletType = "metamask" | "phantom" | "walletconnect" | "coinbase" | "trustwallet" | null

interface WalletContextType {
  address: string | null
  walletType: WalletType
  isConnecting: boolean
  connect: (type: WalletType) => Promise<void>
  disconnect: () => void
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const { address: wagmiAddress, isConnected, connector } = useAccount()
  const { connectAsync, connectors } = useConnect()
  const { disconnect: wagmiDisconnect } = useDisconnect()
  
  const [walletType, setWalletType] = useState<WalletType>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [phantomAddress, setPhantomAddress] = useState<string | null>(null)

  const openModal = useCallback(() => setIsModalOpen(true), [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  // Update wallet type when connector changes
  useEffect(() => {
    if (isConnected && connector) {
      const connectorName = connector.name.toLowerCase()
      if (connectorName.includes('metamask')) {
        setWalletType('metamask')
      } else if (connectorName.includes('walletconnect')) {
        setWalletType('walletconnect')
      } else if (connectorName.includes('coinbase')) {
        setWalletType('coinbase')
      } else if (connectorName.includes('trust')) {
        setWalletType('trustwallet')
      }
    }
  }, [isConnected, connector])

  const connect = useCallback(async (type: WalletType) => {
    if (!type) return
    setIsConnecting(true)
    
    console.log('Connecting to wallet type:', type)
    console.log('Available connectors:', connectors.map(c => ({ id: c.id, name: c.name })))

    try {
      if (type === 'phantom') {
        // Handle Phantom (Solana) wallet
        if (typeof window !== 'undefined' && 'solana' in window) {
          const provider = (window as any).solana
          if (provider?.isPhantom) {
            const response = await provider.connect()
            setPhantomAddress(response.publicKey.toString())
            setWalletType('phantom')
            setIsModalOpen(false)
          } else {
            window.open('https://phantom.app/', '_blank')
          }
        } else {
          window.open('https://phantom.app/', '_blank')
        }
      } else {
        // Handle EVM wallets
        let selectedConnector
        
        if (type === 'metamask' || type === 'trustwallet') {
          // Use injected connector for browser wallets
          selectedConnector = connectors.find(c => c.id === 'injected')
        } else if (type === 'walletconnect') {
          selectedConnector = connectors.find(c => c.id === 'walletConnect')
        } else if (type === 'coinbase') {
          selectedConnector = connectors.find(c => c.id === 'coinbaseWalletSDK')
        }

        if (selectedConnector) {
          console.log('Using connector:', selectedConnector.name, selectedConnector.id)
          await connectAsync({ connector: selectedConnector })
          console.log('Connection successful!')
          setIsModalOpen(false)
        } else {
          console.error('No connector found for type:', type)
        }
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }, [connectAsync, connectors])

  const disconnect = useCallback(() => {
    if (phantomAddress) {
      // Disconnect Phantom
      if (typeof window !== 'undefined' && 'solana' in window) {
        const provider = (window as any).solana
        if (provider?.isPhantom) {
          provider.disconnect()
        }
      }
      setPhantomAddress(null)
    } else {
      // Disconnect EVM wallet
      wagmiDisconnect()
    }
    setWalletType(null)
  }, [phantomAddress, wagmiDisconnect])

  // Determine current address (Phantom or EVM)
  const currentAddress = phantomAddress || wagmiAddress || null

  return (
    <WalletContext.Provider
      value={{
        address: currentAddress,
        walletType,
        isConnecting,
        connect,
        disconnect,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
