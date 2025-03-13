import React, { useState } from "react";
import CaseTable from "../components/case-management/CaseTable";
import CaseFilters from "../components/case-management/CaseFilters";
import CaseDetail from "../components/case-management/CaseDetail";
import { NavigationButtons } from "../components/ui/navigation-buttons";

const CaseManagement = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [filters, setFilters] = useState({});

  const handleViewCase = (caseId: string) => {
    setSelectedCaseId(caseId);
  };

  const handleCloseCase = () => {
    setSelectedCaseId(null);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, this would trigger a data fetch with the new filters
    console.log("Filters changed:", newFilters);
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Case Management
              </h1>
              <p className="text-muted-foreground">
                Track and manage incident reports and cases from submission to
                resolution.
              </p>
            </div>
            <NavigationButtons showNext={true} nextPath="/analytics" />
          </div>

          <CaseFilters onFilterChange={handleFilterChange} />

          <div className="mt-6">
            <CaseTable
              onViewCase={handleViewCase}
              onEditCase={handleViewCase}
              onAssignOfficer={() => {}}
            />
          </div>
        </div>
      </div>

      {selectedCaseId && (
        <div className="w-1/3 border-l border-border">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Case Details</h2>
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={handleCloseCase}
            >
              Close
            </button>
          </div>
          <CaseDetail
            caseId={selectedCaseId}
            // In a real app, you would fetch the case details based on the ID
          />
        </div>
      )}
    </div>
  );
};

export default CaseManagement;
