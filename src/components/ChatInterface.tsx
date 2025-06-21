// components/ChatInterface.tsx
import React from 'react';
import { Card } from '@/components/ui/card';

interface ChatInterfaceProps {
  user?: {
    name?: string;
  };
  contextData?: {
    metrics?: {
      score?: number;
    };
    recommendations?: {
      title: string;
      description: string;
    }[];
  };
  onMinimize?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user, contextData }) => {
  return (
    <Card className="p-4 h-[500px] overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">🧠 Health Assistant</h3>
      <div className="text-sm text-gray-600">
        <p>Hello <strong>{user?.name || 'John'}</strong>! 👋</p>
        <p>Your current health score is <strong>{contextData?.metrics?.score ?? 'N/A'}</strong>.</p>
        <p className="mt-2">This is a prototype placeholder for a future chat assistant.</p>
      </div>

      {contextData?.recommendations?.length ? (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">Sample Recommendations:</p>
          <ul className="list-disc list-inside text-xs text-gray-500 mt-1">
            {contextData.recommendations.slice(0, 3).map((rec, idx) => (
              <li key={idx}>{rec.title}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
};

export default ChatInterface;
