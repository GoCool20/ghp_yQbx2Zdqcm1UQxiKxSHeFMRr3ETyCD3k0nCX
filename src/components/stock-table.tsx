
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StockGainer } from "@/types/stock"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowLeftRight } from "lucide-react"

interface StockTableProps {
  stocks: StockGainer[];
  page: number;
  setPage: (p: number) => void;
  pageSize: number;
}

export function StockTable({ stocks, page, setPage, pageSize }: StockTableProps) {
  const totalPages = Math.ceil(stocks.length / pageSize);
  const start = page * pageSize;
  const currentStocks = stocks.slice(start, start + pageSize);

  if (stocks.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-8 md:p-12 text-center shadow-sm">
        <p className="text-lg font-medium text-muted-foreground">No stocks match selected criteria.</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(val);
  };

  return (
    <div className="space-y-4">
      <div className="md:hidden flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/60 mb-1 animate-pulse">
        <ArrowLeftRight className="h-3 w-3" />
        <span>Swipe table to see more</span>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/20">
          <Table className="min-w-[700px] md:min-w-full">
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold text-primary sticky left-0 bg-muted/50 z-10 whitespace-nowrap">Symbol</TableHead>
                <TableHead className="font-semibold text-primary whitespace-nowrap hidden lg:table-cell">Name</TableHead>
                <TableHead className="font-semibold text-primary text-right whitespace-nowrap">Current Close</TableHead>
                <TableHead className="font-semibold text-primary text-right whitespace-nowrap">Prev Week Close</TableHead>
                <TableHead className="font-semibold text-primary text-right whitespace-nowrap">Change (%)</TableHead>
                <TableHead className="font-semibold text-primary text-center whitespace-nowrap">Comparison Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStocks.map((stock, index) => (
                <TableRow key={`${stock.symbol}-${index}-${page}`} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-bold text-primary py-3 md:py-4 sticky left-0 bg-card z-10 border-r md:border-r-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none whitespace-nowrap">
                    {stock.symbol}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[150px] truncate text-muted-foreground">
                    {stock.name}
                  </TableCell>
                  <TableCell className="text-right font-medium whitespace-nowrap">
                    {formatCurrency(stock.currentClose)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground whitespace-nowrap">
                    {formatCurrency(stock.prevWeekClose)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-success whitespace-nowrap">
                    +{stock.percentageChange.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-center text-xs text-muted-foreground whitespace-nowrap">
                    {stock.comparisonDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            Showing {start + 1} to {Math.min(start + pageSize, stocks.length)} of {stocks.length} stocks
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPage(page - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page === 0}
              className="h-9 px-3"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm font-medium whitespace-nowrap">
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPage(page + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page >= totalPages - 1}
              className="h-9 px-3"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
