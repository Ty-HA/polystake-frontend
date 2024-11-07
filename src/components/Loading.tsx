'use client'

import React from 'react';

interface LoadingProps {
  className?: string;
}

const Loading = ({ className = '' }: LoadingProps) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-black/80 backdrop-blur-sm ${className}`}>
      {/* Logo et texte */}
      <div className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent flex items-center gap-2">
        Poly<span>Stake</span>
      </div>

      {/* Animation principale */}
      <div className="relative">
        {/* Cercle extérieur rotatif */}
        <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
        
        {/* Points de chargement */}
        <div className="flex gap-1 mt-4 justify-center">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse delay-150"></div>
        </div>
      </div>

      {/* Texte de chargement */}
      <div className="mt-6 text-zinc-400 text-sm animate-pulse">
        Loading your assets...
      </div>

      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-orange-500/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Loading;