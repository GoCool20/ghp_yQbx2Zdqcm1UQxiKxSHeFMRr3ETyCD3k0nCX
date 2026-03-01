'use server';

import { pool } from '@/lib/db';
import { StockGainer } from '@/types/stock';

/**
 * Server Action to fetch stock data from the RDS MySQL table.
 * This mapping is resilient to various column naming conventions.
 */
export async function getStocksFromDb(): Promise<StockGainer[]> {
  try {
    // Fetching from your specific table
    const [rows] = await pool.query('SELECT * FROM daily_7day_2pct_up_stocks');
    
    const data = rows as any[];
    
    if (data.length > 0) {
      console.log('Successfully fetched rows. Columns detected:', Object.keys(data[0]));
    }

    return data.map(row => {
      // Helper to find a value from multiple possible column name variations
      const getVal = (candidates: string[]) => {
        for (const key of candidates) {
          if (row[key] !== undefined && row[key] !== null) return row[key];
          if (row[key.toLowerCase()] !== undefined && row[key.toLowerCase()] !== null) return row[key.toLowerCase()];
          if (row[key.toUpperCase()] !== undefined && row[key.toUpperCase()] !== null) return row[key.toUpperCase()];
        }
        return null;
      };

      return {
        symbol: getVal(['symbol', 'ticker', 'SYMBOL', 'TICKER', 'trading_symbol']) || '',
        name: getVal(['company_name', 'name', 'companyName', 'COMPANY', 'issuer_name']) || 'Unknown',
        currentClose: parseFloat(getVal(['current_close', 'close', 'CLOSE', 'last_price', 'LAST']) || '0'),
        prevWeekClose: getVal(['prev_week_close', 'prev_close', 'PREVCLOSE', 'PREV_CLOSE', 'reference_price']) 
          ? parseFloat(getVal(['prev_week_close', 'prev_close', 'PREVCLOSE', 'PREV_CLOSE', 'reference_price'])) 
          : 0,
        percentageChange: parseFloat(getVal(['percentage_change', 'pct_change', 'CHANGE_PCT', 'PERCENT_UP', 'percentageChange']) || '0'),
        volume: parseInt(getVal(['volume', 'VOLUME', 'tottrdqty', 'TOTTRDQTY', 'qty']) || '0'),
        comparisonDate: getVal(['comparison_date', 'date', 'DATE', 'timestamp', 'TIMESTAMP']) || new Date().toLocaleDateString('en-GB')
      };
    });
  } catch (error: any) {
    console.error('Critical Database Error:', error);
    // Return the specific error message to help identify the issue (e.g. timeout, auth, or ssl)
    throw new Error(`${error.message || 'Connection failed'} (Code: ${error.code || 'UNKNOWN'})`);
  }
}
