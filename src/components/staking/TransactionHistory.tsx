import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Clock, Search, Filter } from 'lucide-react';

interface Transaction {
    id: string;
    type: 'stake' | 'unstake' | 'claim';
    asset: 'ETH' | 'BTC';
    amount: string;
    status: 'completed' | 'pending' | 'failed';
    timestamp: string;
    hash: string;
}

interface TransactionHistoryProps {
    transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAsset, setFilterAsset] = useState<'ALL' | 'ETH' | 'BTC'>('ALL');
    const [filterType, setFilterType] = useState<'ALL' | 'stake' | 'unstake' | 'claim'>('ALL');

    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = tx.hash.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAsset = filterAsset === 'ALL' || tx.asset === filterAsset;
        const matchesType = filterType === 'ALL' || tx.type === filterType;
        return matchesSearch && matchesAsset && matchesType;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-400';
            case 'pending':
                return 'text-orange-400';
            case 'failed':
                return 'text-red-400';
            default:
                return 'text-zinc-400';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'stake':
                return <ArrowUpCircle className="h-5 w-5 text-green-400" />;
            case 'unstake':
                return <ArrowDownCircle className="h-5 w-5 text-red-400" />;
            case 'claim':
                return <Clock className="h-5 w-5 text-orange-400" />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-zinc-900 rounded-2xl border border-yellow-800 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Transaction History</h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search by transaction hash"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-yellow-700 rounded-lg text-white placeholder-zinc-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                <select
                    value={filterAsset}
                    onChange={(e) => setFilterAsset(e.target.value as 'ALL' | 'ETH' | 'BTC')}
                    className="p-2 bg-zinc-800 border border-yellow-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                    <option value="ALL">All Assets</option>
                    <option value="ETH">ETH</option>
                    <option value="BTC">BTC</option>
                </select>

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as 'ALL' | 'stake' | 'unstake' | 'claim')}
                    className="p-2 bg-zinc-800 border border-yellow-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                    <option value="ALL">All Types</option>
                    <option value="stake">Stake</option>
                    <option value="unstake">Unstake</option>
                    <option value="claim">Claim</option>
                </select>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-zinc-400 text-sm border-b border-yellow-800">
                            <th className="px-4 py-3 text-left">Type</th>
                            <th className="px-4 py-3 text-left">Asset</th>
                            <th className="px-4 py-3 text-left">Amount</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Transaction Hash</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {filteredTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-zinc-800/50 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center space-x-2">
                                        {getTypeIcon(tx.type)}
                                        <span className="text-zinc-300 capitalize">{tx.type}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-zinc-300">{tx.asset}</td>
                                <td className="px-4 py-3 text-zinc-300">{tx.amount}</td>
                                <td className="px-4 py-3">
                                    <span className={`capitalize ${getStatusColor(tx.status)}`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-zinc-300">
                                    {new Date(tx.timestamp).toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                    <a 
                                        href={`https://etherscan.io/tx/${tx.hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-orange-400 hover:text-orange-500 transition-colors"
                                    >
                                        {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredTransactions.length === 0 && (
                <div className="text-center py-8 text-zinc-400">
                    No transactions found
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;