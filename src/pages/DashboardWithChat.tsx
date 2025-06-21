import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Upload,
  TrendingUp,
  Clock,
  Heart,
  Droplets,
  Activity,
  Scale,
  Bot,
  Minimize2,
} from 'lucide-react';

import Header from '../components/Header';
import HealthScoreCard from '../components/HealthScoreCard';
import HealthMetricCard from '../components/HealthMetricCard';
import RecommendationCard from '../components/RecommendationCard';
import { useHealth } from '../contexts/HealthContext';
import ChatInterface from '../components/ChatInterface';
import type { AIReportSummary } from '../services/summarizeReport';

interface UploadedReport {
  id: string;
  summary: AIReportSummary;
}

interface DashboardWithChatProps {
  onUploadReport: () => void;
  onNavigate: (page: string) => void;
  reports: UploadedReport[];
}

const DashboardWithChat: React.FC<DashboardWithChatProps> = ({
  onUploadReport,
  onNavigate,
  reports,
}) => {
  const { user, healthMetrics } = useHealth();
  const [isChatOpen, setIsChatOpen] = useState(true);

  const latestReport = reports.length > 0 ? reports[reports.length - 1] : null;

  const quickActions = useMemo(() => [
    {
      title: 'Upload Report',
      description: 'Upload and analyze new medical reports',
      icon: Upload,
      color: 'bg-blue-500',
      onClick: onUploadReport,
    },
    {
      title: 'View Trends',
      description: 'Track your health parameters over time',
      icon: TrendingUp,
      color: 'bg-green-500',
      onClick: () => onNavigate('trends'),
    },
    {
      title: 'Set Reminders',
      description: 'Manage medication and health reminders',
      icon: Clock,
      color: 'bg-purple-500',
      onClick: () => onNavigate('reminders'),
    },
  ], [onUploadReport, onNavigate]);

  const recommendations = useMemo(() => [
    {
      title: 'Monitor Blood Sugar',
      description: user?.profile?.conditions?.includes('Pre-diabetes')
        ? 'Check your glucose levels regularly and log them in your health tracker'
        : 'Consider annual glucose screening as part of preventive care',
      category: 'monitoring' as const,
      priority: 'high' as const,
    },
    {
      title: 'Increase Fiber Intake',
      description: 'Add more soluble fiber to help manage cholesterol and blood sugar',
      category: 'diet' as const,
      priority: 'medium' as const,
    },
    {
      title: 'Regular Exercise',
      description: `${user?.profile?.exercise_frequency || 3}x per week is great! Consider adding strength training`,
      category: 'exercise' as const,
      priority: 'medium' as const,
      completed: true,
    },
  ], [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />

      <div className="max-w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || 'John'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's your personalized health overview</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Dashboard - Left */}
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action) => (
                <Card
                  key={action.title}
                  role="button"
                  tabIndex={0}
                  className="p-6 cursor-pointer hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={action.onClick}
                  aria-label={action.title}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <HealthScoreCard score={healthMetrics.score} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HealthMetricCard
                title="Cholesterol"
                value={healthMetrics.cholesterol}
                unit="mg/dL"
                status="normal"
                icon={Heart}
                change={{ trend: 'down', value: 5.2 }}
              />
              <HealthMetricCard
                title="Blood Glucose"
                value={healthMetrics.glucose}
                unit="mg/dL"
                status="normal"
                icon={Droplets}
                change={{ trend: 'down', value: 2.1 }}
              />
              <HealthMetricCard
                title="Blood Pressure"
                value={healthMetrics.blood_pressure}
                unit=""
                status="normal"
                icon={Activity}
                change={{ trend: 'down', value: 3.5 }}
              />
              <HealthMetricCard
                title="BMI"
                value={healthMetrics.bmi}
                unit=""
                status="normal"
                icon={Scale}
                change={{ trend: 'down', value: 1.2 }}
              />
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personalized Recommendations</h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <RecommendationCard
                    key={index}
                    title={rec.title}
                    description={rec.description}
                    category={rec.category}
                    priority={rec.priority}
                    completed={rec.completed}
                  />
                ))}
              </div>
            </Card>

            {latestReport && (
              <Card className="p-6 bg-yellow-50 border border-yellow-300 mt-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  🧾 Latest Report Summary
                </h3>
                <p className="text-sm text-yellow-700 whitespace-pre-wrap">{latestReport.summary?.summary}</p>
              </Card>
            )}
          </div>

          {/* Chat Interface - Right Panel */}
          <div className="w-full md:w-[30%] md:border-l md:pl-4 relative">
            {isChatOpen ? (
              <div className="relative bg-white border rounded-lg shadow-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsChatOpen(false)}
                  className="absolute top-2 right-2 z-10"
                  aria-label="Minimize Chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <ChatInterface
                  user={user}
                  contextData={{
                    metrics: healthMetrics,
                    recommendations,
                  }}
                  onMinimize={() => setIsChatOpen(false)}
                />
              </div>
            ) : (
              <Button
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-4 right-4 z-50 flex items-center gap-2 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
                aria-label="Open Chat"
              >
                <Bot className="w-5 h-5" />
                Chat
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWithChat;
