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

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/incident-map" element={<IncidentMap />} />
          <Route path="/case-management" element={<CaseManagement />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/whistleblower" element={<WhistleblowerPage />} />
          <Route
            path="/incident-submission"
            element={<IncidentSubmissionPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          {/* Add a catch-all route that redirects to home */}
          <Route path="*" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
