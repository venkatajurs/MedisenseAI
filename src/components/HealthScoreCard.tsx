import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface HealthScoreCardProps {
  score: number;
  trend?: 'up' | 'down';
  trendValue?: number;
}

const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ 
  score, 
  trend = 'up', 
  trendValue = 3 
}) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#059669'; // green
    if (score >= 60) return '#D97706'; // amber
    return '#DC2626'; // red
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  return (
    <div className="health-card p-6 bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Health Score</h3>
        <div className="flex items-center text-sm text-gray-500">
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
          )}
          <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
            {trendValue}% this month
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
            role="img"
            aria-label={`Health score is ${score} out of 100`}
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={getScoreColor(score)}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">{score}</span>
            <span className="text-sm text-gray-500">/ 100</span>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-lg font-medium" style={{ color: getScoreColor(score) }}>
          {getScoreStatus(score)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Based on your latest report analysis
        </p>
      </div>
    </div>
  );
};

export default HealthScoreCard;
