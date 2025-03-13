import React, { useState } from "react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  UserCheck,
  FileText,
} from "lucide-react";

interface Case {
  id: string;
  date: string;
  type: string;
  location: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "New" | "In Progress" | "Under Investigation" | "Resolved" | "Closed";
  assignedOfficer: string | null;
}

interface CaseTableProps {
  cases?: Case[];
  onViewCase?: (caseId: string) => void;
  onEditCase?: (caseId: string) => void;
  onAssignOfficer?: (caseId: string) => void;
}

const CaseTable = ({
  cases = defaultCases,
  onViewCase = () => {},
  onEditCase = () => {},
  onAssignOfficer = () => {},
}: CaseTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(cases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleCases = cases.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleRowSelection = (caseId: string) => {
    setSelectedRows((prev) =>
      prev.includes(caseId)
        ? prev.filter((id) => id !== caseId)
        : [...prev, caseId],
    );
  };

  const getSeverityBadgeVariant = (severity: Case["severity"]) => {
    switch (severity) {
      case "Low":
        return "secondary";
      case "Medium":
        return "default";
      case "High":
        return "destructive";
      case "Critical":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: Case["status"]) => {
    switch (status) {
      case "New":
        return "secondary";
      case "In Progress":
        return "default";
      case "Under Investigation":
        return "default";
      case "Resolved":
        return "outline";
      case "Closed":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Case Management</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedRows.length} selected
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={selectedRows.length === 0}
            onClick={() =>
              console.log("Bulk actions clicked for", selectedRows)
            }
          >
            Bulk Actions
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>List of road safety incident cases</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                onChange={() => {
                  if (selectedRows.length === visibleCases.length) {
                    setSelectedRows([]);
                  } else {
                    setSelectedRows(visibleCases.map((c) => c.id));
                  }
                }}
                checked={
                  selectedRows.length === visibleCases.length &&
                  visibleCases.length > 0
                }
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Officer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleCases.length > 0 ? (
            visibleCases.map((caseItem) => (
              <TableRow
                key={caseItem.id}
                data-state={
                  selectedRows.includes(caseItem.id) ? "selected" : undefined
                }
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={selectedRows.includes(caseItem.id)}
                    onChange={() => toggleRowSelection(caseItem.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{caseItem.id}</TableCell>
                <TableCell>{caseItem.date}</TableCell>
                <TableCell>{caseItem.type}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {caseItem.location}
                </TableCell>
                <TableCell>
                  <Badge variant={getSeverityBadgeVariant(caseItem.severity)}>
                    {caseItem.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(caseItem.status)}>
                    {caseItem.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {caseItem.assignedOfficer || (
                    <span className="text-muted-foreground italic text-xs">
                      Not assigned
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewCase(caseItem.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditCase(caseItem.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit case
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onAssignOfficer(caseItem.id)}
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Assign officer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-10">
                No cases found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, cases.length)} of {cases.length}{" "}
          entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handlePageChange(currentPage - 1);
              console.log(
                "Previous page clicked, navigating to page",
                currentPage - 1,
              );
            }}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handlePageChange(currentPage + 1);
              console.log(
                "Next page clicked, navigating to page",
                currentPage + 1,
              );
            }}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Default mock data
const defaultCases: Case[] = [
  {
    id: "CS-2023-001",
    date: "2023-06-15",
    type: "Traffic Violation",
    location: "Accra Central, Near Makola Market",
    severity: "Medium",
    status: "In Progress",
    assignedOfficer: "Officer James Mensah",
  },
  {
    id: "CS-2023-002",
    date: "2023-06-18",
    type: "Accident",
    location: "Tema Motorway, KM 12",
    severity: "High",
    status: "Under Investigation",
    assignedOfficer: "Officer Sarah Addo",
  },
  {
    id: "CS-2023-003",
    date: "2023-06-20",
    type: "Reckless Driving",
    location: "Spintex Road, Near Ecobank",
    severity: "Medium",
    status: "New",
    assignedOfficer: null,
  },
  {
    id: "CS-2023-004",
    date: "2023-06-22",
    type: "Accident",
    location: "Circle Interchange",
    severity: "Critical",
    status: "In Progress",
    assignedOfficer: "Officer Daniel Owusu",
  },
  {
    id: "CS-2023-005",
    date: "2023-06-25",
    type: "Traffic Violation",
    location: "East Legon, American House Junction",
    severity: "Low",
    status: "Resolved",
    assignedOfficer: "Officer Priscilla Asante",
  },
  {
    id: "CS-2023-006",
    date: "2023-06-28",
    type: "Drunk Driving",
    location: "Osu, Oxford Street",
    severity: "High",
    status: "Under Investigation",
    assignedOfficer: "Officer Michael Tetteh",
  },
  {
    id: "CS-2023-007",
    date: "2023-07-01",
    type: "Accident",
    location: "Kasoa Highway, Near Toll Booth",
    severity: "Medium",
    status: "New",
    assignedOfficer: null,
  },
  {
    id: "CS-2023-008",
    date: "2023-07-03",
    type: "Traffic Violation",
    location: "Achimota, Near Achimota School",
    severity: "Low",
    status: "Closed",
    assignedOfficer: "Officer Emmanuel Darko",
  },
  {
    id: "CS-2023-009",
    date: "2023-07-05",
    type: "Reckless Driving",
    location: "Airport Residential Area",
    severity: "Medium",
    status: "In Progress",
    assignedOfficer: "Officer Abigail Mensah",
  },
  {
    id: "CS-2023-010",
    date: "2023-07-08",
    type: "Accident",
    location: "Teshie-Nungua Road",
    severity: "High",
    status: "Under Investigation",
    assignedOfficer: "Officer Richard Armah",
  },
  {
    id: "CS-2023-011",
    date: "2023-07-10",
    type: "Traffic Violation",
    location: "Madina Market Area",
    severity: "Low",
    status: "Resolved",
    assignedOfficer: "Officer Victoria Addo",
  },
  {
    id: "CS-2023-012",
    date: "2023-07-12",
    type: "Drunk Driving",
    location: "Lapaz, Near Abeka Junction",
    severity: "High",
    status: "In Progress",
    assignedOfficer: "Officer Samuel Boateng",
  },
];

export default CaseTable;
