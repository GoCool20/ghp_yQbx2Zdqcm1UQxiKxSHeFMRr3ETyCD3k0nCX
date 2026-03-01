import { Info, ShieldAlert, CalendarRange } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-8 py-12 mx-auto max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-primary">About NSE Weekly Gainers</h2>
          <p className="text-muted-foreground">Understanding our data and methodology</p>
        </div>

        <div className="grid gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <CalendarRange className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>How the Weekly Comparison Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <p className="text-muted-foreground leading-relaxed">
                The NSE Weekly Gainers tool compares the current closing price of a stock against its closing price on the same weekday exactly one week ago.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li><strong>Current Price:</strong> The latest available market closing price.</li>
                <li><strong>Reference Price:</strong> The closing price from 7 days prior. If the market was closed that day, the previous available trading day's close is used.</li>
                <li><strong>Gain Calculation:</strong> Percentage change = ((Current - Previous) / Previous) * 100.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We only display stocks that have shown a gain of 2% or more by default, highlighting those with significant momentum.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-destructive/20">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-destructive/10 p-2 rounded-full">
                <ShieldAlert className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>Market Risk Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-destructive/5 p-4 rounded-md border border-destructive/10 text-sm text-destructive font-medium leading-relaxed">
                Stock market investments are subject to market risks. Past performance, such as weekly gains, is not necessarily indicative of future results. The data provided on this website is for informational purposes only and does not constitute financial advice. Always consult with a certified financial advisor before making investment decisions.
              </div>
              <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                NSE Weekly Gainers is a data visualization tool and does not guarantee the accuracy, completeness, or timeliness of the information displayed. We are not liable for any losses incurred based on the use of this data.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-accent/10 p-2 rounded-full">
                <Info className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Our Goal</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to provide retail investors with a clean, distraction-free environment to identify momentum in the Indian stock market. By focusing purely on weekly performance, we help users spot short-term trends without the noise of complex technical analysis platforms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
