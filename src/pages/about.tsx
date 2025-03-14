import React from "react";
import Header from "../components/layout/Header";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
          <div className="prose prose-lg max-w-4xl">
            <p>
              Ghana Road Watch is a collaborative initiative between government
              agencies and citizens to improve road safety across Ghana through
              reporting, monitoring, and swift action.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
