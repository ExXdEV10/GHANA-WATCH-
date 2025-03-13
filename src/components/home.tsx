import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardSummary from "./dashboard/DashboardSummary";
import { NavigationButtons } from "./ui/navigation-buttons";

interface HomeProps {
  userName?: string;
  userRole?: "DVLA" | "MTTD" | "Road Safety Commission" | "Admin";
  userAvatar?: string;
  notificationCount?: number;
}

const Home = ({
  userName = "John Doe",
  userRole = "DVLA",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  notificationCount = 3,
}: HomeProps) => {
  return (
    <DashboardLayout
      userName={userName}
      userRole={userRole}
      userAvatar={userAvatar}
      pageTitle="Dashboard"
      notificationCount={notificationCount}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end mb-4 p-4">
          <NavigationButtons
            showBack={false}
            showNext={true}
            nextPath="/incident-map"
          />
        </div>
        <DashboardSummary />
      </div>
    </DashboardLayout>
  );
};

export default Home;
