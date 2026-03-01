"use client";

import { useState, useMemo, useEffect } from "react";
import { StockFilters } from "./stock-filters";
import { StockTable } from "./stock-table";
import { StockSummary } from "./stock-summary";
import { getStocksFromDb } from "@/app/actions/stocks";
import { StockGainer } from "@/types/stock";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StockDashboard() {
  const [stocks, setStocks] = useState<StockGainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [minGain, setMinGain] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("gain_desc");
  const [page, setPage] = useState(0);
  const pageSize = 15;

  async function fetchData() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getStocksFromDb();
      setStocks(data);
    } catch (err: any) {
      setError(err.message || "Failed to connect to the stock database.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [minGain, search, sortBy]);

  const filteredAndSortedStocks = useMemo(() => {
    let result = stocks.filter(stock => 
      stock.percentageChange >= minGain && 
      (stock.symbol.toLowerCase().includes(search.toLowerCase()))
    );

    result.sort((a, b) => {
      if (sortBy === "gain_desc") return b.percentageChange - a.percentageChange;
      if (sortBy === "gain_asc") return a.percentageChange - b.percentageChange;
      return 0;
    });

    return result;
  }, [stocks, minGain, search, sortBy]);

  const summaryData = useMemo(() => {
    if (filteredAndSortedStocks.length === 0) return { total: 0, highest: 0 };
    const highest = Math.max(...filteredAndSortedStocks.map(s => s.percentageChange));
    return {
      total: filteredAndSortedStocks.length,
      highest: highest
    };
  }, [filteredAndSortedStocks]);

  if (error) {
    return (
      <div className="container px-4 md:px-8 py-10 mx-auto max-w-7xl space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="font-mono text-xs mb-4">{error}</p>
            <p className="text-sm">
              Please ensure your database credentials are correct and the RDS Security Group allows inbound traffic.
            </p>
          </AlertDescription>
        </Alert>
        <Button onClick={fetchData} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-8 py-10 mx-auto max-w-7xl animate-in fade-in duration-700">
      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <>
          <StockSummary 
            totalStocks={summaryData.total} 
            highestGain={summaryData.highest} 
          />
          
          <StockFilters 
            minGain={minGain} 
            setMinGain={setMinGain}
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          <StockTable 
            stocks={filteredAndSortedStocks} 
            page={page} 
            setPage={setPage} 
            pageSize={pageSize}
          />
          
          {stocks.length > 0 && filteredAndSortedStocks.length === 0 && (
            <div className="mt-4 p-4 bg-muted rounded-md text-center text-sm">
              <p>Database returned {stocks.length} records, but they were filtered out.</p>
              <Button variant="link" onClick={() => setMinGain(0)}>Show all records</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
