import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  HelpCircle,
  X,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

interface HeaderProps {
  title?: string;
  userAvatar?: string;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
}

const Header = ({
  title = "Dashboard",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  userName = "John Doe",
  userRole = "Administrator",
  notificationCount = 3,
}: HeaderProps) => {
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Use user data from auth context if available
  const displayName = user?.name || userName;
  const displayRole = user?.role || userRole;
  const displayAvatar = user?.avatar || userAvatar;

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "New Case Assigned",
      description:
        "You have been assigned to case #CS-2023-042 on Tema Highway",
      time: "10 minutes ago",
      type: "info",
      read: false,
    },
    {
      id: 2,
      title: "Critical Incident Reported",
      description:
        "A new high-severity incident has been reported at Accra Central",
      time: "1 hour ago",
      type: "alert",
      read: false,
    },
    {
      id: 3,
      title: "Case Resolution",
      description: "Case #CS-2023-038 has been successfully resolved",
      time: "3 hours ago",
      type: "success",
      read: true,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  return (
    <header className="bg-background border-b border-border h-20 px-6 flex items-center justify-between w-full">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 w-full bg-background"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setNotificationModalOpen(true)}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* Notification Modal */}
          <Dialog
            open={notificationModalOpen}
            onOpenChange={setNotificationModalOpen}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>Notifications</DialogTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNotificationModalOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <DialogDescription>
                  You have {notifications.filter((n) => !n.read).length} unread
                  notifications
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="space-y-4 py-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start p-3 rounded-lg ${notification.read ? "bg-gray-50" : "bg-blue-50 border-l-4 border-blue-500"}`}
                      >
                        <div className="mr-3 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {notification.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-gray-500">
                    <p>No notifications</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="link" size="sm" className="text-xs">
                  Mark all as read
                </Button>
                <Button variant="link" size="sm" className="text-xs">
                  View all notifications
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 h-10 w-10 rounded-full"
              onClick={() => console.log("User profile clicked")}
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
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayRole}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Help clicked")}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
