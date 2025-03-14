import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useAuth } from "@/lib/auth";
import {
  BarChart,
  Map,
  FileText,
  Users,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Home,
  Menu,
  X,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface SidebarProps {
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  className?: string;
}

const Sidebar = ({
  userName = "John Doe",
  userRole = "DVLA",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  className,
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Use user data from auth context if available
  const displayName = user?.name || userName;
  const displayRole = user?.role || userRole;
  const displayAvatar = user?.avatar || userAvatar;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Incident Map",
      path: "/incident-map",
      icon: <Map className="h-5 w-5" />,
    },
    {
      name: "Case Management",
      path: "/case-management",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "Whistleblower Portal",
      path: "/whistleblower",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      name: "Report Incident",
      path: "/incident-submission",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-primary-foreground/10">
        {!collapsed && (
          <div className="flex items-center">
            <Bell className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold">RSMS</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                isActive(item.path)
                  ? "bg-primary-foreground/20 text-white"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white",
              )}
            >
              <div className="mr-3">{item.icon}</div>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-primary-foreground/10">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "space-x-3",
          )}
        >
          <Avatar>
            <AvatarImage src={displayAvatar} alt={displayName} />
            <AvatarFallback>
              {displayName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{displayName}</p>
              <p className="text-xs text-primary-foreground/70 truncate">
                {displayRole}
              </p>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="mt-4 flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
