import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/ghana-road-watch-logo.svg"
        alt="Ghana Road Watch Logo"
        className="h-10 w-10 mr-2"
      />
      <span className="text-xl font-bold">Ghana Road Watch</span>
    </div>
  );
};

export default Logo;
