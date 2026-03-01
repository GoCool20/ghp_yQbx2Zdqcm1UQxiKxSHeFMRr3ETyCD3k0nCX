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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-card p-6 rounded-lg border shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="minGain" className="text-sm font-semibold">Min % Gain</Label>
        <Input
          id="minGain"
          type="number"
          step="0.1"
          value={minGain}
          onChange={(e) => setMinGain(parseFloat(e.target.value) || 0)}
          className="bg-background"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-semibold">Search by Symbol</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="e.g. RELIANCE"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sort" className="text-sm font-semibold">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger id="sort" className="bg-background">
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gain_desc">Highest Gain</SelectItem>
            <SelectItem value="gain_asc">Lowest Gain</SelectItem>
            <SelectItem value="volume_desc">Highest Volume</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
