'use client'

import React, { useState, useRef } from 'react';
import { Wallet, X, ExternalLink, LogOut, Settings } from 'lucide-react';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className = '' }: NavbarProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const menuRef = useRef(null);

  const handleConnect = () => {
    console.log('Connecting wallet...');
    setIsConnected(true);
    setWalletAddress('0x1234...5678'); // Simulé
  };

  const handleDisconnect = () => {
    console.log('Disconnecting wallet...');
    setIsConnected(false);
    setWalletAddress('');
    setShowMenu(false);
  };

  return (
    <nav className="bg-black border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">
              Poly<span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">Stake</span>
            </div>
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-4">
            {!isConnected ? (
              <button
                onClick={handleConnect}
                className="group relative px-6 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300"
              >
                <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></div>
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <span>Connect Wallet</span>
                </div>
              </button>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-black/40 backdrop-blur-xl border border-orange-500/20 rounded-lg hover:border-orange-500/40 transition-all duration-200"
                >
                  <span className="text-zinc-300">{walletAddress}</span>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-72 rounded-lg bg-black/90 backdrop-blur-xl border border-orange-500/20 shadow-xl z-50">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-semibold">Wallet</h3>
                        <button
                          onClick={() => setShowMenu(false)}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Address */}
                        <div className="p-3 bg-black/40 rounded-lg border border-zinc-800">
                          <p className="text-sm text-zinc-400">Connected Address</p>
                          <p className="text-sm font-medium text-white mt-1">{walletAddress}</p>
                        </div>

                        {/* Actions */}
                        <button
                          onClick={() => window.open('https://etherscan.io', '_blank')}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                          View on Explorer
                          <ExternalLink className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => setShowMenu(false)}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                          Settings
                          <Settings className="h-4 w-4" />
                        </button>

                        <button
                          onClick={handleDisconnect}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                        >
                          Disconnect
                          <LogOut className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;