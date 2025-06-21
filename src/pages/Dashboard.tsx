import React from 'react';
import { useHealth } from '../contexts/HealthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
const Dashboard: React.FC = () => {
  const { reports, user } = useHealth();
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Welcome back, {user?.name || 'User'}</h1>
      <p className="text-muted-foreground">Here's a summary of your latest medical reports and insights.</p>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.length === 0 ? (
          <p className="text-muted-foreground col-span-full">No medical reports found. Upload a report to get started.</p>
        ) : (
          reports.map((report) => (
            <Card key={report.id} className="rounded-2xl shadow-md p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium">{report.type}</h2>
                  <p className="text-sm text-muted-foreground">{new Date(report.date).toLocaleDateString()}</p>
                </div>
                <Badge variant={
                  report.status === 'completed'
                    ? 'default'
                    : report.status === 'processing'
                    ? 'secondary'
                    : 'destructive'
                }>
                  {report.status}
                </Badge>
              </div>
              {report.sourceFileName && (
                <p className="text-sm text-muted-foreground">
                  File: <span className="font-medium">{report.sourceFileName}</span>
                </p>
              )}
              {report.summary && (
                <div>
                  <p className="font-semibold">LLM Summary:</p>
                  <p className="text-sm text-muted-foreground">{report.summary}</p>
                </div>
              )}
              {report.llm_analysis && (
                <div>
                  <p className="font-semibold">Detailed LLM Analysis:</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{report.llm_analysis}</p>
                </div>
              )}
              {report.insights && report.insights.length > 0 && (
                <div>
                  <p className="font-semibold">Insights:</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {report.insights.map((insight, idx) => (
                      <li key={idx}>{insight}</li>
                    ))}
                  </ul>
                </div>
              )}
              {report.fileUrl && (
                <a
                  href={report.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Full Report
                </a>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
export default Dashboard;
