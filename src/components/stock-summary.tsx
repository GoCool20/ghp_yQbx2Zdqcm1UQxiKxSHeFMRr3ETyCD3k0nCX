import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, BarChart3 } from "lucide-react"

interface StockSummaryProps {
  totalStocks: number;
  highestGain: number;
}

export function StockSummary({ totalStocks, highestGain }: StockSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <CardContent className="flex items-center p-5 md:p-6">
          <div className="bg-primary/10 p-3 rounded-full mr-4 shrink-0">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm font-medium text-muted-foreground truncate">Stocks Meeting Criteria</p>
            <p className="text-2xl md:text-3xl font-bold text-primary">{totalStocks}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-success shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <CardContent className="flex items-center p-5 md:p-6">
          <div className="bg-success/10 p-3 rounded-full mr-4 shrink-0">
            <TrendingUp className="h-6 w-6 text-success" />
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm font-medium text-muted-foreground truncate">Highest % Gain</p>
            <p className="text-2xl md:text-3xl font-bold text-success">+{highestGain.toFixed(2)}%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
