import React from "react";
import Header from "../components/layout/Header";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Main content will go here */}
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ghana Road Watch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Improving road safety through community reporting and government
            action
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
