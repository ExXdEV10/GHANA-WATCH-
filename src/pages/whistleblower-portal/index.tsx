import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  FileText,
  Shield,
  User,
  Clock,
  CheckCircle,
} from "lucide-react";

const WhistleblowerDashboard = () => {
  // Mock data for recent reports
  const recentReports = [
    {
      id: "WB-2023-001",
      title: "Unroadworthy Vehicle on Highway",
      date: "2023-10-15",
      status: "under-review",
    },
    {
      id: "WB-2023-002",
      title: "Reckless Driving Near School Zone",
      date: "2023-10-18",
      status: "action-taken",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "under-review":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
            Under Review
          </span>
        );
      case "action-taken":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Action Taken
          </span>
        );
      case "closed":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            Closed
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            Submitted
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                Welcome to the Whistleblower Portal
              </h2>
              <p className="text-blue-100 mb-4">
                Your reports help make our roads safer. All submissions are
                confidential and secure.
              </p>
              <div className="flex space-x-4">
                <Button
                  asChild
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  <Link to="/whistleblower-portal/report">Report a Case</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white text-white hover:bg-blue-600"
                >
                  <Link to="/whistleblower-portal/my-reports">
                    Track My Reports
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <Shield className="h-24 w-24 text-blue-100 opacity-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you might want to perform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/whistleblower-portal/report">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report a New Case
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/whistleblower-portal/my-reports">
                <FileText className="mr-2 h-4 w-4" />
                View My Reports
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/whistleblower-portal/profile">
                <User className="mr-2 h-4 w-4" />
                Update Profile
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your most recent submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentReports.length > 0 ? (
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{report.date}</span>
                        <span className="mx-2">•</span>
                        <span>{report.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(report.status)}
                      <Button asChild size="sm" variant="ghost">
                        <Link
                          to={`/whistleblower-portal/my-reports/${report.id}`}
                        >
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  No reports yet
                </h3>
                <p className="text-gray-500 mt-1">
                  You haven't submitted any reports yet.
                </p>
                <Button asChild className="mt-4">
                  <Link to="/whistleblower-portal/report">
                    Create Your First Report
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Reports
                </p>
                <h3 className="text-3xl font-bold">2</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Actions Taken
                </p>
                <h3 className="text-3xl font-bold">1</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Under Review
                </p>
                <h3 className="text-3xl font-bold">1</h3>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-gray-400 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900">
                Security & Confidentiality
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                All reports are encrypted and your identity is protected. We
                take your privacy seriously.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhistleblowerDashboard;
