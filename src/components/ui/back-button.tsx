import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { ChevronLeft, ArrowLeft } from "lucide-react";

interface BackButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  label?: string;
  showIcon?: boolean;
  iconType?: "chevron" | "arrow";
  className?: string;
  onClick?: () => void;
}

const BackButton = ({
  variant = "outline",
  size = "default",
  label = "Back",
  showIcon = true,
  iconType = "chevron",
  className = "",
  onClick,
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      {showIcon && (
        <>
          {iconType === "chevron" ? (
            <ChevronLeft className="mr-2 h-4 w-4" />
          ) : (
            <ArrowLeft className="mr-2 h-4 w-4" />
          )}
        </>
      )}
      {label}
    </Button>
  );
};

export { BackButton };
