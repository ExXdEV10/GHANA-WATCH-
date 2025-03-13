import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import WhistleblowerTable from "../components/whistleblower/WhistleblowerTable";
import ReportDetail from "../components/whistleblower/ReportDetail";
import { NavigationButtons } from "../components/ui/navigation-buttons";
import { BackButton } from "../components/ui/back-button";

const WhistleblowerPage = () => {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const handleViewReport = (id: string) => {
    setSelectedReportId(id);
  };

  const handleCloseDetail = () => {
    setSelectedReportId(null);
  };

  const handleVerifyReport = (id: string) => {
    console.log("Verifying report:", id);
    // In a real app, this would call an API to update the report status
  };

  const handleRejectReport = (id: string) => {
    console.log("Rejecting report:", id);
    // In a real app, this would call an API to update the report status
  };

  const handleFlagForInvestigation = (id: string) => {
    console.log("Flagging report for investigation:", id);
    // In a real app, this would call an API to update the report status
  };

  return (
    <div className="bg-background min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Whistleblower Portal" />
        <div className="p-6 space-y-6 flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Whistleblower Portal</h1>
              <p className="text-muted-foreground mt-1">
                Manage and verify confidential reports with appropriate privacy
                controls
              </p>
            </div>
            <NavigationButtons showNext={false} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {!selectedReportId ? (
              <WhistleblowerTable
                onViewReport={handleViewReport}
                onVerifyReport={handleVerifyReport}
                onRejectReport={handleRejectReport}
                onFlagForInvestigation={handleFlagForInvestigation}
              />
            ) : (
              <div className="relative">
                <div className="flex justify-between items-center mb-4">
                  <BackButton
                    label="Back to Reports"
                    onClick={handleCloseDetail}
                  />
                </div>
                <ReportDetail reportId={selectedReportId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhistleblowerPage;
