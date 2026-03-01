'use server';

import { pool } from '@/lib/db';
import { StockGainer } from '@/types/stock';

/**
 * Fetches stock data from the RDS MySQL table 'daily_7day_2pct_up_stocks'.
 * Uses exact column names provided by the user for precise mapping.
 */
export async function getStocksFromDb(): Promise<StockGainer[]> {
  try {
    // Perform the query
    const [rows] = await pool.query('SELECT * FROM daily_7day_2pct_up_stocks LIMIT 100');
    const data = rows as any[];
    
    if (data.length === 0) {
      console.log('Database Query: Success, but the table "daily_7day_2pct_up_stocks" is currently empty.');
      return [];
    }

    // Map the database rows to our application's StockGainer interface
    return data.map(row => {
      /**
       * Searches for a value in a row using multiple possible key names.
       * Prioritizes the user-provided exact column names.
       */
      const getVal = (candidates: string[]) => {
        for (const key of candidates) {
          // Check exact match
          if (row[key] !== undefined && row[key] !== null) return row[key];
          
          // Check case-insensitive match
          const foundKey = Object.keys(row).find(k => k.toLowerCase() === key.toLowerCase());
          if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) return row[foundKey];
        }
        return null;
      };

      const currentClose = parseFloat(getVal(['current_close', 'close', 'last_price', 'lastPrice']) || '0');
      const prevWeekClose = parseFloat(getVal(['previous_close', 'prev_close', 'reference_price', 'prevClose']) || '0');
      const percentageChange = parseFloat(getVal(['weekly_pct_change', 'percentage_change', 'pChange', 'percentageChange']) || '0');
      
      // Use security as the symbol
      const symbol = getVal(['security', 'symbol', 'ticker', 'trading_symbol']) || 'N/A';
      
      // Handle Date objects correctly to avoid React rendering errors
      const rawDate = getVal(['current_date', 'date', 'timestamp']);
      const comparisonDate = (rawDate instanceof Date) 
        ? rawDate.toLocaleDateString('en-GB') 
        : String(rawDate || new Date().toLocaleDateString('en-GB'));

      return {
        symbol: String(symbol),
        // Since company name isn't explicitly in the provided list, we'll use the symbol or a placeholder
        name: getVal(['issuer_name', 'company_name', 'name']) || String(symbol),
        currentClose,
        prevWeekClose,
        percentageChange,
        // Volume wasn't in the list, so we default to 0 or try to find it
        volume: parseInt(getVal(['volume', 'tottrdqty', 'totalTradedQty']) || '0'),
        comparisonDate
      };
    });
  } catch (error: any) {
    console.error('Database connection or query error:', error);
    throw new Error(
      `Database Error: ${error.message || 'Connection failed'}. ` +
      `Host: ${process.env.MYSQL_HOST || 'bhavcopy-mysql-db.c70kaw8mu0rx.eu-north-1.rds.amazonaws.com'}`
    );
  }
}
