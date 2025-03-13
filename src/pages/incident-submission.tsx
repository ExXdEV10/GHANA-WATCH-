import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import IncidentSubmissionForm from "../components/incident-submission/IncidentSubmissionForm";
import { NavigationButtons } from "../components/ui/navigation-buttons";

const IncidentSubmissionPage = () => {
  const handleSubmit = (values: any) => {
    console.log("Incident submitted:", values);
    // In a real app, this would send the data to a backend API
  };

  return (
    <DashboardLayout
      pageTitle="Report an Incident"
      userName="John Doe"
      userRole="DVLA"
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Report an Incident</h1>
            <p className="text-muted-foreground mt-1">
              Help improve road safety by reporting incidents you've witnessed
            </p>
          </div>
          <NavigationButtons showNext={false} />
        </div>

        <div className="mt-6">
          <IncidentSubmissionForm onSubmit={handleSubmit} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IncidentSubmissionPage;
