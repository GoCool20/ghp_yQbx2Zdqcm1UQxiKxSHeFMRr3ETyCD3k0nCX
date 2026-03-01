'use server';

import { pool } from '@/lib/db';
import { StockGainer } from '@/types/stock';

/**
 * Fetches all stock data from the RDS MySQL table 'daily_7day_2pct_up_stocks'.
 * Removed LIMIT to ensure all 589+ records are retrieved.
 */
export async function getStocksFromDb(): Promise<StockGainer[]> {
  try {
    // Fetch all records without a low limit
    const [rows] = await pool.query('SELECT * FROM daily_7day_2pct_up_stocks');
    const data = rows as any[];
    
    if (data.length === 0) {
      return [];
    }

    // Map the database rows to our application's StockGainer interface
    return data.map(row => {
      /**
       * Searches for a value in a row using multiple possible key names.
       * Prioritizes the user-provided exact column names: 
       * security, current_date, previous_week_date, current_close, previous_close, weekly_pct_change
       */
      const getVal = (candidates: string[]) => {
        for (const key of candidates) {
          if (row[key] !== undefined && row[key] !== null) return row[key];
          // Check case-insensitive match
          const foundKey = Object.keys(row).find(k => k.toLowerCase() === key.toLowerCase());
          if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) return row[foundKey];
        }
        return null;
      };

      const currentClose = parseFloat(getVal(['current_close', 'close', 'last_price']) || '0');
      const prevWeekClose = parseFloat(getVal(['previous_close', 'prev_close', 'reference_price']) || '0');
      const percentageChange = parseFloat(getVal(['weekly_pct_change', 'percentage_change', 'pChange']) || '0');
      
      // Use security as the symbol
      const symbol = getVal(['security', 'symbol', 'ticker']) || 'N/A';
      
      // Handle Date objects correctly
      const rawDate = getVal(['current_date', 'date', 'timestamp']);
      const comparisonDate = (rawDate instanceof Date) 
        ? rawDate.toLocaleDateString('en-GB') 
        : String(rawDate || new Date().toLocaleDateString('en-GB'));

      return {
        symbol: String(symbol),
        // Since company name isn't explicitly in the provided list, we'll use the symbol
        name: getVal(['issuer_name', 'company_name', 'name']) || String(symbol),
        currentClose,
        prevWeekClose,
        percentageChange,
        volume: parseInt(getVal(['volume', 'tottrdqty', 'totalTradedQty']) || '0'),
        comparisonDate
      };
    });
  } catch (error: any) {
    console.error('Database connection or query error:', error);
    throw new Error(
      `Database Error: ${error.message || 'Connection failed'}. ` +
      `Ensure the RDS Security Group allows connections from this app.`
    );
  }
}
