import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  AlertTriangle,
  Calendar as CalendarIcon,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

interface MapFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  incidentType: string;
  severity: string;
  location: string;
  dateRange: DateRange | undefined;
}

const MapFilters = ({ onFilterChange = () => {} }: MapFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    incidentType: "",
    severity: "",
    location: "",
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full p-4 bg-white border-b border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
      <div className="relative w-full md:w-1/4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search incidents..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        <Select
          value={filters.incidentType}
          onValueChange={(value) => handleFilterChange("incidentType", value)}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Incident Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accident">Accident</SelectItem>
            <SelectItem value="hazard">Road Hazard</SelectItem>
            <SelectItem value="violation">Traffic Violation</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.severity}
          onValueChange={(value) => handleFilterChange("severity", value)}
        >
          <SelectTrigger className="w-[180px]">
            <AlertTriangle className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.location}
          onValueChange={(value) => handleFilterChange("location", value)}
        >
          <SelectTrigger className="w-[180px]">
            <MapPin className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accra">Accra</SelectItem>
            <SelectItem value="kumasi">Kumasi</SelectItem>
            <SelectItem value="takoradi">Takoradi</SelectItem>
            <SelectItem value="tamale">Tamale</SelectItem>
            <SelectItem value="cape-coast">Cape Coast</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
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
                <span>Date Range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange?.from}
              selected={filters.dateRange}
              onSelect={(range) => handleFilterChange("dateRange", range)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button
        className="w-full md:w-auto"
        onClick={() => {
          onFilterChange(filters);
          console.log("Filters applied:", filters);
        }}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default MapFilters;
