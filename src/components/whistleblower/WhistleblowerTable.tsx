import React, { useState } from "react";
import {
  Eye,
  MoreHorizontal,
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WhistleblowerReport {
  id: string;
  date: Date;
  type: string;
  location: string;
  status: "pending" | "verified" | "investigating" | "rejected";
  severity: "low" | "medium" | "high";
  anonymous: boolean;
  description: string;
}

interface WhistleblowerTableProps {
  reports?: WhistleblowerReport[];
  onViewReport?: (id: string) => void;
  onVerifyReport?: (id: string) => void;
  onRejectReport?: (id: string) => void;
  onFlagForInvestigation?: (id: string) => void;
}

const WhistleblowerTable = ({
  reports = defaultReports,
  onViewReport = () => {},
  onVerifyReport = () => {},
  onRejectReport = () => {},
  onFlagForInvestigation = () => {},
}: WhistleblowerTableProps) => {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredReports = reports.filter((report) => {
    // Apply search filter
    const matchesSearch =
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply status filter
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleSelectReport = (id: string) => {
    setSelectedReports((prev) =>
      prev.includes(id)
        ? prev.filter((reportId) => reportId !== id)
        : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map((report) => report.id));
    }
  };

  const getStatusBadge = (status: WhistleblowerReport["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "verified":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Verified
          </Badge>
        );
      case "investigating":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-blue-500 text-blue-500"
          >
            <Shield className="h-3 w-3" /> Investigating
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getSeverityBadge = (severity: WhistleblowerReport["severity"]) => {
    switch (severity) {
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Low
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Medium
          </Badge>
        );
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            High
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Whistleblower Reports</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage and verify confidential reports with appropriate privacy
          controls
        </p>
      </div>

      <div className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-gray-200">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search reports..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
            onClick={() => console.log("Export CSV clicked")}
          >
            Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedReports.length === filteredReports.length &&
                    filteredReports.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Anonymous</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={() => toggleSelectReport(report.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{format(report.date, "MMM dd, yyyy")}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.location}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                  <TableCell>{report.anonymous ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewReport(report.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onViewReport(report.id)}
                          >
                            View Details
                          </DropdownMenuItem>
                          {report.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => onVerifyReport(report.id)}
                              >
                                Verify Report
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onFlagForInvestigation(report.id)
                                }
                              >
                                Flag for Investigation
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onRejectReport(report.id)}
                              >
                                Reject Report
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption>
            Showing {filteredReports.length} of {reports.length} reports
          </TableCaption>
        </Table>
      </div>
    </div>
  );
};

// Default mock data
const defaultReports: WhistleblowerReport[] = [
  {
    id: "WB-2023-001",
    date: new Date("2023-10-15"),
    type: "Traffic Violation",
    location: "Accra Central",
    status: "pending",
    severity: "medium",
    anonymous: true,
    description:
      "Multiple vehicles consistently running red lights at major intersection",
  },
  {
    id: "WB-2023-002",
    date: new Date("2023-10-18"),
    type: "Bribery",
    location: "Kumasi",
    status: "verified",
    severity: "high",
    anonymous: true,
    description:
      "Officer soliciting bribes from commercial drivers at checkpoint",
  },
  {
    id: "WB-2023-003",
    date: new Date("2023-10-20"),
    type: "License Fraud",
    location: "Tamale",
    status: "investigating",
    severity: "high",
    anonymous: false,
    description: "Suspected fake license operation in the area",
  },
  {
    id: "WB-2023-004",
    date: new Date("2023-10-22"),
    type: "Vehicle Registration",
    location: "Takoradi",
    status: "rejected",
    severity: "low",
    anonymous: false,
    description: "Complaint about registration process delays",
  },
  {
    id: "WB-2023-005",
    date: new Date("2023-10-25"),
    type: "Road Hazard",
    location: "Cape Coast",
    status: "pending",
    severity: "medium",
    anonymous: true,
    description: "Dangerous pothole causing accidents on main highway",
  },
];

export default WhistleblowerTable;
