import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Map,
  Calendar,
  Download,
  Filter,
} from "lucide-react";

interface AnalyticsDashboardProps {
  data?: {
    incidentTrends?: any[];
    hotspots?: any[];
    resolutionRates?: any[];
    incidentTypes?: any[];
    severityDistribution?: any[];
  };
}

const AnalyticsDashboard = ({
  data = {
    incidentTrends: [],
    hotspots: [],
    resolutionRates: [],
    incidentTypes: [],
    severityDistribution: [],
  },
}: AnalyticsDashboardProps) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [region, setRegion] = useState("all");

  return (
    <div className="w-full h-full p-6 bg-background text-foreground">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor incident trends and key metrics
          </p>
        </div>
        <div className="flex space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="accra">Accra</SelectItem>
              <SelectItem value="kumasi">Kumasi</SelectItem>
              <SelectItem value="takoradi">Takoradi</SelectItem>
              <SelectItem value="tamale">Tamale</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => console.log("More filters clicked")}
          >
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
          <TabsTrigger value="resolution">Resolution Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Incidents
                </CardTitle>
                <CardDescription>All reported incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">1,248</div>
                  <div className="p-2 bg-green-100 text-green-800 rounded-full">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-xs text-green-600 mt-2 flex items-center">
                  <span>↑ 12% from previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Open Cases
                </CardTitle>
                <CardDescription>Unresolved incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">342</div>
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-full">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-xs text-amber-600 mt-2 flex items-center">
                  <span>↓ 5% from previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Resolution Rate
                </CardTitle>
                <CardDescription>Case completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">72.5%</div>
                  <div className="p-2 bg-blue-100 text-blue-800 rounded-full">
                    <PieChart className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-xs text-blue-600 mt-2 flex items-center">
                  <span>↑ 3% from previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Hotspot Areas
                </CardTitle>
                <CardDescription>High incident locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">24</div>
                  <div className="p-2 bg-red-100 text-red-800 rounded-full">
                    <Map className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-xs text-red-600 mt-2 flex items-center">
                  <span>↑ 8% from previous period</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incident Trends</CardTitle>
                <CardDescription>
                  Daily incident reports over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <LineChart className="h-16 w-16 mb-4" />
                  <p>Incident trend visualization would appear here</p>
                  <p className="text-sm">
                    Showing data for{" "}
                    {timeRange === "7d"
                      ? "the last 7 days"
                      : timeRange === "30d"
                        ? "the last 30 days"
                        : "the selected period"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incident Types</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <PieChart className="h-16 w-16 mb-4" />
                  <p>Incident type distribution would appear here</p>
                  <p className="text-sm">
                    Showing breakdown of incident categories
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Severity Distribution</CardTitle>
                  <CardDescription>Incidents by severity level</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => console.log("Export clicked")}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <BarChart className="h-16 w-16 mb-4" />
                  <p>Severity distribution chart would appear here</p>
                  <p className="text-sm">
                    Showing breakdown by critical, high, medium, and low
                    severity
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Timeline</CardTitle>
              <CardDescription>
                Detailed view of incidents over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                <LineChart className="h-16 w-16 mb-4" />
                <p>Detailed incident timeline would appear here</p>
                <p className="text-sm">
                  With filtering and drill-down capabilities
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hotspots" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Hotspots</CardTitle>
              <CardDescription>
                Geographic distribution of incidents
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                <Map className="h-16 w-16 mb-4" />
                <p>Heatmap visualization would appear here</p>
                <p className="text-sm">
                  Showing concentration of incidents by location
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resolution Metrics</CardTitle>
              <CardDescription>
                Case resolution performance over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                <Activity className="h-16 w-16 mb-4" />
                <p>Resolution rate metrics would appear here</p>
                <p className="text-sm">
                  Showing time to resolution and completion rates
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
