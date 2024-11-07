'use client';
import React from 'react';
import { Wallet2 } from 'lucide-react';

const Navbar = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState('');

  const handleConnect = () => {
    console.log('Connecting wallet...');
    setIsConnected(true);
    setWalletAddress('0x1234...5678');
  };

  const handleDisconnect = () => {
    console.log('Disconnecting wallet...');
    setIsConnected(false);
    setWalletAddress('');
  };

  return (
    <nav className="bg-black border-b border-yellow-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">
              Poly<span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">Stake</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {!isConnected ? (
              <button
                onClick={handleConnect}
                className="group relative px-6 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300"
              >
                <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></div>
                <div className="flex items-center space-x-2">
                  <Wallet2 size={20} />
                  <span>Connect Wallet</span>
                </div>
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg border border-yellow-800">
                  {walletAddress}
                </span>
                <button
                  onClick={handleDisconnect}
                  className="text-zinc-300 hover:text-red-500 transition-colors duration-200"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;