'use server';

import { pool } from '@/lib/db';
import { StockGainer } from '@/types/stock';

/**
 * Fetches all stock data from the RDS MySQL table 'daily_7day_2pct_up_stocks'.
 * Maps exactly to the columns provided: security, current_date, previous_week_date, current_close, previous_close, weekly_pct_change
 */
export async function getStocksFromDb(): Promise<StockGainer[]> {
  try {
    const [rows] = await pool.query('SELECT * FROM daily_7day_2pct_up_stocks');
    const data = rows as any[];
    
    if (data.length === 0) {
      return [];
    }

    return data.map(row => {
      // Direct mapping to user-provided columns
      const symbol = row.security || 'N/A';
      const currentClose = parseFloat(row.current_close || '0');
      const prevWeekClose = parseFloat(row.previous_close || '0');
      const percentageChange = parseFloat(row.weekly_pct_change || '0');
      
      // Handle Date objects safely for comparisonDate
      const rawDate = row.current_date;
      let comparisonDate = 'N/A';
      
      if (rawDate instanceof Date) {
        comparisonDate = rawDate.toLocaleDateString('en-GB');
      } else if (rawDate) {
        comparisonDate = String(rawDate);
      }

      return {
        symbol: String(symbol),
        name: String(symbol), // Using security as name as well
        currentClose,
        prevWeekClose,
        percentageChange,
        comparisonDate
      };
    });
  } catch (error: any) {
    console.error('Database query error:', error);
    throw new Error(`Database Error: ${error.message || 'Connection failed'}`);
  }
}
