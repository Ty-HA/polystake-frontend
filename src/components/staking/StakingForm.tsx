'use client';

import React, { useState } from 'react';
import type { StakingFormData } from '@/types/staking';

interface StakingFormProps {
    onSubmit: (data: StakingFormData) => void;
    isLoading?: boolean;
}

const StakingForm: React.FC<StakingFormProps> = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState<StakingFormData>({
        cryptoType: 'ETH',
        amount: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-zinc-900 rounded-2xl border border-yellow-800 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Select Asset
                    </label>
                    <select
                        value={formData.cryptoType}
                        onChange={(e) => setFormData({
                            ...formData,
                            cryptoType: e.target.value as 'ETH' | 'BTC'
                        })}
                        className="w-full p-3 bg-zinc-800 border border-yellow-800 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white"
                    >
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="BTC">Bitcoin (BTC)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Amount
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({
                                ...formData,
                                amount: e.target.value
                            })}
                            step="0.000001"
                            min="0"
                            placeholder="0.0"
                            className="w-full p-3 bg-zinc-800 border border-yellow-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white pr-16"
                        />
                        <span className="absolute right-3 top-3 text-zinc-400">
                            {formData.cryptoType}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Minimum Stake</span>
                        <span className="text-zinc-200">
                            {formData.cryptoType === 'ETH' ? '0.1 ETH' : '0.01 BTC'}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Current APY</span>
                        <span className="text-orange-400 font-medium">
                            {formData.cryptoType === 'ETH' ? '5.5%' : '4.2%'}
                        </span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !formData.amount}
                    className="group relative w-full px-6 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></div>
                    {isLoading ? 'Processing...' : 'Stake Now'}
                </button>
            </form>
        </div>
    );
};

export default StakingForm;