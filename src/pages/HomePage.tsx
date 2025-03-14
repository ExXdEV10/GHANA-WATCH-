import React from "react";
import Header from "../components/layout/Header";
import HeroSection from "../components/layout/HeroSection";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Welcome to Ghana Road Watch
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-8">
            Our mission is to improve road safety across Ghana through citizen
            reporting, government oversight, and data-driven decision making.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Report Incidents</h3>
              <p className="text-gray-600 mb-4">
                Easily report road safety incidents, traffic violations, and
                infrastructure issues.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Track Progress</h3>
              <p className="text-gray-600 mb-4">
                Monitor the status of your reports and see how authorities are
                responding.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Improve Safety</h3>
              <p className="text-gray-600 mb-4">
                Help make Ghana's roads safer for everyone through your active
                participation.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
