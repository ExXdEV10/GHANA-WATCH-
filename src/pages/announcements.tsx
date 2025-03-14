import React from "react";
import Header from "../components/layout/Header";

const AnnouncementsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Public Announcements
          </h1>
          <div className="prose prose-lg max-w-4xl">
            <p>
              Stay updated with the latest announcements and news from Ghana
              Road Watch and our partner agencies.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnnouncementsPage;
