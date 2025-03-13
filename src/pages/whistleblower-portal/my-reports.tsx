import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  FileText,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  date: string;
  status: "under-review" | "action-taken" | "closed" | "submitted";
  priority: "normal" | "high" | "urgent";
  description: string;
  location: string;
  hasUpdates: boolean;
}

const MyReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for reports
  const reports: Report[] = [
    {
      id: "WB-2023-001",
      title: "Unroadworthy Vehicle on Highway",
      date: "2023-10-15",
      status: "under-review",
      priority: "high",
      description:
        "Large truck with visibly worn tires and smoke coming from the exhaust",
      location: "Accra-Tema Motorway, near Tema toll booth",
      hasUpdates: true,
    },
    {
      id: "WB-2023-002",
      title: "Reckless Driving Near School Zone",
      date: "2023-10-18",
      status: "action-taken",
      priority: "urgent",
      description:
        "Driver speeding and overtaking dangerously near a school during dismissal time",
      location: "Oxford Street, near International School",
      hasUpdates: false,
    },
  ];

  const filteredReports = reports.filter((report) => {
    // Filter by search query
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by tab
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "under-review")
      return matchesSearch && report.status === "under-review";
    if (activeTab === "action-taken")
      return matchesSearch && report.status === "action-taken";
    if (activeTab === "closed")
      return matchesSearch && report.status === "closed";

    return matchesSearch;
  });

  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "under-review":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" /> Under Review
          </Badge>
        );
      case "action-taken":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
          >
            <CheckCircle className="h-3 w-3" /> Action Taken
          </Badge>
        );
      case "closed":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1"
          >
            Closed
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
          >
            Submitted
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: Report["priority"]) => {
    switch (priority) {
      case "urgent":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"
          >
            <AlertTriangle className="h-3 w-3" /> Urgent
          </Badge>
        );
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1"
          >
            High
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1"
          >
            Normal
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>My Reports</CardTitle>
              <CardDescription>
                Track and manage your submitted reports
              </CardDescription>
            </div>
            <Button asChild>
              <Link to="/whistleblower-portal/report">Submit New Report</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports by ID, title, or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="under-review">Under Review</TabsTrigger>
              <TabsTrigger value="action-taken">Action Taken</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {renderReportsList(filteredReports)}
            </TabsContent>

            <TabsContent value="under-review" className="space-y-4">
              {renderReportsList(filteredReports)}
            </TabsContent>

            <TabsContent value="action-taken" className="space-y-4">
              {renderReportsList(filteredReports)}
            </TabsContent>

            <TabsContent value="closed" className="space-y-4">
              {renderReportsList(filteredReports)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  function renderReportsList(reports: Report[]) {
    if (reports.length === 0) {
      return (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">
            No reports found
          </h3>
          <p className="text-gray-500 mt-1">
            {searchQuery
              ? "Try adjusting your search query"
              : "You don't have any reports in this category yet"}
          </p>
          {!searchQuery && (
            <Button asChild className="mt-4">
              <Link to="/whistleblower-portal/report">Submit a Report</Link>
            </Button>
          )}
        </div>
      );
    }

    return reports.map((report) => (
      <Card key={report.id} className="overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{report.title}</h3>
                {report.hasUpdates && (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    New Update
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-500">
                <span>{report.id}</span>
                <span>•</span>
                <span>{report.date}</span>
                <span>•</span>
                <span className="truncate max-w-[200px]">
                  {report.location}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {getStatusBadge(report.status)}
              {getPriorityBadge(report.priority)}
            </div>
          </div>

          <Separator className="my-4" />

          <p className="text-gray-700 mb-4">{report.description}</p>

          <div className="flex flex-wrap justify-end gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Link to={`/whistleblower-portal/my-reports/${report.id}`}>
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Link to={`/whistleblower-portal/my-reports/${report.id}/update`}>
                <MessageSquare className="h-4 w-4" />
                Add Update
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    ));
  }
};

export default MyReports;
