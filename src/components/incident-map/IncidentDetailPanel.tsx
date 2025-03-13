import React, { useState } from "react";
import {
  X,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  User,
  MessageSquare,
  FileText,
  Camera,
  CheckCircle,
  XCircle,
  Pencil,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Evidence {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  thumbnail?: string;
  title: string;
  uploadedAt: string;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  timestamp: string;
}

interface IncidentDetails {
  id: string;
  title: string;
  description: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "pending" | "investigating" | "resolved" | "closed";
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  reportedAt: string;
  reportedBy: {
    name: string;
    avatar?: string;
    contactInfo?: string;
  };
  assignedTo?: {
    name: string;
    avatar?: string;
    role: string;
  };
  evidence: Evidence[];
  comments: Comment[];
}

interface IncidentDetailPanelProps {
  incident?: IncidentDetails;
  isOpen?: boolean;
  onClose?: () => void;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "bg-blue-100 text-blue-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "critical":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-gray-100 text-gray-800";
    case "investigating":
      return "bg-blue-100 text-blue-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    case "closed":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const defaultIncident: IncidentDetails = {
  id: "INC-2023-0042",
  title: "Vehicle collision at major intersection",
  description:
    "A two-vehicle collision occurred at the intersection of High Street and Main Road. One vehicle failed to stop at the red light and collided with another vehicle crossing the intersection. Minor injuries reported.",
  type: "Collision",
  severity: "medium",
  status: "investigating",
  location: {
    address: "Intersection of High Street and Main Road, Accra",
    coordinates: {
      lat: 5.6037,
      lng: -0.187,
    },
  },
  reportedAt: "2023-06-15T09:23:00Z",
  reportedBy: {
    name: "Samuel Owusu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
    contactInfo: "+233 20 123 4567",
  },
  assignedTo: {
    name: "Officer Kofi Mensah",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi",
    role: "Traffic Officer",
  },
  evidence: [
    {
      id: "ev-001",
      type: "image",
      url: "https://images.unsplash.com/photo-1543393470-b2d900fb7bf0?w=600&q=80",
      title: "Accident scene - front view",
      uploadedAt: "2023-06-15T09:30:00Z",
    },
    {
      id: "ev-002",
      type: "image",
      url: "https://images.unsplash.com/photo-1583836631365-7c6e24be5087?w=600&q=80",
      title: "Vehicle damage - side impact",
      uploadedAt: "2023-06-15T09:32:00Z",
    },
    {
      id: "ev-003",
      type: "document",
      url: "#",
      title: "Witness statement.pdf",
      uploadedAt: "2023-06-15T10:15:00Z",
    },
  ],
  comments: [
    {
      id: "cm-001",
      author: {
        name: "Officer Kofi Mensah",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi",
        role: "Traffic Officer",
      },
      content:
        "Arrived at the scene. Both drivers are cooperative. Taking statements now.",
      timestamp: "2023-06-15T09:45:00Z",
    },
    {
      id: "cm-002",
      author: {
        name: "Dr. Abena Poku",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abena",
        role: "Medical Responder",
      },
      content:
        "Minor injuries treated on site. One driver has a sprained wrist, advised to visit hospital for further examination.",
      timestamp: "2023-06-15T10:05:00Z",
    },
  ],
};

const IncidentDetailPanel: React.FC<IncidentDetailPanelProps> = ({
  incident = defaultIncident,
  isOpen = true,
  onClose = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!isOpen) return null;

  const formattedDate = new Date(incident.reportedAt).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg flex flex-col z-10 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Incident Details</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            onClose();
            console.log("Close incident detail panel");
          }}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{incident.title}</CardTitle>
                <CardDescription>ID: {incident.id}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className={getSeverityColor(incident.severity)}
                >
                  {incident.severity.charAt(0).toUpperCase() +
                    incident.severity.slice(1)}
                </Badge>
                <Badge
                  variant="outline"
                  className={getStatusColor(incident.status)}
                >
                  {incident.status.charAt(0).toUpperCase() +
                    incident.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm">{incident.description}</p>

              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{incident.location.address}</span>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Reported By</h3>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    {incident.reportedBy.avatar ? (
                      <AvatarImage
                        src={incident.reportedBy.avatar}
                        alt={incident.reportedBy.name}
                      />
                    ) : (
                      <AvatarFallback>
                        {incident.reportedBy.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {incident.reportedBy.name}
                    </p>
                    {incident.reportedBy.contactInfo && (
                      <p className="text-xs text-muted-foreground">
                        {incident.reportedBy.contactInfo}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {incident.assignedTo && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Assigned To</h3>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      {incident.assignedTo.avatar ? (
                        <AvatarImage
                          src={incident.assignedTo.avatar}
                          alt={incident.assignedTo.name}
                        />
                      ) : (
                        <AvatarFallback>
                          {incident.assignedTo.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {incident.assignedTo.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {incident.assignedTo.role}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium mb-2">Incident Type</h3>
                <p className="text-sm">{incident.type}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="evidence" className="space-y-4 mt-4">
            {incident.evidence.length > 0 ? (
              <div className="space-y-3">
                {incident.evidence.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    {item.type === "image" && (
                      <div className="aspect-video w-full bg-slate-100 relative">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.uploadedAt).toLocaleString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {item.type === "image" && (
                            <Camera className="h-4 w-4 text-muted-foreground" />
                          )}
                          {item.type === "document" && (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No evidence uploaded yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comments" className="space-y-4 mt-4">
            {incident.comments.length > 0 ? (
              <div className="space-y-4">
                {incident.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      {comment.author.avatar ? (
                        <AvatarImage
                          src={comment.author.avatar}
                          alt={comment.author.name}
                        />
                      ) : (
                        <AvatarFallback>
                          {comment.author.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <div>
                          <span className="text-sm font-medium">
                            {comment.author.name}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {comment.author.role}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.timestamp).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No comments yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer with action buttons */}
      <div className="p-4 border-t bg-slate-50">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Edit incident clicked")}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Comment on incident clicked")}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Comment
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              <XCircle className="h-4 w-4 mr-1" />
              Close
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => console.log("Resolve incident clicked")}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Resolve
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailPanel;
