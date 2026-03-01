'use server';

import { pool } from '@/lib/db';
import { StockGainer } from '@/types/stock';

/**
 * Fetches stock data from the RDS MySQL table 'daily_7day_2pct_up_stocks'.
 * Implements a resilient mapping system that handles various column naming styles
 * (e.g., SYMBOL vs symbol vs trading_symbol).
 */
export async function getStocksFromDb(): Promise<StockGainer[]> {
  try {
    // Perform the query on your specific table
    const [rows] = await pool.query('SELECT * FROM daily_7day_2pct_up_stocks');
    const data = rows as any[];
    
    if (data.length === 0) {
      console.log('Database query successful but no rows were returned.');
      return [];
    }

    // Map the database rows to our application's StockGainer interface
    return data.map(row => {
      /**
       * Searches for a value in a row using multiple possible key names.
       * This makes the code resilient to database schema variations.
       */
      const getVal = (candidates: string[]) => {
        for (const key of candidates) {
          // Check original, lowercase, and uppercase variations
          if (row[key] !== undefined && row[key] !== null) return row[key];
          if (row[key.toLowerCase()] !== undefined && row[key.toLowerCase()] !== null) return row[key.toLowerCase()];
          if (row[key.toUpperCase()] !== undefined && row[key.toUpperCase()] !== null) return row[key.toUpperCase()];
        }
        return null;
      };

      return {
        symbol: getVal(['symbol', 'ticker', 'trading_symbol', 'SYMBOL', 'TICKER']) || 'N/A',
        name: getVal(['company_name', 'name', 'companyName', 'issuer_name', 'COMPANY']) || 'Unknown Company',
        currentClose: parseFloat(getVal(['current_close', 'close', 'last_price', 'CLOSE', 'LAST']) || '0'),
        prevWeekClose: parseFloat(getVal(['prev_week_close', 'prev_close', 'reference_price', 'PREVCLOSE']) || '0'),
        percentageChange: parseFloat(getVal(['percentage_change', 'pct_change', 'change_pct', 'PERCENT_UP']) || '0'),
        volume: parseInt(getVal(['volume', 'volume_total', 'tottrdqty', 'VOLUME']) || '0'),
        comparisonDate: getVal(['comparison_date', 'date', 'timestamp', 'DATE']) || new Date().toLocaleDateString('en-GB')
      };
    });
  } catch (error: any) {
    console.error('Database connection or query error:', error);
    // Return a descriptive error to the UI for debugging
    throw new Error(
      `Database Error: ${error.message || 'Connection failed'}. ` +
      `Check your RDS Security Groups and credentials.`
    );
  }
}
