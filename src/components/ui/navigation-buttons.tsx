import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

interface NavigationButtonsProps {
  showHome?: boolean;
  showBack?: boolean;
  showNext?: boolean;
  nextPath?: string;
  className?: string;
  onBack?: () => void;
  onNext?: () => void;
}

const NavigationButtons = ({
  showHome = true,
  showBack = true,
  showNext = false,
  nextPath = "",
  className = "",
  onBack,
  onNext,
}: NavigationButtonsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define the navigation flow order
  const navigationFlow = [
    "/",
    "/incident-map",
    "/case-management",
    "/analytics",
    "/whistleblower",
  ];

  const currentIndex = navigationFlow.indexOf(location.pathname);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      if (currentIndex > 0) {
        navigate(navigationFlow[currentIndex - 1]);
      } else {
        navigate(-1);
      }
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (nextPath) {
      navigate(nextPath);
    } else if (currentIndex >= 0 && currentIndex < navigationFlow.length - 1) {
      navigate(navigationFlow[currentIndex + 1]);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showBack && (
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      )}
      {showHome && (
        <Button variant="outline" size="sm" onClick={handleHome}>
          <Home className="mr-1 h-4 w-4" />
          Home
        </Button>
      )}
      {showNext && (
        <Button variant="outline" size="sm" onClick={handleNext}>
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export { NavigationButtons };
