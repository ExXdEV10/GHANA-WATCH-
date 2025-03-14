import React from "react";
import Header from "../components/layout/Header";
import HeroSection from "../components/layout/HeroSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <div className="container mx-auto px-4 py-12">
          {/* Additional content can go here */}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
