import React, { useState } from "react";
import { Search, Filter, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface CaseFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  status: string;
  type: string;
  severity: string;
  assignedTo: string;
  region: string;
  dateRange: DateRange | undefined;
  activeFilters: string[];
}

const CaseFilters: React.FC<CaseFiltersProps> = ({
  onFilterChange = () => {},
}) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "",
    type: "",
    severity: "",
    assignedTo: "",
    region: "",
    dateRange: undefined,
    activeFilters: [],
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };

    // Update active filters list
    const activeFilters = [];
    if (newFilters.status) activeFilters.push(`Status: ${newFilters.status}`);
    if (newFilters.type) activeFilters.push(`Type: ${newFilters.type}`);
    if (newFilters.severity)
      activeFilters.push(`Severity: ${newFilters.severity}`);
    if (newFilters.assignedTo)
      activeFilters.push(`Assigned to: ${newFilters.assignedTo}`);
    if (newFilters.region) activeFilters.push(`Region: ${newFilters.region}`);
    if (newFilters.dateRange?.from) {
      const dateLabel = newFilters.dateRange.to
        ? `Date: ${format(newFilters.dateRange.from, "MMM dd, yyyy")} - ${format(newFilters.dateRange.to, "MMM dd, yyyy")}`
        : `Date: ${format(newFilters.dateRange.from, "MMM dd, yyyy")}`;
      activeFilters.push(dateLabel);
    }

    newFilters.activeFilters = activeFilters;
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilter = (filterToRemove: string) => {
    const filterType = filterToRemove.split(":")[0].trim().toLowerCase();

    const newFilters = { ...filters };
    if (filterType === "status") newFilters.status = "";
    if (filterType === "type") newFilters.type = "";
    if (filterType === "severity") newFilters.severity = "";
    if (filterType === "assigned to") newFilters.assignedTo = "";
    if (filterType === "region") newFilters.region = "";
    if (filterType === "date") newFilters.dateRange = undefined;

    // Update active filters
    newFilters.activeFilters = newFilters.activeFilters.filter(
      (filter) => !filter.startsWith(filterToRemove.split(":")[0]),
    );

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const newFilters = {
      ...filters,
      status: "",
      type: "",
      severity: "",
      assignedTo: "",
      region: "",
      dateRange: undefined,
      activeFilters: [],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm border border-gray-200">
      <div className="flex flex-col space-y-4">
        {/* Search and filter row */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search cases by ID, location, or description"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Incident Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accident">Accident</SelectItem>
              <SelectItem value="traffic-violation">
                Traffic Violation
              </SelectItem>
              <SelectItem value="road-damage">Road Damage</SelectItem>
              <SelectItem value="signal-malfunction">
                Signal Malfunction
              </SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.severity}
            onValueChange={(value) => handleFilterChange("severity", value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.assignedTo}
            onValueChange={(value) => handleFilterChange("assignedTo", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Assigned Officer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="officer1">Officer Johnson</SelectItem>
              <SelectItem value="officer2">Officer Williams</SelectItem>
              <SelectItem value="officer3">Officer Davis</SelectItem>
              <SelectItem value="officer4">Officer Rodriguez</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.region}
            onValueChange={(value) => handleFilterChange("region", value)}
          >
            <SelectTrigger className="w-[150px]">
              <MapPin className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accra">Accra</SelectItem>
              <SelectItem value="kumasi">Kumasi</SelectItem>
              <SelectItem value="takoradi">Takoradi</SelectItem>
              <SelectItem value="tamale">Tamale</SelectItem>
              <SelectItem value="cape-coast">Cape Coast</SelectItem>
              <SelectItem value="ho">Ho</SelectItem>
              <SelectItem value="koforidua">Koforidua</SelectItem>
              <SelectItem value="sunyani">Sunyani</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                {filters.dateRange?.from ? (
                  filters.dateRange.to ? (
                    <>Date Range</>
                  ) : (
                    format(filters.dateRange.from, "MMM dd, yyyy")
                  )
                ) : (
                  "Date Range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={filters.dateRange}
                onSelect={(range) => handleFilterChange("dateRange", range)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Active filters */}
        {filters.activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-500">Active filters:</span>
            </div>

            {filters.activeFilters.map((filter, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                {filter}
                <button
                  onClick={() => clearFilter(filter)}
                  className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearAllFilters();
                console.log("All filters cleared");
              }}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseFilters;
