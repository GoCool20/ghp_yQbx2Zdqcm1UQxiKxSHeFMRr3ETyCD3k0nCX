'use server';

import { pool } from '@/lib/db';
import { StockGainer } from '@/types/stock';

/**
 * Fetches stock data from the RDS MySQL table 'daily_7day_2pct_up_stocks'.
 * Implements a highly resilient mapping system and logs column structure for debugging.
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

    // Debug log to help identify column names if mapping fails
    console.log('Database Sample Row Keys:', Object.keys(data[0]));

    // Map the database rows to our application's StockGainer interface
    return data.map(row => {
      /**
       * Searches for a value in a row using multiple possible key names.
       */
      const getVal = (candidates: string[]) => {
        for (const key of candidates) {
          // Check original
          if (row[key] !== undefined && row[key] !== null) return row[key];
          // Check case-insensitive variants
          const foundKey = Object.keys(row).find(k => k.toLowerCase() === key.toLowerCase());
          if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) return row[foundKey];
        }
        return null;
      };

      const currentClose = parseFloat(getVal(['current_close', 'close', 'last_price', 'CLOSE', 'LAST', 'lastPrice']) || '0');
      const prevWeekClose = parseFloat(getVal(['prev_week_close', 'prev_close', 'reference_price', 'PREVCLOSE', 'prevClose']) || '0');
      
      // Attempt to get pre-calculated percentage change, or calculate it manually
      let percentageChange = parseFloat(getVal(['percentage_change', 'pct_change', 'change_pct', 'PERCENT_UP', 'pChange', 'percentageChange']) || '0');
      
      if (percentageChange === 0 && prevWeekClose > 0) {
        percentageChange = ((currentClose - prevWeekClose) / prevWeekClose) * 100;
      }

      return {
        symbol: getVal(['symbol', 'ticker', 'trading_symbol', 'SYMBOL', 'TICKER', 'tradingSymbol']) || 'N/A',
        name: getVal(['company_name', 'name', 'companyName', 'issuer_name', 'COMPANY', 'issuerName']) || 'Unknown Company',
        currentClose,
        prevWeekClose,
        percentageChange,
        volume: parseInt(getVal(['volume', 'volume_total', 'tottrdqty', 'VOLUME', 'totalTradedQty']) || '0'),
        comparisonDate: getVal(['comparison_date', 'date', 'timestamp', 'DATE', 'TIMESTAMP']) || new Date().toLocaleDateString('en-GB')
      };
    });
  } catch (error: any) {
    console.error('Database connection or query error:', error);
    throw new Error(
      `Database Error: ${error.message || 'Connection failed'}. ` +
      `Check your RDS Security Groups and credentials.`
    );
  }
}
