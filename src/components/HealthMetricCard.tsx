
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  icon: LucideIcon;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  title,
  value,
  unit,
  status,
  icon: Icon,
  change
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-health-success bg-green-50 border-green-200';
      case 'high': return 'text-health-warning bg-yellow-50 border-yellow-200';
      case 'low': return 'text-health-warning bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-health-danger bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'high': return 'High';
      case 'low': return 'Low';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  };

  return (
    <div className="health-card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="p-2 bg-health-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-health-primary" />
          </div>
          <h4 className="ml-3 text-sm font-medium text-gray-900">{title}</h4>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </span>
      </div>
      
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
        </div>
        
        {change && (
          <div className={`flex items-center text-sm ${
            change.trend === 'up' ? 'text-health-danger' : 'text-health-success'
          }`}>
            <span>{change.trend === 'up' ? '↑' : '↓'} {Math.abs(change.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthMetricCard;
