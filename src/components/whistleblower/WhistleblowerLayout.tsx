import React, { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  FileText,
  User,
  Settings,
  LogOut,
  Home,
  Shield,
  AlertTriangle,
  Clock,
  Plus,
  Lock,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface WhistleblowerLayoutProps {
  children?: ReactNode;
  className?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

const WhistleblowerLayout = ({
  children,
  className,
  userName = "Sarah Johnson",
  userRole = "DVLA Officer",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
}: WhistleblowerLayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/whistleblower-portal",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Report a Case",
      path: "/whistleblower-portal/report",
      icon: <Plus className="h-5 w-5" />,
    },
    {
      name: "My Reports",
      path: "/whistleblower-portal/my-reports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Profile",
      path: "/whistleblower-portal/profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <Shield className="h-8 w-8 text-blue-600 mr-2" />
          <div>
            <h1 className="text-lg font-bold text-blue-600">DVLA</h1>
            <p className="text-xs text-gray-500">Whistleblower Portal</p>
          </div>
        </div>

        <div className="flex-1 overflow-auto py-6 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <div
                  className={cn(
                    "mr-3",
                    isActive(item.path) ? "text-blue-700" : "text-gray-500",
                  )}
                >
                  {item.icon}
                </div>
                <span>{item.name}</span>
                {item.name === "Report a Case" && (
                  <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200">
                    New
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          <Separator className="my-6" />

          <div className="px-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Security
            </h2>
            <div className="space-y-1">
              <Link
                to="/whistleblower-portal/security"
                className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                <Lock className="h-5 w-5 mr-3 text-gray-500" />
                <span>Security Settings</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-8 w-8"
                    onClick={() => console.log("Logout clicked")}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800">
              {navItems.find((item) => isActive(item.path))?.name ||
                "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <AlertTriangle className="h-4 w-4" />
              Report Urgently
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} DVLA Whistleblower Portal. All
              rights reserved.
            </div>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link
                to="/whistleblower-portal"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </Link>
              <Link
                to="/whistleblower-portal/report"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Report a Case
              </Link>
              <Link
                to="/whistleblower-portal/my-reports"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                My Reports
              </Link>
              <Link
                to="/whistleblower-portal/contact"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WhistleblowerLayout;
