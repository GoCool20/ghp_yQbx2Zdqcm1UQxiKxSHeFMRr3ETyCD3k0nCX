
'use server';

import { pool } from '@/lib/db';
import { StockGainer } from '@/types/stock';

/**
 * Server Action to fetch stock data from the RDS MySQL table.
 * This runs entirely on the server.
 */
export async function getStocksFromDb(): Promise<StockGainer[]> {
  try {
    // Fetching from the requested table: daily_7day_2pct_up_stocks
    const [rows] = await pool.query('SELECT * FROM daily_7day_2pct_up_stocks');
    
    // Map database rows to our application's StockGainer interface.
    // We handle potential variations in column naming to be resilient.
    return (rows as any[]).map(row => ({
      symbol: row.symbol || row.ticker || '',
      name: row.company_name || row.name || row.companyName || 'Unknown',
      currentClose: parseFloat(row.current_close || row.currentClose || row.close_price || '0'),
      prevWeekClose: parseFloat(row.prev_week_close || row.prevWeekClose || '0'),
      percentageChange: parseFloat(row.percentage_change || row.percentageChange || '0'),
      volume: parseInt(row.volume || '0'),
      comparisonDate: row.comparison_date || row.comparisonDate || new Date().toLocaleDateString('en-GB')
    }));
  } catch (error) {
    console.error('Failed to fetch from MySQL:', error);
    throw new Error('Database connection failed. Please check your network and credentials.');
  }
}
