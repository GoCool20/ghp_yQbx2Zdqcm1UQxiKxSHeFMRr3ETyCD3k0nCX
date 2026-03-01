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
import { ChevronLeft, ChevronRight } from "lucide-react"

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
      <div className="bg-card border rounded-lg p-12 text-center shadow-sm">
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

  const formatVolume = (val: number) => {
    if (val >= 10000000) return `${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${(val / 100000).toFixed(2)} L`;
    return val.toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold text-primary">Symbol</TableHead>
                <TableHead className="font-semibold text-primary">Company Name</TableHead>
                <TableHead className="font-semibold text-primary text-right">Current Close</TableHead>
                <TableHead className="font-semibold text-primary text-right">Prev Week Close</TableHead>
                <TableHead className="font-semibold text-primary text-right">Change (%)</TableHead>
                <TableHead className="font-semibold text-primary text-right">Volume</TableHead>
                <TableHead className="font-semibold text-primary text-center">Comparison Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStocks.map((stock, index) => (
                <TableRow key={`${stock.symbol}-${index}`} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-bold text-primary">{stock.symbol}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{stock.name}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(stock.currentClose)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatCurrency(stock.prevWeekClose)}</TableCell>
                  <TableCell className="text-right font-bold text-success">
                    +{stock.percentageChange.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">{formatVolume(stock.volume)}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground whitespace-nowrap">{stock.comparisonDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {start + 1} to {Math.min(start + pageSize, stocks.length)} of {stocks.length} stocks
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              className="h-9 w-9 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">Page {page + 1} of {totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages - 1}
              className="h-9 w-9 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
