import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, BarChart3 } from "lucide-react"

interface StockSummaryProps {
  totalStocks: number;
  highestGain: number;
}

export function StockSummary({ totalStocks, highestGain }: StockSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="flex items-center p-6">
          <div className="bg-primary/10 p-3 rounded-full mr-4">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Stocks Meeting Criteria</p>
            <p className="text-3xl font-bold text-primary">{totalStocks}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-success shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="flex items-center p-6">
          <div className="bg-success/10 p-3 rounded-full mr-4">
            <TrendingUp className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Highest % Gain</p>
            <p className="text-3xl font-bold text-success">+{highestGain.toFixed(2)}%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
