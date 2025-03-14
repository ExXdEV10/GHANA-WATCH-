import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://citinewsroom.com/wp-content/uploads/2023/08/IMG-20230807-WA0097.jpg"
          alt="Road safety officer with flag"
          className="h-full w-full object-cover"
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Join the Movement for Safer Roads!
        </h1>
        <p className="mb-8 max-w-2xl text-xl sm:text-2xl">
          Together, we can make Ghana's roads safer for everyone.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8"
          >
            <Link to="/incident-submission">Report an Incident</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8"
          >
            <Link to="/how-it-works">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
