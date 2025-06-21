import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface RecommendationCardProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'diet' | 'exercise' | 'lifestyle' | 'monitoring';
  completed?: boolean;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  priority,
  category,
  completed = false
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'diet': return '🥗';
    case 'exercise': return '🏃‍♂️';
    case 'lifestyle': return '💡';
    case 'monitoring': return '🩺'; // Add this
    default: return '📋';
  }
};

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return null;
    }
  };

  return (
    <div
      className={`health-card border-l-4 ${getPriorityColor(priority)} p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow`}
      aria-label={`Recommendation: ${title}, Priority: ${priority}, Category: ${category}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <span className="text-lg mr-2" aria-hidden="true">{getCategoryIcon(category)}</span>
          <h4 className="font-medium text-gray-900">{title}</h4>
        </div>
        <div className="flex items-center space-x-2">
          {getPriorityIcon(priority)}
          {completed && <CheckCircle className="h-4 w-4 text-green-600" />}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 capitalize">
          {priority} priority • {category}
        </span>
        <button
          className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          aria-label={completed ? 'Marked as completed' : 'Mark recommendation as done'}
        >
          {completed ? 'Completed' : 'Mark Done'}
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;
