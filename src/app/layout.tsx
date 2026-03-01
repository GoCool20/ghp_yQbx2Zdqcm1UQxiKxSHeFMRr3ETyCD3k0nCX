import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'NSE Weekly Gainers | Stock Performance Tracker',
  description: 'Simple dashboard tracking stocks with over 2% weekly gains.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background">
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto max-w-7xl">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-primary font-headline">NSE Weekly Gainers</h1>
                <p className="text-xs text-muted-foreground">Stocks up more than 2% compared to last week</p>
              </div>
              <nav className="flex items-center gap-6">
                <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
                <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8 mx-auto max-w-7xl">
              <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} NSE Weekly Gainers. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Data is for informational purposes only.
              </p>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
