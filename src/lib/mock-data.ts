import { StockGainer } from "@/types/stock";

const generateMockData = (): StockGainer[] => {
  const stocks = [
    { symbol: "RELIANCE", name: "Reliance Industries Ltd." },
    { symbol: "TCS", name: "Tata Consultancy Services Ltd." },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd." },
    { symbol: "INFY", name: "Infosys Ltd." },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd." },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd." },
    { symbol: "SBIN", name: "State Bank of India" },
    { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd." },
    { symbol: "ITC", name: "ITC Ltd." },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank Ltd." },
    { symbol: "LT", name: "Larsen & Toubro Ltd." },
    { symbol: "AXISBANK", name: "Axis Bank Ltd." },
    { symbol: "ASIANPAINT", name: "Asian Paints Ltd." },
    { symbol: "MARUTI", name: "Maruti Suzuki India Ltd." },
    { symbol: "TITAN", name: "Titan Company Ltd." },
    { symbol: "WIPRO", name: "Wipro Ltd." },
    { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries Ltd." },
    { symbol: "ULTRACEMCO", name: "UltraTech Cement Ltd." },
    { symbol: "HCLTECH", name: "HCL Technologies Ltd." },
    { symbol: "ADANIENT", name: "Adani Enterprises Ltd." },
    { symbol: "NESTLEIND", name: "Nestle India Ltd." },
    { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd." },
    { symbol: "JSWSTEEL", name: "JSW Steel Ltd." },
    { symbol: "M&M", name: "Mahindra & Mahindra Ltd." },
    { symbol: "TATASTEEL", name: "Tata Steel Ltd." },
    { symbol: "POWERGRID", name: "Power Grid Corporation of India Ltd." },
    { symbol: "NTPC", name: "NTPC Ltd." },
    { symbol: "GRASIM", name: "Grasim Industries Ltd." },
    { symbol: "TECHM", name: "Tech Mahindra Ltd." },
    { symbol: "INDUSINDBK", name: "IndusInd Bank Ltd." },
  ];

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  return stocks.map((stock) => {
    const prevClose = 100 + Math.random() * 2000;
    // Ensure we have some gainers and some non-gainers for filtering
    const gainFactor = 0.95 + Math.random() * 0.15; // Range from -5% to +10%
    const currentClose = prevClose * gainFactor;
    const percentageChange = ((currentClose - prevClose) / prevClose) * 100;
    
    return {
      ...stock,
      currentClose: parseFloat(currentClose.toFixed(2)),
      prevWeekClose: parseFloat(prevClose.toFixed(2)),
      percentageChange: parseFloat(percentageChange.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000),
      comparisonDate: lastWeek.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };
  });
};

export const MOCK_STOCKS = generateMockData();
