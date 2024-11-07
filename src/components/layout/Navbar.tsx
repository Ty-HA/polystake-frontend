'use client'

import React from 'react';
import ConnectButton from '../ConnectButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-black border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="text-2xl font-bold text-white">
                Poly<span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">Stake</span>
              </div>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/"
                className={`text-sm ${pathname === '/' ? 'text-orange-400' : 'text-zinc-400 hover:text-orange-400'} transition-colors`}
              >
                Dashboard
              </Link>
              <Link 
                href="/p2p"
                className={`text-sm ${pathname === '/p2p' ? 'text-orange-400' : 'text-zinc-400 hover:text-orange-400'} transition-colors`}
              >
                P2P Staking
              </Link>
            </div>
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-4">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;