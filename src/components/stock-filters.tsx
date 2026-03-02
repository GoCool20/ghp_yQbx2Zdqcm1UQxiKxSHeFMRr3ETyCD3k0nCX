import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface StockFiltersProps {
  minGain: number;
  setMinGain: (val: number) => void;
  search: string;
  setSearch: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export function StockFilters({ minGain, setMinGain, search, setSearch, sortBy, setSortBy }: StockFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 bg-card p-5 md:p-6 rounded-lg border shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="minGain" className="text-sm font-semibold">Min % Gain</Label>
        <Input
          id="minGain"
          type="number"
          step="0.1"
          value={minGain}
          onChange={(e) => setMinGain(parseFloat(e.target.value) || 0)}
          className="bg-background h-10"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-semibold">Search by Symbol</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="e.g. RELIANCE"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-background h-10"
          />
        </div>
      </div>
      
      <div className="space-y-2 sm:col-span-2 lg:col-span-1">
        <Label htmlFor="sort" className="text-sm font-semibold">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger id="sort" className="bg-background h-10">
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gain_desc">Highest Gain</SelectItem>
            <SelectItem value="gain_asc">Lowest Gain</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
