import React, { useState } from "react";
import MapView from "../components/incident-map/MapView";
import MapFilters from "../components/incident-map/MapFilters";
import IncidentDetailPanel from "../components/incident-map/IncidentDetailPanel";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import { NavigationButtons } from "../components/ui/navigation-buttons";

interface Incident {
  id: string;
  latitude: number;
  longitude: number;
  type: "accident" | "hazard" | "traffic" | "other";
  severity: "low" | "medium" | "high";
  timestamp: string;
  description: string;
  location: string;
}

const IncidentMap = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null,
  );
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});

  // Sample incidents data
  const incidents = [
    {
      id: "1",
      latitude: 5.6037,
      longitude: -0.187,
      type: "accident",
      severity: "high",
      timestamp: "2023-06-15T10:30:00Z",
      description: "Multi-vehicle collision on main highway",
      location: "Accra Ring Road, near Mall intersection",
    },
    {
      id: "2",
      latitude: 5.6137,
      longitude: -0.197,
      type: "hazard",
      severity: "medium",
      timestamp: "2023-06-15T09:15:00Z",
      description: "Road debris causing traffic slowdown",
      location: "Tema Motorway, 2km from toll booth",
    },
    {
      id: "3",
      latitude: 5.5937,
      longitude: -0.177,
      type: "traffic",
      severity: "low",
      timestamp: "2023-06-15T08:45:00Z",
      description: "Heavy traffic due to road construction",
      location: "Liberation Road, near 37 Military Hospital",
    },
  ];

  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsDetailPanelOpen(true);
  };

  const handleCloseDetailPanel = () => {
    setIsDetailPanelOpen(false);
  };

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    // In a real implementation, this would filter the incidents based on the applied filters
    console.log("Filters applied:", filters);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Interactive Incident Map" />
        <div className="flex-1 overflow-auto p-6">
          <div className="flex flex-col h-full space-y-4">
            <div className="flex justify-between items-center">
              <MapFilters onFilterChange={handleFilterChange} />
              <NavigationButtons showNext={true} nextPath="/case-management" />
            </div>
            <div className="flex-1">
              <MapView
                incidents={incidents}
                onSelectIncident={handleSelectIncident}
              />
            </div>
          </div>
        </div>
      </div>

      {isDetailPanelOpen && selectedIncident && (
        <IncidentDetailPanel
          isOpen={isDetailPanelOpen}
          onClose={handleCloseDetailPanel}
          incident={{
            id: `INC-${selectedIncident.id}`,
            title: `${selectedIncident.type.charAt(0).toUpperCase() + selectedIncident.type.slice(1)} on ${selectedIncident.location}`,
            description: selectedIncident.description,
            type: selectedIncident.type,
            severity: selectedIncident.severity,
            status: "investigating",
            location: {
              address: selectedIncident.location,
              coordinates: {
                lat: selectedIncident.latitude,
                lng: selectedIncident.longitude,
              },
            },
            reportedAt: selectedIncident.timestamp,
            reportedBy: {
              name: "Anonymous Reporter",
              avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Anonymous",
              contactInfo: "+233 XX XXX XXXX",
            },
            assignedTo: {
              name: "Officer on Duty",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Officer",
              role: "First Responder",
            },
            evidence: [],
            comments: [],
          }}
        />
      )}
    </div>
  );
};

export default IncidentMap;
