import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Clock, CheckCircle, MapPin, Calendar, FileText, MessageSquare, Upload, Camera, ArrowLeft, Eye, EyeOff, Shield } from "lucide-react";

interface ReportDetail {
  id: string;
  title: string;
  date: string;
  status: "under-review" | "action-taken" | "closed" | "submitted";
  priority: "normal" | "high" | "urgent";
  description: string;
  location: string;
  anonymous: boolean;
  plateNumber?: string;
  evidence: Array<{
    id: string;
    type: "image" | "document" | "video";
    url: string;
    name: string;
    uploadedAt: string;
  }>;
  updates: Array<{
    id: string;
    date: string;
    content: string;
    from: "user" | "authority";
    author: string;
    authorAvatar?: string;
  }>;
}

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  const [showAddUpdateDialog, setShowAddUpdateDialog] = useState(false);
  const [updateContent, setUpdateContent] = useState("");
  const [showAddEvidenceDialog, setShowAddEvidenceDialog] = useState(false);
  const [newEvidence, setNewEvidence] = useState<File[]>([]);

  // Mock data for the report
  const report: ReportDetail = {
    id: id || "WB-2023-001",
    title: "Unroadworthy Vehicle on Highway",
    date: "2023-10-15",
    status: "under-review",
    priority: "high",
    description: "Large truck with visibly worn tires and smoke coming from the exhaust. The vehicle was driving erratically and appeared to be overloaded with goods. The registration plate was partially obscured but I managed to capture it in the photo evidence provided.",
    location: "Accra-Tema Motorway, near Tema toll booth",
    anonymous: false,
    plateNumber: "GR-2345-20",
    evidence: [
      {
        id: "ev-001",
        type: "image",
        url: "https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=800&q=80",
        name: "Truck-front-view.jpg",
        uploadedAt: "2023-10-15 09:30",
      },
      {
        id: "ev-002",
        type: "image",
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
        name: "License-plate.jpg",
        uploadedAt: "2023-10-15 09:31",
      },
      {
        id: "ev-003",
        type: "document",
        url: "#",
        name: "Incident-details.pdf",
        uploadedAt: "2023-10-15 09:35",
      },
    ],
    updates: [
      {
        id: "upd-001",
        date: "2023-10-15 14:20",
        content: "Thank you for your report. We have assigned an officer to investigate this case. Your report has been forwarded to the MTTD unit responsible for the Tema Motorway area.",
        from: "authority",
        author: "DVLA Admin",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      },
      {
        id: "upd-002",
        date: "2023-10-16 10:15",
        content: "I saw the same truck again today at a different location. It was still emitting heavy smoke and appears to be a serious hazard.",
        from: "user",
        author: "Sarah Johnson",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      {
        id: "upd-003",
        date: "2023-10-17 09:30",
        content: "Our officers have identified the vehicle and its owner. We have issued a notice for the vehicle to be brought in for inspection within 48 hours. Thank you for your vigilance.",
        from: "authority",
        author: "Officer Daniel Mensah",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel",
      },
    ],
  };

  const getStatusBadge = (status: ReportDetail["status"]) => {
    switch (status) {
      case "under-review":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1"><Clock className="h-3 w-3" /> Under Review</Badge>;
      case "action-taken":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Action Taken</Badge>;
      case "closed":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">Closed</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">Submitted</Badge>;
    }
  };

  const getPriorityBadge = (priority: ReportDetail["priority"]) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Urgent</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">High</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">Normal</Badge>;
    }
  };

  const handleAddUpdate = () => {
    if (updateContent.trim()) {
      console.log("Adding update:", updateContent);
      // In a real app, this would send the update to an API
      setUpdateContent("");
      setShowAddUpdateDialog(false);
    }
  };

  const handleAddEvidence = () => {
    if (newEvidence.length > 0) {
      console.log("Adding evidence:", newEvidence);
      // In a real app, this would upload the files to an API
      setNewEvidence([]);
      setShowAddEvidenceDialog(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewEvidence(Array.from(e.target.files));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="outline" className="flex items-center gap-1">
          <Link to="/whistleblower-portal/my-reports">
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          {report.anonymous && (
            <Badge variant="outline" className="flex items-center gap-1">
              <EyeOff className="h-3 w-3" /> Anonymous Report
            </Badge>
          )}
          {getStatusBadge(report.status)}
          {getPriorityBadge(report.priority)}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{report.title}</CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-gray-500" />
              {report.id}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              {report.date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              {report.location}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="text-gray-700">{report.description}</p>
              </div>

              {report.plateNumber && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Vehicle Plate Number</h3>
                  <p className="text-gray-700">{report.plateNumber}</p>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Report Status</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(report.status)}
                  <span className="text-sm text-gray-500">
                    Last updated: {report.updates.length > 0 ? report.updates[report.updates.length - 1].date : report.date}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-blue-800">Confidentiality Notice</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      This report and all associated evidence are protected under the Whistleblower Protection Act. Your identity is {report.anonymous ? "anonymous and " : ""}protected by law.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="evidence" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Evidence ({report.evidence.length})</h3>
                <Button onClick={() => setShowAddEvidenceDialog(true)} className="flex items-center gap-1">
                  <Upload className="h-4 w-4" />
                  Add Evidence
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {report.evidence.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-video relative bg-gray-100">
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : item.type === "document" ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Camera className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Uploaded on {item.uploadedAt}
                      </p>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex justify-end">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="updates" className="space-y-4