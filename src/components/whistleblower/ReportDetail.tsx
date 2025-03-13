import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  Eye,
  FileText,
  MessageSquare,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  UserCheck,
  Lock,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

interface ReportDetailProps {
  reportId?: string;
  title?: string;
  description?: string;
  dateSubmitted?: string;
  location?: string;
  status?: "pending" | "verified" | "processing" | "rejected";
  evidence?: Array<{
    id: string;
    type: "image" | "document" | "video";
    url: string;
    name: string;
  }>;
  notes?: Array<{
    id: string;
    author: string;
    date: string;
    content: string;
    isPrivate: boolean;
  }>;
}

const ReportDetail: React.FC<ReportDetailProps> = ({
  reportId = "WB-2023-0042",
  title = "Unauthorized Vehicle Modifications at Auto Shop",
  description = "I would like to report an auto repair shop that is performing illegal modifications to vehicles. They are removing emission control devices and installing oversized exhaust systems that exceed noise regulations. This has been ongoing for several months and is causing significant noise pollution in the residential area nearby.",
  dateSubmitted = "2023-10-15T09:30:00",
  location = "Accra, East Legon, Oxford Street",
  status = "pending",
  evidence = [
    {
      id: "1",
      type: "image",
      url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80",
      name: "Auto Shop Front.jpg",
    },
    {
      id: "2",
      type: "image",
      url: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45d7?w=600&q=80",
      name: "Modified Vehicle.jpg",
    },
    {
      id: "3",
      type: "document",
      url: "#",
      name: "Noise Measurement Report.pdf",
    },
  ],
  notes = [
    {
      id: "1",
      author: "Officer Johnson",
      date: "2023-10-16T14:20:00",
      content:
        "Initial review completed. This appears to be a legitimate complaint with sufficient evidence. Recommending verification visit to the location.",
      isPrivate: true,
    },
    {
      id: "2",
      author: "Supervisor Williams",
      date: "2023-10-17T09:15:00",
      content:
        "Assigned to Officer Mensah for on-site verification. Please complete by end of week.",
      isPrivate: true,
    },
  ],
}) => {
  const [currentTab, setCurrentTab] = useState("details");
  const [verificationStatus, setVerificationStatus] = useState(status);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<
    "verify" | "reject" | "process" | null
  >(null);
  const [noteText, setNoteText] = useState("");
  const [isPrivateNote, setIsPrivateNote] = useState(true);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending Review
          </Badge>
        );
      case "verified":
        return (
          <Badge
            variant="default"
            className="flex items-center gap-1 bg-blue-500"
          >
            <CheckCircle className="h-3 w-3" /> Verified
          </Badge>
        );
      case "processing":
        return (
          <Badge
            variant="default"
            className="flex items-center gap-1 bg-green-500"
          >
            <UserCheck className="h-3 w-3" /> Processing
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleAction = (type: "verify" | "reject" | "process") => {
    setActionType(type);
    setShowConfirmDialog(true);
  };

  const confirmAction = () => {
    if (actionType === "verify") {
      setVerificationStatus("verified");
    } else if (actionType === "reject") {
      setVerificationStatus("rejected");
    } else if (actionType === "process") {
      setVerificationStatus("processing");
    }
    setShowConfirmDialog(false);
  };

  const addNote = () => {
    // In a real implementation, this would add the note to the database
    // For now, we'll just clear the input
    setNoteText("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white w-full h-full overflow-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(dateSubmitted)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div>{getStatusBadge(verificationStatus)}</div>
          </div>
        </div>
        <div className="flex gap-2">
          {verificationStatus === "pending" && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  handleAction("reject");
                  console.log("Reject report clicked");
                }}
                className="flex items-center gap-1"
              >
                <XCircle className="h-4 w-4" /> Reject
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  handleAction("verify");
                  console.log("Verify report clicked");
                }}
                className="flex items-center gap-1"
              >
                <CheckCircle className="h-4 w-4" /> Verify
              </Button>
            </>
          )}
          {verificationStatus === "verified" && (
            <Button
              onClick={() => {
                handleAction("process");
                console.log("Process as Case clicked");
              }}
              className="flex items-center gap-1"
            >
              <UserCheck className="h-4 w-4" /> Process as Case
            </Button>
          )}
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="details" className="flex items-center gap-1">
            <FileText className="h-4 w-4" /> Details
          </TabsTrigger>
          <TabsTrigger value="evidence" className="flex items-center gap-1">
            <Eye className="h-4 w-4" /> Evidence
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> Notes
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Report ID
                  </h3>
                  <p className="mt-1">{reportId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Description
                  </h3>
                  <p className="mt-1">{description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Location
                  </h3>
                  <p className="mt-1">{location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {evidence.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    {item.type === "image" ? (
                      <div className="aspect-video relative">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="p-3">
                      <p className="text-sm font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 capitalize">
                        {item.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${note.author}`}
                          />
                          <AvatarFallback>
                            {note.author.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{note.author}</p>
                          <p className="text-xs text-gray-500">
                            {formatDate(note.date)}
                          </p>
                        </div>
                      </div>
                      {note.isPrivate && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Lock className="h-3 w-3" /> Internal Only
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mt-2">{note.content}</p>
                  </div>
                ))}

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Add Note</h3>
                  <Textarea
                    placeholder="Enter your note here..."
                    className="mb-2"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="privateNote"
                        checked={isPrivateNote}
                        onChange={() => setIsPrivateNote(!isPrivateNote)}
                        className="rounded"
                      />
                      <label htmlFor="privateNote" className="text-sm">
                        Mark as internal only
                      </label>
                    </div>
                    <Button
                      onClick={() => {
                        addNote();
                        console.log("Add note clicked");
                      }}
                      disabled={!noteText.trim()}
                    >
                      Add Note
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Whistleblower Protection</AlertTitle>
                <AlertDescription>
                  This report contains sensitive information. The identity of
                  the whistleblower is protected under the Whistleblower Act.
                  Unauthorized disclosure of this information is a criminal
                  offense.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Access Level</h3>
                  <Select defaultValue="department">
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="department">
                        Department Only
                      </SelectItem>
                      <SelectItem value="agency">Agency Wide</SelectItem>
                      <SelectItem value="restricted">
                        Restricted (Case Officers Only)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Data Retention</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    This report and all associated evidence will be retained for
                    7 years from the date of submission, after which it will be
                    automatically archived according to government data
                    retention policies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "verify" && "Verify this report?"}
              {actionType === "reject" && "Reject this report?"}
              {actionType === "process" && "Process as case?"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "verify" &&
                "This will mark the report as verified and allow it to be processed as a case."}
              {actionType === "reject" &&
                "This will mark the report as rejected. This action cannot be undone."}
              {actionType === "process" &&
                "This will create a new case from this whistleblower report and assign it to the case management system."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              variant={actionType === "reject" ? "destructive" : "default"}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportDetail;
