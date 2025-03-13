import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  MapPin,
  Calendar,
  User,
  Clock,
  AlertTriangle,
  CheckCircle,
  Upload,
  MessageSquare,
  Edit,
  Trash,
  Camera,
  PlusCircle,
} from "lucide-react";

interface Evidence {
  id: string;
  type: string;
  url: string;
  description: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface Note {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  avatar: string;
}

interface CaseDetailProps {
  caseId?: string;
  title?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  type?: string;
  severity?: "low" | "medium" | "high" | "critical";
  status?: "new" | "assigned" | "in-progress" | "resolved" | "closed";
  assignedTo?: string;
  reportedBy?: string;
  evidence?: Evidence[];
  notes?: Note[];
}

const CaseDetail: React.FC<CaseDetailProps> = ({
  caseId = "CASE-2023-0042",
  title = "Reckless Driving on Main Highway",
  description = "Multiple reports of a vehicle driving erratically on the main highway near the central business district. Vehicle was seen swerving between lanes and driving at excessive speeds.",
  location = "Main Highway, Central Business District",
  date = "2023-06-15",
  time = "14:30",
  type = "Traffic Violation",
  severity = "high",
  status = "in-progress",
  assignedTo = "Officer John Doe",
  reportedBy = "Anonymous Citizen",
  evidence = [
    {
      id: "ev-001",
      type: "image",
      url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
      description: "Vehicle license plate photo",
      uploadedBy: "Traffic Camera System",
      uploadedAt: "2023-06-15 14:35",
    },
    {
      id: "ev-002",
      type: "video",
      url: "https://example.com/video1",
      description: "Dashcam footage from witness",
      uploadedBy: "Citizen Reporter",
      uploadedAt: "2023-06-15 15:10",
    },
    {
      id: "ev-003",
      type: "document",
      url: "https://example.com/report1",
      description: "Initial incident report",
      uploadedBy: "System",
      uploadedAt: "2023-06-15 14:40",
    },
  ],
  notes = [
    {
      id: "note-001",
      content:
        "Dispatched Officer Johnson to the scene for initial assessment.",
      createdBy: "Dispatch Center",
      createdAt: "2023-06-15 14:45",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dispatch",
    },
    {
      id: "note-002",
      content:
        "Vehicle identified as a black sedan with license plate ABC-123. Owner information retrieved from database.",
      createdBy: "Officer John Doe",
      createdAt: "2023-06-15 15:30",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "note-003",
      content:
        "Contacted vehicle owner who claims the car was stolen earlier today. Filed separate report for stolen vehicle.",
      createdBy: "Officer John Doe",
      createdAt: "2023-06-15 16:15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [newNote, setNewNote] = useState("");
  const [caseStatus, setCaseStatus] = useState(status);
  const [assignedOfficer, setAssignedOfficer] = useState(assignedTo);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

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
      case "new":
        return "bg-purple-100 text-purple-800";
      case "assigned":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would send the note to an API
      console.log("Adding note:", newNote);
      setNewNote("");
    }
  };

  const handleStatusChange = (value: string) => {
    // In a real app, this would update the status via an API
    setCaseStatus(value as CaseDetailProps["status"]);
  };

  const handleAssignOfficer = (value: string) => {
    // In a real app, this would assign the officer via an API
    setAssignedOfficer(value);
  };

  return (
    <div className="w-full h-full bg-white p-6 overflow-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <FileText size={14} />
              {caseId}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin size={14} />
              {location}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar size={14} />
              {date}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock size={14} />
              {time}
            </Badge>
          </div>
        </div>
        <div className="flex space-x-2">
          <Badge className={`${getSeverityColor(severity)} capitalize`}>
            {severity} Severity
          </Badge>
          <Badge className={`${getStatusColor(caseStatus)} capitalize`}>
            {caseStatus}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
              <CardDescription>
                Complete information about this incident
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500">
                  Description
                </h3>
                <p className="mt-1">{description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Type</h3>
                  <p className="mt-1">{type}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Reported By
                  </h3>
                  <p className="mt-1">{reportedBy}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">
                    Assigned To
                  </h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${assignedOfficer}`}
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span>{assignedOfficer}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Status</h3>
                  <p className="mt-1 capitalize">{caseStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">
                  Map view would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Evidence ({evidence.length})
            </h2>
            <DialogTrigger asChild onClick={() => setIsUploadDialogOpen(true)}>
              <Button className="flex items-center gap-2">
                <Upload size={16} />
                Upload Evidence
              </Button>
            </DialogTrigger>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidence.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-0">
                  {item.type === "image" && (
                    <div className="relative h-48 w-full">
                      <img
                        src={item.url}
                        alt={item.description}
                        className="h-full w-full object-cover rounded-t-lg"
                      />
                    </div>
                  )}
                  {item.type === "video" && (
                    <div className="bg-gray-100 h-48 flex items-center justify-center rounded-t-lg">
                      <Camera size={48} className="text-gray-400" />
                    </div>
                  )}
                  {item.type === "document" && (
                    <div className="bg-gray-100 h-48 flex items-center justify-center rounded-t-lg">
                      <FileText size={48} className="text-gray-400" />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <h3 className="font-medium">{item.description}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    Uploaded by {item.uploadedBy} on {item.uploadedAt}
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500"
                    >
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Note</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add a note about this case..."
                className="min-h-[100px]"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddNote}>Add Note</Button>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Case Notes ({notes.length})
            </h2>

            {notes.map((note) => (
              <Card key={note.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={note.avatar} />
                      <AvatarFallback>
                        {note.createdBy.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{note.createdBy}</h3>
                        <span className="text-sm text-gray-500">
                          {note.createdAt}
                        </span>
                      </div>
                      <p className="mt-2">{note.content}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Edit size={14} />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-red-500"
                  >
                    <Trash size={14} />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Case Status</CardTitle>
              <CardDescription>
                Change the current status of this case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={caseStatus} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <Button>Update Status</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assign Officer</CardTitle>
              <CardDescription>
                Assign or reassign an officer to this case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={assignedOfficer}
                onValueChange={handleAssignOfficer}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select officer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Officer John Doe">
                    Officer John Doe
                  </SelectItem>
                  <SelectItem value="Officer Jane Smith">
                    Officer Jane Smith
                  </SelectItem>
                  <SelectItem value="Officer Michael Johnson">
                    Officer Michael Johnson
                  </SelectItem>
                  <SelectItem value="Officer Sarah Williams">
                    Officer Sarah Williams
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <Button>Assign Officer</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Case Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Related Case
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-500"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Flag as Priority
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-green-500"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Resolved
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Evidence</DialogTitle>
            <DialogDescription>
              Add photos, videos, or documents related to this case.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop files here, or click to select files
              </p>
              <Input type="file" className="hidden" id="file-upload" />
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Select Files
              </Button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea placeholder="Describe this evidence..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Evidence Type
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photo">Photo</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="audio">Audio Recording</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUploadDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseDetail;
