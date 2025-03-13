import React, { useState } from "react";
import {
  Search,
  Filter,
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
                    <>
                      {format(filters.dateRange.from, "MMM dd, yyyy")} -{" "}
                      {format(filters.dateRange.to, "MMM dd, yyyy")}
                    </>
                  ) : (
                    format(filters.dateRange.from, "MMM dd, yyyy")
                  )
                ) : (
                  "Date Range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3 border-b">
                <div className="flex justify-between items-center mb-2">
                  <Select
                    value={
                      filters.dateRange?.from
                        ? format(filters.dateRange.from, "yyyy")
                        : new Date().getFullYear().toString()
                    }
                    onValueChange={(year) => {
                      const fromDate = filters.dateRange?.from
                        ? new Date(filters.dateRange.from)
                        : new Date();
                      fromDate.setFullYear(parseInt(year));
                      const toDate = filters.dateRange?.to
                        ? new Date(filters.dateRange.to)
                        : undefined;
                      handleFilterChange("dateRange", {
                        from: fromDate,
                        to: toDate,
                      });
                    }}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: 10 },
                        (_, i) => new Date().getFullYear() - i,
                      ).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={
                      filters.dateRange?.to
                        ? format(filters.dateRange.to, "yyyy")
                        : new Date().getFullYear().toString()
                    }
                    onValueChange={(year) => {
                      const toDate = filters.dateRange?.to
                        ? new Date(filters.dateRange.to)
                        : new Date();
                      toDate.setFullYear(parseInt(year));
                      const fromDate = filters.dateRange?.from
                        ? new Date(filters.dateRange.from)
                        : undefined;
                      handleFilterChange("dateRange", {
                        from: fromDate,
                        to: toDate,
                      });
                    }}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: 10 },
                        (_, i) => new Date().getFullYear() - i,
                      ).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center">
                  <Select
                    value={
                      filters.dateRange?.from
                        ? format(filters.dateRange.from, "MM")
                        : (new Date().getMonth() + 1)
                            .toString()
                            .padStart(2, "0")
                    }
                    onValueChange={(month) => {
                      const fromDate = filters.dateRange?.from
                        ? new Date(filters.dateRange.from)
                        : new Date();
                      fromDate.setMonth(parseInt(month) - 1);
                      const toDate = filters.dateRange?.to
                        ? new Date(filters.dateRange.to)
                        : undefined;
                      handleFilterChange("dateRange", {
                        from: fromDate,
                        to: toDate,
                      });
                    }}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">January</SelectItem>
                      <SelectItem value="02">February</SelectItem>
                      <SelectItem value="03">March</SelectItem>
                      <SelectItem value="04">April</SelectItem>
                      <SelectItem value="05">May</SelectItem>
                      <SelectItem value="06">June</SelectItem>
                      <SelectItem value="07">July</SelectItem>
                      <SelectItem value="08">August</SelectItem>
                      <SelectItem value="09">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={
                      filters.dateRange?.to
                        ? format(filters.dateRange.to, "MM")
                        : (new Date().getMonth() + 1)
                            .toString()
                            .padStart(2, "0")
                    }
                    onValueChange={(month) => {
                      const toDate = filters.dateRange?.to
                        ? new Date(filters.dateRange.to)
                        : new Date();
                      toDate.setMonth(parseInt(month) - 1);
                      const fromDate = filters.dateRange?.from
                        ? new Date(filters.dateRange.from)
                        : undefined;
                      handleFilterChange("dateRange", {
                        from: fromDate,
                        to: toDate,
                      });
                    }}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">January</SelectItem>
                      <SelectItem value="02">February</SelectItem>
                      <SelectItem value="03">March</SelectItem>
                      <SelectItem value="04">April</SelectItem>
                      <SelectItem value="05">May</SelectItem>
                      <SelectItem value="06">June</SelectItem>
                      <SelectItem value="07">July</SelectItem>
                      <SelectItem value="08">August</SelectItem>
                      <SelectItem value="09">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Calendar
                initialFocus
                mode="range"
                selected={filters.dateRange}
                onSelect={(range) => handleFilterChange("dateRange", range)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline" className="flex items-center gap-2">
            <div className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <ChevronRight className="h-4 w-4" />
            </div>
            <span>Date Selector</span>
          </Button>
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
