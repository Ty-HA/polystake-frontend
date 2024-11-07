'use client'

import React from 'react';
import ConnectButton from '../ConnectButton';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className = '' }: NavbarProps) => {
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
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;