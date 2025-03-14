import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import IncidentMap from "./pages/incident-map";
import CaseManagement from "./pages/case-management";
import AnalyticsPage from "./pages/analytics";
import WhistleblowerPage from "./pages/whistleblower";
import LoginPage from "./pages/login";
import IncidentSubmissionPage from "./pages/incident-submission";
import ProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/how-it-works" element={<HomePage />} />
        <Route path="/announcements" element={<HomePage />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incident-map"
          element={
            <ProtectedRoute>
              <IncidentMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/case-management"
          element={
            <ProtectedRoute>
              <CaseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/whistleblower"
          element={
            <ProtectedRoute>
              <WhistleblowerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incident-submission"
          element={
            <ProtectedRoute>
              <IncidentSubmissionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        {/* Add a catch-all route that redirects to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;
