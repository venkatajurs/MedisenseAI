
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import { useHealth } from '../contexts/HealthContext';
import { FileText, AlertTriangle, Activity, Bell, CheckCircle } from 'lucide-react';

interface NotificationsPageProps {
  onNavigate: (page: string) => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigate }) => {
  const { notifications, markNotificationAsRead } = useHealth();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'file-text':
        return <FileText className="h-6 w-6" />;
      case 'alert-triangle':
        return <AlertTriangle className="h-6 w-6" />;
      case 'activity':
        return <Activity className="h-6 w-6" />;
      default:
        return <Bell className="h-6 w-6" />;
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const now = Date.now();
    const time = new Date(timestamp).getTime();
    const diff = now - time;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    if (weeks === 1) return '1 week ago';
    return `${weeks} weeks ago`;
  };

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">Stay updated with your health alerts and reports</p>
          </div>
          
          {unreadNotifications.length > 0 && (
            <Button onClick={markAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card className="p-12 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-500">You'll see your health alerts and updates here when available.</p>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Unread Notifications */}
            {unreadNotifications.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Unread ({unreadNotifications.length})
                </h2>
                <div className="space-y-3">
                  {unreadNotifications.map((notification) => (
                    <Card key={notification.id} className="p-6 bg-blue-50 border-blue-200">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${
                          notification.type === 'health_alert' ? 'bg-red-100 text-red-600' :
                          notification.type === 'report_complete' ? 'bg-green-100 text-green-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {getIcon(notification.icon)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            <span className="text-sm text-blue-600 font-medium">NEW</span>
                          </div>
                          <p className="text-gray-700 mb-3">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {getRelativeTime(notification.timestamp)}
                            </span>
                            <Button 
                              size="sm" 
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              Mark as Read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Read Notifications */}
            {readNotifications.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Previous Notifications
                </h2>
                <div className="space-y-3">
                  {readNotifications.map((notification) => (
                    <Card key={notification.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${
                          notification.type === 'health_alert' ? 'bg-red-100 text-red-600' :
                          notification.type === 'report_complete' ? 'bg-green-100 text-green-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {getIcon(notification.icon)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {notification.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{notification.message}</p>
                          <span className="text-sm text-gray-500">
                            {getRelativeTime(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
