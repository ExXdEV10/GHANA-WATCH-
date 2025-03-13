import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "../../lib/utils";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children?: ReactNode;
  className?: string;
  userRole?: "DVLA" | "MTTD" | "Road Safety Commission" | "Admin";
  userName?: string;
  userAvatar?: string;
  pageTitle?: string;
  notificationCount?: number;
}

const DashboardLayout = ({
  children,
  className,
  userRole = "DVLA",
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  pageTitle = "Dashboard",
  notificationCount = 3,
}: DashboardLayoutProps) => {
  return (
    <div className={cn("flex h-screen w-full bg-background", className)}>
      {/* Sidebar */}
      <Sidebar userRole={userRole} userName={userName} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header
          title={pageTitle}
          userAvatar={userAvatar}
          userName={userName}
          userRole={userRole}
          notificationCount={notificationCount}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto">{children || <Outlet />}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
