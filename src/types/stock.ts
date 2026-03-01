export interface StockGainer {
  symbol: string;
  name: string;
  currentClose: number;
  prevWeekClose: number;
  percentageChange: number;
  comparisonDate: string;
}

export type SortField = 'gain_desc' | 'gain_asc';
