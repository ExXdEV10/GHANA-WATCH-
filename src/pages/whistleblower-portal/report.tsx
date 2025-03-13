import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertTriangle,
  Upload,
  MapPin,
  FileText,
  User,
  CheckCircle,
  X,
  Camera,
  Car,
  Truck,
  Gauge,
  Eye,
  EyeOff,
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
import { Switch } from "@/components/ui/switch";
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
  plateNumber: z.string().optional(),
  location: z.string({
    required_error: "Please provide the incident location",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  priority: z.enum(["normal", "urgent", "high"]),
  anonymous: z.boolean().default(false),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ReportCase = () => {
  const [media, setMedia] = useState<File[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incidentType: "",
      plateNumber: "",
      location: "",
      description: "",
      priority: "normal",
      anonymous: false,
      agreeToTerms: false,
    },
  });

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

  const onSubmit = (values: FormValues) => {
    // In a real app, this would submit the form data to a backend API
    console.log("Form submitted:", { ...values, media });
    setShowSuccessDialog(true);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Report a Case</CardTitle>
          <CardDescription>
            Submit a confidential report about a road safety violation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
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
                          <SelectItem value="unroadworthy-vehicle">
                            <div className="flex items-center">
                              <Truck className="mr-2 h-4 w-4" />
                              <span>Unroadworthy Vehicle</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="speeding">
                            <div className="flex items-center">
                              <Gauge className="mr-2 h-4 w-4" />
                              <span>Speeding</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="license-violation">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4" />
                              <span>License Violation</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="other">
                            <div className="flex items-center">
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              <span>Other Violation</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    onClick={() =>
                      document.getElementById("media-upload")?.click()
                    }
                    type="button"
                  >
                    Upload Evidence
                  </Button>
                </div>

                {media.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">
                      Uploaded Evidence ({media.length})
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

                <FormField
                  control={form.control}
                  name="plateNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Vehicle Plate Number (if applicable)
                      </FormLabel>
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
                        Provide details about the incident to help authorities
                        take appropriate action
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Priority Level</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="normal" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Normal - Standard priority
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="high" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              High - Requires prompt attention
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="urgent" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Urgent - Immediate action required
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="anonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Submit Anonymously
                        </FormLabel>
                        <FormDescription>
                          Your identity will not be disclosed to anyone
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

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
                          I confirm that the information provided is accurate to
                          the best of my knowledge
                        </FormLabel>
                        <FormDescription>
                          By submitting this report, you agree to our{" "}
                          <a
                            href="#"
                            className="text-blue-600 underline"
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

              <div className="flex justify-end">
                <Button type="submit">Submit Report</Button>
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

export default ReportCase;
