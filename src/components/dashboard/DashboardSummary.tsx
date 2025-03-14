import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  onClick?: () => void;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  description = "No data available",
  icon = <Activity size={24} />,
  trend = "",
  trendUp = true,
  onClick,
}: MetricCardProps) => {
  return (
    <Card
      className="bg-white hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
      {trend && (
        <CardFooter className="pt-0">
          <span
            className={`text-xs flex items-center ${trendUp ? "text-green-500" : "text-red-500"}`}
          >
            {trendUp ? (
              <TrendingUp size={14} className="mr-1" />
            ) : (
              <TrendingUp size={14} className="mr-1 transform rotate-180" />
            )}
            {trend}
          </span>
        </CardFooter>
      )}
    </Card>
  );
};

interface IncidentItemProps {
  id: string;
  type: string;
  location: string;
  time: string;
  status: "pending" | "in-progress" | "resolved";
  onClick?: () => void;
}

const IncidentItem = ({
  id = "INC-001",
  type = "Traffic Violation",
  location = "Accra Central",
  time = "2 hours ago",
  status = "pending",
  onClick,
}: IncidentItemProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <Clock size={16} className="text-yellow-500" />;
      case "in-progress":
        return <Activity size={16} className="text-blue-500" />;
      case "resolved":
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <AlertTriangle size={16} className="text-red-500" />;
    }
  };

  return (
    <div
      className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-3">{getStatusIcon()}</div>
        <div>
          <h4 className="text-sm font-medium">{type}</h4>
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-2">{id}</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500">{time}</div>
    </div>
  );
};

interface DashboardSummaryProps {
  metrics?: {
    totalIncidents: string;
    pendingCases: string;
    resolvedToday: string;
    whistleblowerReports: string;
  };
  recentIncidents?: IncidentItemProps[];
}

const DashboardSummary = ({
  metrics = {
    totalIncidents: "1,248",
    pendingCases: "42",
    resolvedToday: "18",
    whistleblowerReports: "7",
  },
  recentIncidents = [
    {
      id: "INC-1042",
      type: "Speeding Violation",
      location: "Tema Highway",
      time: "35 minutes ago",
      status: "pending",
    },
    {
      id: "INC-1041",
      type: "Accident Report",
      location: "Kumasi Road",
      time: "1 hour ago",
      status: "in-progress",
    },
    {
      id: "INC-1040",
      type: "Illegal Parking",
      location: "Accra Mall",
      time: "2 hours ago",
      status: "resolved",
    },
    {
      id: "INC-1039",
      type: "Traffic Light Malfunction",
      location: "Circle Interchange",
      time: "3 hours ago",
      status: "in-progress",
    },
    {
      id: "INC-1038",
      type: "Drunk Driving",
      location: "East Legon",
      time: "5 hours ago",
      status: "resolved",
    },
  ],
}: DashboardSummaryProps) => {
  const navigate = useNavigate();

  const handleNavigateToIncidentMap = () => {
    navigate("/incident-map");
  };

  const handleNavigateToCaseManagement = () => {
    navigate("/case-management");
  };

  const handleNavigateToAnalytics = () => {
    navigate("/analytics");
  };

  const handleNavigateToWhistleblower = () => {
    navigate("/whistleblower");
  };

  const handleViewIncident = (incidentId: string) => {
    navigate(`/case-management?id=${incidentId}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">
          Welcome to the Road Safety Monitoring System
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Incidents"
          value={metrics.totalIncidents}
          description="All reported incidents"
          icon={<BarChart size={20} className="text-blue-500" />}
          trend="12% increase from last month"
          trendUp={true}
          onClick={handleNavigateToIncidentMap}
        />
        <MetricCard
          title="Pending Cases"
          value={metrics.pendingCases}
          description="Cases awaiting action"
          icon={<AlertTriangle size={20} className="text-yellow-500" />}
          trend="4% decrease from last week"
          trendUp={false}
          onClick={handleNavigateToCaseManagement}
        />
        <MetricCard
          title="Resolved Today"
          value={metrics.resolvedToday}
          description="Cases closed today"
          icon={<CheckCircle size={20} className="text-green-500" />}
          onClick={handleNavigateToCaseManagement}
        />
        <MetricCard
          title="Whistleblower Reports"
          value={metrics.whistleblowerReports}
          description="New confidential reports"
          icon={<Users size={20} className="text-purple-500" />}
          trend="2 new reports today"
          trendUp={true}
          onClick={handleNavigateToWhistleblower}
        />
      </div>

      {/* Recent Incidents */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
        <div className="divide-y divide-gray-100">
          {recentIncidents.map((incident, index) => (
            <IncidentItem
              key={index}
              id={incident.id}
              type={incident.type}
              location={incident.location}
              time={incident.time}
              status={incident.status}
              onClick={() => handleViewIncident(incident.id)}
            />
          ))}
        </div>
        <div className="p-4 bg-gray-50 text-center">
          <button
            className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors"
            onClick={handleNavigateToCaseManagement}
          >
            View All Incidents
          </button>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={handleNavigateToIncidentMap}
        >
          <CardContent className="p-6">
            <div className="mb-4 p-2 bg-white/20 rounded-full w-fit">
              <BarChart size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
            <p className="text-sm opacity-90 mb-4">
              View all incidents on an interactive map with filtering options
            </p>
            <button
              className="mt-2 px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToIncidentMap();
              }}
            >
              Open Map
            </button>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={handleNavigateToAnalytics}
        >
          <CardContent className="p-6">
            <div className="mb-4 p-2 bg-white/20 rounded-full w-fit">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-sm opacity-90 mb-4">
              Access detailed analytics and generate custom reports
            </p>
            <button
              className="mt-2 px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToAnalytics();
              }}
            >
              View Analytics
            </button>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={handleNavigateToCaseManagement}
        >
          <CardContent className="p-6">
            <div className="mb-4 p-2 bg-white/20 rounded-full w-fit">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Case Management</h3>
            <p className="text-sm opacity-90 mb-4">
              Manage and track cases through their entire lifecycle
            </p>
            <button
              className="mt-2 px-4 py-2 bg-white text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToCaseManagement();
              }}
            >
              Manage Cases
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSummary;
