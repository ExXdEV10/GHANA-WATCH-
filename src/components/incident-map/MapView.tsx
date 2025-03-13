import React, { useState, useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Layers,
  ZoomIn,
  ZoomOut,
  MapPin,
  AlertTriangle,
  Car,
  Info,
} from "lucide-react";
import { cn } from "../../lib/utils";

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

interface MapViewProps {
  incidents?: Incident[];
  onSelectIncident?: (incident: Incident) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const MapView = ({
  incidents = [
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
  ],
  onSelectIncident = () => {
    console.log("Incident selected");
  },
  center = { lat: 5.6037, lng: -0.187 },
  zoom = 12,
}: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapZoom, setMapZoom] = useState(zoom);
  const [selectedLayer, setSelectedLayer] = useState<
    "all" | "accidents" | "hazards" | "traffic"
  >("all");
  const [filteredIncidents, setFilteredIncidents] =
    useState<Incident[]>(incidents);

  // Filter incidents based on selected layer
  useEffect(() => {
    if (selectedLayer === "all") {
      setFilteredIncidents(incidents);
    } else if (selectedLayer === "accidents") {
      setFilteredIncidents(
        incidents.filter((incident) => incident.type === "accident"),
      );
    } else if (selectedLayer === "hazards") {
      setFilteredIncidents(
        incidents.filter((incident) => incident.type === "hazard"),
      );
    } else if (selectedLayer === "traffic") {
      setFilteredIncidents(
        incidents.filter((incident) => incident.type === "traffic"),
      );
    }
  }, [selectedLayer, incidents]);

  // In a real implementation, this would initialize and update a map library like Leaflet or Google Maps
  useEffect(() => {
    // Initialize map would go here
    console.log("Map initialized with zoom level:", mapZoom);
    console.log("Map centered at:", center);
  }, [center, mapZoom]);

  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 1, 18));
    console.log("Zoom in clicked");
  };

  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 1, 3));
    console.log("Zoom out clicked");
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "accident":
        return <Car className="h-5 w-5 text-red-500" />;
      case "hazard":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "traffic":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Incident Map</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(selectedLayer === "all" && "bg-slate-100")}
            onClick={() => {
              setSelectedLayer("all");
              console.log("All incidents layer selected");
            }}
          >
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(selectedLayer === "accidents" && "bg-slate-100")}
            onClick={() => {
              setSelectedLayer("accidents");
              console.log("Accidents layer selected");
            }}
          >
            Accidents
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(selectedLayer === "hazards" && "bg-slate-100")}
            onClick={() => {
              setSelectedLayer("hazards");
              console.log("Hazards layer selected");
            }}
          >
            Hazards
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(selectedLayer === "traffic" && "bg-slate-100")}
            onClick={() => {
              setSelectedLayer("traffic");
              console.log("Traffic layer selected");
            }}
          >
            Traffic
          </Button>
        </div>
      </div>

      <div className="relative flex-grow">
        {/* Map container */}
        <div
          ref={mapRef}
          className="w-full h-full bg-slate-100"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1577086664693-894d8405334a?w=1200&q=80)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Incident markers */}
          {filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${Math.random() * 80 + 10}%`, // Simulated positions
                top: `${Math.random() * 80 + 10}%`,
              }}
              onClick={() => {
                onSelectIncident(incident);
                console.log("Incident marker clicked:", incident.id);
              }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <div className="p-2 rounded-full bg-white shadow-md">
                        {getIncidentIcon(incident.type)}
                      </div>
                      <div
                        className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getSeverityColor(incident.severity)} border-2 border-white`}
                      ></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="p-2">
                      <p className="font-semibold">{incident.location}</p>
                      <p className="text-sm">{incident.description}</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge
                          variant={
                            incident.severity === "high"
                              ? "destructive"
                              : incident.severity === "medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {incident.severity} severity
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(incident.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <Button variant="secondary" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => console.log("Layers button clicked")}
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-3 border-t bg-slate-50 text-sm text-gray-500">
        Showing {filteredIncidents.length} incidents • Last updated:{" "}
        {new Date().toLocaleString()}
      </div>
    </Card>
  );
};

export default MapView;
