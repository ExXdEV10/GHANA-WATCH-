import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Key,
  AlertTriangle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Security = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Manage your account security and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-full mr-4">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800">
                  Your Security Status
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Your account security is good, but could be improved by
                  enabling two-factor authentication.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Protection</h3>

            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-full mr-4">
                    <Key className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-gray-500">
                      Last changed 30 days ago
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-full mr-4">
                    <Smartphone className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">Not enabled</p>
                  </div>
                </div>
                <Button size="sm">Enable</Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Privacy Settings</h3>

            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-full mr-4">
                    <Eye className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Profile Visibility</h4>
                    <p className="text-sm text-gray-500">
                      Control who can see your profile information
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-full mr-4">
                    <EyeOff className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Anonymous Reporting</h4>
                    <p className="text-sm text-gray-500">
                      Your identity is hidden when submitting anonymous reports
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Settings
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Security Logs</h3>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3 border-b">
                <h4 className="font-medium">Recent Activity</h4>
              </div>
              <div className="divide-y">
                <div className="p-3 flex items-center">
                  <div className="p-1.5 bg-green-100 rounded-full mr-3">
                    <Lock className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Successful login</p>
                    <p className="text-xs text-gray-500">
                      Today, 09:42 AM • IP: 192.168.1.1
                    </p>
                  </div>
                </div>
                <div className="p-3 flex items-center">
                  <div className="p-1.5 bg-blue-100 rounded-full mr-3">
                    <Key className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Password changed</p>
                    <p className="text-xs text-gray-500">
                      30 days ago • IP: 192.168.1.1
                    </p>
                  </div>
                </div>
                <div className="p-3 flex items-center">
                  <div className="p-1.5 bg-yellow-100 rounded-full mr-3">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Failed login attempt</p>
                    <p className="text-xs text-gray-500">
                      45 days ago • IP: 203.0.113.1
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 border-t text-center">
                <Button variant="link" size="sm">
                  View All Activity
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Protection</CardTitle>
          <CardDescription>
            Information about how your data is protected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              All whistleblower reports are encrypted using industry-standard
              encryption protocols. Your personal information and report details
              are protected with the following measures:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-600" />
                  End-to-End Encryption
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  All data is encrypted in transit and at rest
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium flex items-center gap-2">
                  <EyeOff className="h-4 w-4 text-blue-600" />
                  Anonymous Reporting
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Identity protection for whistleblowers
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  Access Controls
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Strict role-based access to sensitive information
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  Security Audits
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Regular security assessments and penetration testing
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline">Download Privacy Policy</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;
