import React, { useState } from "react";
import { Calendar, FileText, Download, FileDown } from "lucide-react";
import { format } from "date-fns";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";

interface ReportGeneratorProps {
  onGenerateReport?: (reportConfig: ReportConfig) => void;
  isLoading?: boolean;
}

interface ReportConfig {
  reportType: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  format: string;
  includeMetrics: string[];
  location?: string;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  onGenerateReport = () => {},
  isLoading = false,
}) => {
  const [reportType, setReportType] = useState("incidents");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "incidents",
    "resolutions",
    "response_time",
  ]);
  const [location, setLocation] = useState("");

  // Default date range (last 30 days)
  const defaultDateRange = {
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  };

  const [dateRange, setDateRange] = useState(defaultDateRange);

  const handleMetricToggle = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  const handleGenerateReport = () => {
    const reportConfig: ReportConfig = {
      reportType,
      dateRange,
      format: reportFormat,
      includeMetrics: selectedMetrics,
      location: location || undefined,
    };

    onGenerateReport(reportConfig);
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Report Generator
        </CardTitle>
        <CardDescription>
          Generate custom reports with specific parameters
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Standard Reports</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select
                defaultValue="monthly"
                onValueChange={(value) => setReportType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                  <SelectItem value="quarterly">Quarterly Analysis</SelectItem>
                  <SelectItem value="annual">Annual Report</SelectItem>
                  <SelectItem value="incident_hotspots">
                    Incident Hotspots
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => {
                  handleGenerateReport();
                  console.log("Generate standard report clicked");
                }}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Generate Report
                  </span>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select
                defaultValue="incidents"
                onValueChange={(value) => setReportType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incidents">Incident Reports</SelectItem>
                  <SelectItem value="whistleblower">
                    Whistleblower Reports
                  </SelectItem>
                  <SelectItem value="resolutions">Case Resolutions</SelectItem>
                  <SelectItem value="officer_performance">
                    Officer Performance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <DatePickerWithRange />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location (Optional)</label>
              <Input
                placeholder="Enter location or region"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Include Metrics</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="incidents"
                    checked={selectedMetrics.includes("incidents")}
                    onCheckedChange={() => handleMetricToggle("incidents")}
                  />
                  <label htmlFor="incidents" className="text-sm">
                    Incidents
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="resolutions"
                    checked={selectedMetrics.includes("resolutions")}
                    onCheckedChange={() => handleMetricToggle("resolutions")}
                  />
                  <label htmlFor="resolutions" className="text-sm">
                    Resolutions
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="response_time"
                    checked={selectedMetrics.includes("response_time")}
                    onCheckedChange={() => handleMetricToggle("response_time")}
                  />
                  <label htmlFor="response_time" className="text-sm">
                    Response Time
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="severity"
                    checked={selectedMetrics.includes("severity")}
                    onCheckedChange={() => handleMetricToggle("severity")}
                  />
                  <label htmlFor="severity" className="text-sm">
                    Severity
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select
                defaultValue="pdf"
                onValueChange={(value) => setReportFormat(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => {
                handleGenerateReport();
                console.log(
                  "Generate custom report clicked with metrics:",
                  selectedMetrics,
                );
              }}
              className="w-full mt-4"
              disabled={isLoading || selectedMetrics.length === 0}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Generating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  Generate Custom Report
                </span>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground">
          Last generated: {format(new Date(), "MMM dd, yyyy")}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => console.log("View History clicked")}
        >
          <Calendar className="h-4 w-4 mr-2" />
          View History
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportGenerator;
