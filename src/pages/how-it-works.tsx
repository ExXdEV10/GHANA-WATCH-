import React from "react";
import Header from "../components/layout/Header";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <div className="prose prose-lg max-w-4xl">
            <p>
              Learn how Ghana Road Watch helps improve road safety through
              citizen reporting and government action.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorksPage;
