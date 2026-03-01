export interface StockGainer {
  symbol: string;
  name: string;
  currentClose: number;
  prevWeekClose: number;
  percentageChange: number;
  volume: number;
  comparisonDate: string;
}

export type SortField = 'gain' | 'loss' | 'volume';
