// src/app/api/transactions/route.ts
import { type NextRequest } from 'next/server';
import { transactionService } from '@/services/transactionService';


export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const fromBlock = searchParams.get('fromBlock');
    const toBlock = searchParams.get('toBlock');
    const fromAddress = searchParams.get('from');
    const toAddress = searchParams.get('to');
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');
    const type = searchParams.get('type');

    // If type is 'stats', return statistics
    if (type === 'stats') {
      return Response.json(transactionService.getStats());
    }

    // Build filter options
    const options = {
      ...(fromBlock && { fromBlock: parseInt(fromBlock) }),
      ...(toBlock && { toBlock: parseInt(toBlock) }),
      ...(fromAddress && { fromAddress }),
      ...(toAddress && { toAddress }),
      ...(startTime && { startTime: parseInt(startTime) }),
      ...(endTime && { endTime: parseInt(endTime) })
    };

    // Fetch new transactions if needed (e.g., if last update was > 5 minutes ago)
    const now = Date.now();
    if (now - transactionService.getStats().lastUpdate > 5 * 60 * 1000) {
      await transactionService.fetchAndStoreTransactions();
    }

    // Get filtered transactions
    const transactions = transactionService.getTransactions(options);

    return Response.json({
      success: true,
      data: transactions,
      timestamp: now
    });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}