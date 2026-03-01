"use client";

import { useState, useMemo, useEffect } from "react";
import { MOCK_STOCKS } from "@/lib/mock-data";
import { StockFilters } from "./stock-filters";
import { StockTable } from "./stock-table";
import { StockSummary } from "./stock-summary";

export default function StockDashboard() {
  const [minGain, setMinGain] = useState(2);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("gain_desc");
  const [page, setPage] = useState(0);
  const pageSize = 10;

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [minGain, search, sortBy]);

  const filteredAndSortedStocks = useMemo(() => {
    let result = MOCK_STOCKS.filter(stock => 
      stock.percentageChange >= minGain && 
      (stock.symbol.toLowerCase().includes(search.toLowerCase()) || 
       stock.name.toLowerCase().includes(search.toLowerCase()))
    );

    result.sort((a, b) => {
      if (sortBy === "gain_desc") return b.percentageChange - a.percentageChange;
      if (sortBy === "gain_asc") return a.percentageChange - b.percentageChange;
      if (sortBy === "volume_desc") return b.volume - a.volume;
      return 0;
    });

    return result;
  }, [minGain, search, sortBy]);

  const summaryData = useMemo(() => {
    if (filteredAndSortedStocks.length === 0) return { total: 0, highest: 0 };
    const highest = Math.max(...filteredAndSortedStocks.map(s => s.percentageChange));
    return {
      total: filteredAndSortedStocks.length,
      highest: highest
    };
  }, [filteredAndSortedStocks]);

  return (
    <div className="container px-4 md:px-8 py-10 mx-auto max-w-7xl animate-in fade-in duration-700">
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
    </div>
  );
}
