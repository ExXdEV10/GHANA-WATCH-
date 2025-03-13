import React from "react";
import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";
import ReportGenerator from "../components/analytics/ReportGenerator";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import { NavigationButtons } from "../components/ui/navigation-buttons";

const AnalyticsPage = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar userName="Sarah Johnson" userRole="DVLA" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Analytics & Reporting" />
        <div className="flex flex-1 overflow-auto p-6">
          <div className="flex-1 space-y-6">
            <div className="flex justify-end mb-4">
              <NavigationButtons showNext={true} nextPath="/whistleblower" />
            </div>
            <AnalyticsDashboard
              data={{
                incidentTrends: [],
                hotspots: [],
                resolutionRates: [],
                incidentTypes: [],
                severityDistribution: [],
              }}
            />
          </div>
          <div className="w-[400px] ml-6 flex-shrink-0">
            <ReportGenerator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
