import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Car,
  Upload,
  MapPin,
  FileText,
  User,
  AlertTriangle,
  CheckCircle,
  X,
  Camera,
  Wine,
  AlertCircle,
  TrafficCone,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  incidentType: z.string({
    required_error: "Please select an incident type",
  }),
  otherIncidentType: z.string().optional(),
  plateNumber: z.string().optional(),
  location: z.string({
    required_error: "Please provide the incident location",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  contactMethod: z.enum(["anonymous", "phone", "email"]),
  contactInfo: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface IncidentSubmissionFormProps {
  onSubmit?: (values: FormValues & { media: File[] }) => void;
  isLoading?: boolean;
}

const IncidentSubmissionForm: React.FC<IncidentSubmissionFormProps> = ({
  onSubmit = () => {},
  isLoading = false,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [media, setMedia] = useState<File[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incidentType: "",
      otherIncidentType: "",
      plateNumber: "",
      location: "",
      description: "",
      contactMethod: "anonymous",
      contactInfo: "",
      agreeToTerms: false,
    },
  });

  const watchIncidentType = form.watch("incidentType");
  const watchContactMethod = form.watch("contactMethod");

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setMedia((prev) => [...prev, ...newFiles]);
    }
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const getLocationFromGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you would use a reverse geocoding service to get the address
          form.setValue(
            "location",
            `Latitude: ${latitude}, Longitude: ${longitude}`,
          );
          setUseCurrentLocation(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your current location. Please enter it manually.",
          );
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const incidentTypeValue = form.getValues("incidentType");
      if (!incidentTypeValue) {
        form.setError("incidentType", {
          type: "manual",
          message: "Please select an incident type",
        });
        return;
      }

      if (
        incidentTypeValue === "other" &&
        !form.getValues("otherIncidentType")
      ) {
        form.setError("otherIncidentType", {
          type: "manual",
          message: "Please specify the incident type",
        });
        return;
      }
    }

    if (currentStep === 3) {
      const locationValue = form.getValues("location");
      const descriptionValue = form.getValues("description");

      if (!locationValue) {
        form.setError("location", {
          type: "manual",
          message: "Please provide the incident location",
        });
        return;
      }

      if (!descriptionValue || descriptionValue.length < 10) {
        form.setError("description", {
          type: "manual",
          message: "Description must be at least 10 characters",
        });
        return;
      }
    }

    if (currentStep === 4) {
      const contactMethod = form.getValues("contactMethod");
      const contactInfo = form.getValues("contactInfo");

      if (contactMethod !== "anonymous" && !contactInfo) {
        form.setError("contactInfo", {
          type: "manual",
          message: `Please provide your ${contactMethod === "phone" ? "phone number" : "email address"}`,
        });
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (values: FormValues) => {
    if (!form.getValues("agreeToTerms")) {
      form.setError("agreeToTerms", {
        type: "manual",
        message: "You must agree to the terms and conditions",
      });
      return;
    }

    // In a real app, this would submit the form data to a backend API
    console.log("Form submitted:", { ...values, media });
    onSubmit({ ...values, media });
    setShowSuccessDialog(true);
  };

  const getIncidentTypeIcon = (type: string) => {
    switch (type) {
      case "reckless-driving":
        return <Car className="h-5 w-5" />;
      case "drunk-driving":
        return <Wine className="h-5 w-5" />;
      case "road-accident":
        return <AlertTriangle className="h-5 w-5" />;
      case "unroadworthy-vehicle":
        return <AlertCircle className="h-5 w-5" />;
      case "faulty-traffic-light":
        return <TrafficCone className="h-5 w-5" />;
      case "other":
        return <FileText className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <FormField
              control={form.control}
              name="incidentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incident Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="reckless-driving">
                        <div className="flex items-center">
                          <Car className="mr-2 h-4 w-4" />
                          <span>Reckless Driving</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="drunk-driving">
                        <div className="flex items-center">
                          <Wine className="mr-2 h-4 w-4" />
                          <span>Drunk Driving</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="road-accident">
                        <div className="flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          <span>Road Accident</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="unroadworthy-vehicle">
                        <div className="flex items-center">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          <span>Unroadworthy Vehicle</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="faulty-traffic-light">
                        <div className="flex items-center">
                          <TrafficCone className="mr-2 h-4 w-4" />
                          <span>Faulty Traffic Light</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="other">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Other</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchIncidentType === "other" && (
              <FormField
                control={form.control}
                name="otherIncidentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify</FormLabel>
                    <FormControl>
                      <Input placeholder="Specify incident type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop files here, or click to select files
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported formats: JPG, PNG, MP4 (max 10MB)
              </p>
              <Input
                type="file"
                className="hidden"
                id="media-upload"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
              />
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById("media-upload")?.click()}
                type="button"
              >
                Upload Media
              </Button>
            </div>

            {media.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">
                  Uploaded Media ({media.length})
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {media.map((file, index) => (
                    <div
                      key={index}
                      className="relative border rounded-md p-2 flex items-center"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mr-2">
                        {file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="w-10 h-10 object-cover rounded-md"
                          />
                        ) : (
                          <Camera className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs truncate">{file.name}</p>
                        <p className="text-xs text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 absolute top-1 right-1"
                        onClick={() => removeMedia(index)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-center text-muted-foreground mt-4">
              Media is optional but recommended to help authorities better
              assess the incident
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>

            <FormField
              control={form.control}
              name="plateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Plate Number (if applicable)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. GR-1234-20" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the vehicle's license plate if relevant to the
                    incident
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        placeholder="Enter incident location"
                        {...field}
                        className="flex-1"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={getLocationFromGPS}
                      className="flex-shrink-0"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                  {useCurrentLocation && (
                    <Badge variant="outline" className="mt-1">
                      Using current location
                    </Badge>
                  )}
                  <FormDescription>
                    Enter the location or use the pin icon to detect your
                    current location
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe what happened..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about the incident to help authorities take
                    appropriate action
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
            </div>

            <FormField
              control={form.control}
              name="contactMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Contact Preference</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="anonymous" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Report anonymously
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="phone" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Provide phone number
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="email" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Provide email address
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchContactMethod !== "anonymous" && (
              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {watchContactMethod === "phone"
                        ? "Phone Number"
                        : "Email Address"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          watchContactMethod === "phone"
                            ? "Enter your phone number"
                            : "Enter your email address"
                        }
                        type={watchContactMethod === "email" ? "email" : "tel"}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This information will only be used to follow up on your
                      report if necessary
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-2">Report Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Incident Type:</span>
                  <span className="font-medium flex items-center">
                    {getIncidentTypeIcon(watchIncidentType)}
                    <span className="ml-1">
                      {watchIncidentType === "other"
                        ? form.getValues("otherIncidentType")
                        : watchIncidentType
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Media Attached:</span>
                  <span className="font-medium">
                    {media.length > 0 ? `${media.length} files` : "None"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">
                    {form.getValues("location")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact Method:</span>
                  <span className="font-medium capitalize">
                    {watchContactMethod}
                  </span>
                </div>
                {watchContactMethod !== "anonymous" && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {watchContactMethod === "phone"
                        ? "Phone Number:"
                        : "Email:"}
                    </span>
                    <span className="font-medium">
                      {form.getValues("contactInfo")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I confirm that the information provided is accurate to the
                      best of my knowledge
                    </FormLabel>
                    <FormDescription>
                      By submitting this report, you agree to our{" "}
                      <a
                        href="#"
                        className="text-primary underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        terms and conditions
                      </a>
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm">
      <Card>
        <CardHeader>
          <CardTitle>Report an Incident</CardTitle>
          <CardDescription>
            Help improve road safety by reporting incidents you've witnessed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}
                  >
                    {step}
                  </div>
                  <div className="text-xs mt-2 text-center">
                    {step === 1 && "Type"}
                    {step === 2 && "Media"}
                    {step === 3 && "Details"}
                    {step === 4 && "Contact"}
                    {step === 5 && "Submit"}
                  </div>
                  {step < 5 && (
                    <div
                      className={`absolute top-5 left-10 w-[calc(100%-20px)] h-[2px] ${currentStep > step ? "bg-primary" : "bg-gray-100"}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Form {...form}>
            <form className="space-y-6">
              {renderStepContent()}

              <div className="flex justify-between pt-4 border-t">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isLoading}
                  >
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep < 5 ? (
                  <Button type="button" onClick={nextStep} disabled={isLoading}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => handleSubmit(form.getValues())}
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Report"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
              Report Submitted Successfully
            </DialogTitle>
            <DialogDescription>
              Your report has been submitted successfully. Authorities will
              review and take action.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-sm text-green-800">
              Thank you for contributing to road safety. Your report will help
              make our roads safer for everyone.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowSuccessDialog(false);
                // Reset form
                form.reset();
                setMedia([]);
                setCurrentStep(1);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncidentSubmissionForm;
