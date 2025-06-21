import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  UserProfile,
  MedicalReport,
  HealthMetrics,
  Notification,
  ChatConversation,
  Reminder
} from '../types/health';
interface HealthContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  reports: MedicalReport[];
  setReports: (reports: MedicalReport[]) => void;
  addReport: (report: MedicalReport) => void;
  healthMetrics: HealthMetrics;
  setHealthMetrics: (metrics: HealthMetrics) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  markNotificationAsRead: (id: number) => void;
  unreadCount: number;
  chatConversations: ChatConversation[];
  setChatConversations: (conversations: ChatConversation[]) => void;
  addChatConversation: (conversation: ChatConversation) => void;
  updateChatConversation: (conversation: ChatConversation) => void;
  currentChat: ChatConversation | null;
  setCurrentChat: (chat: ChatConversation | null) => void;
  reminders: Reminder[];
  setReminders: (reminders: Reminder[]) => void;
  addReminder: (reminder: Reminder) => void;
  toggleReminder: (id: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}
const HealthContext = createContext<HealthContextType | undefined>(undefined);
export const useHealth = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: 1,
    type: 'report_complete',
    title: 'Report Analysis Complete',
    message: 'Your lipid panel results are ready for review',
    timestamp: '2024-06-17T10:30:00Z',
    read: false,
    icon: 'file-text'
  },
  {
    id: 2,
    type: 'health_alert',
    title: 'High Cholesterol Alert',
    message: 'Your LDL levels are above recommended range',
    timestamp: '2024-06-17T09:15:00Z',
    read: true,
    icon: 'alert-triangle'
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Exercise Reminder',
    message: "Don't forget your 30-minute cardio session today",
    timestamp: '2024-06-17T08:00:00Z',
    read: false,
    icon: 'activity'
  }
];
export const HealthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('apiKey') || '';
  });
  useEffect(() => {
    localStorage.setItem('apiKey', apiKey);
  }, [apiKey]);
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    score: 85,
    cholesterol: 180,
    glucose: 95,
    blood_pressure: '120/80',
    bmi: 23.5
  });
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [chatConversations, setChatConversations] = useState<ChatConversation[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatConversation | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
  }, [isAuthenticated]);
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  const addReport = (report: MedicalReport) => {
    setReports(prev => [report, ...prev]);
  };
  const markNotificationAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  const addChatConversation = (conversation: ChatConversation) => {
    setChatConversations(prev => [conversation, ...prev]);
  };
  const updateChatConversation = (conversation: ChatConversation) => {
    setChatConversations(prev =>
      prev.map(conv => (conv.id === conversation.id ? conversation : conv))
    );
  };
  const unreadCount = notifications.filter(n => !n.read).length;
  const addReminder = (reminder: Reminder) => {
    setReminders(prev => [...prev, reminder]);
  };
  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
      )
    );
  };
  return (
    <HealthContext.Provider
      value={{
        user,
        setUser,
        reports,
        setReports,
        addReport,
        healthMetrics,
        setHealthMetrics,
        isAuthenticated,
        setIsAuthenticated,
        notifications,
        setNotifications,
        markNotificationAsRead,
        unreadCount,
        chatConversations,
        setChatConversations,
        addChatConversation,
        updateChatConversation,
        currentChat,
        setCurrentChat,
        reminders,
        setReminders,
        addReminder,
        toggleReminder,
        apiKey,
        setApiKey
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};
