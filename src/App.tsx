import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HealthProvider, useHealth } from "./contexts/HealthContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import DashboardWithChat from "./pages/DashboardWithChat";
import UploadReport from "./pages/UploadReport";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Trends from "./pages/Trends";
import Reminders from "./pages/Reminders";
import NotificationsPage from "./pages/NotificationsPage";

import { UserProfile } from "./types/health";
import { AIReportSummary } from "./services/summarizeReport";

const queryClient = new QueryClient();

type AppState = 
  | 'landing'
  | 'auth'
  | 'dashboard'
  | 'upload'
  | 'profile'
  | 'chat'
  | 'trends'
  | 'reminders'
  | 'notifications';

type UploadedReport = {
  id: string;
  summary: AIReportSummary;
};

const AppContent: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useHealth();

  const [reports, setReports] = useState<UploadedReport[]>([]); // ✅ NEW STATE

  const handleGetStarted = () => setAppState('auth');

  const handleAuth = (userData: UserProfile) => {
    setUser(userData);
    setIsAuthenticated(true);
    setAppState('dashboard');
  };

  const handleNavigate = (page: AppState) => setAppState(page);

  // ✅ Accept full report, not just ID
  const handleUploadComplete = (report: UploadedReport) => {
    setReports(prev => [...prev, report]); // ✅ Add to state
    setAppState('dashboard');
  };

  // --- Main Flow ---
  if (!isAuthenticated) {
    if (appState === 'landing') {
      return <Landing onGetStarted={handleGetStarted} />;
    } else {
      return <Auth onAuth={handleAuth} />;
    }
  }

  switch (appState) {
    case 'upload':
      return (
        <UploadReport
          onBack={() => handleNavigate('dashboard')}
          onUploadComplete={handleUploadComplete} // ✅ pass full report object
        />
      );
    case 'profile':
      return <Profile onNavigate={handleNavigate} />;
    case 'chat':
      return <Chat onNavigate={handleNavigate} />;
    case 'trends':
      return <Trends onNavigate={handleNavigate} />;
    case 'reminders':
      return <Reminders onNavigate={handleNavigate} />;
    case 'notifications':
      return <NotificationsPage onNavigate={handleNavigate} />;
    case 'dashboard':
    default:
      return (
        <DashboardWithChat
          onUploadReport={() => handleNavigate('upload')}
          onNavigate={handleNavigate}
          reports={reports} // ✅ pass reports to dashboard
        />
      );
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HealthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </HealthProvider>
  </QueryClientProvider>
);

export default App;
