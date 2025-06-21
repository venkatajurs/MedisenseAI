export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profile: {
    age: number;
    gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    height: number; // cm
    weight: number; // kg
    dateOfBirth?: string;
    phone?: string;
    emergencyContact?: {
      name: string;
      phone: string;
    };
    conditions: string[];
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
    }>;
    allergies: string[];
    familyHistory: Array<{
      condition: string;
      relationship: string;
    }>;
    diet_type: string;
    exercise_frequency: number;
    sleep_hours: number;
    stress_level: number;
    smoking_status: 'never' | 'former' | 'current';
    alcohol_consumption: 'never' | 'occasional' | 'moderate' | 'heavy';
    water_intake: number;
    goals: string[];
    target_metrics?: {
      weight?: number;
      bmi?: number;
      cholesterol?: number;
      blood_pressure?: string;
    };
    timeline?: string;
  };
  preferences?: {
    notifications: {
      email_reports: boolean;
      reminder_checkups: boolean;
      weekly_summaries: boolean;
      research_updates: boolean;
    };
    privacy: {
      share_research: boolean;
      allow_export: boolean;
    };
  };
}

export interface HealthParameter {
  name: string;
  value: number;
  unit: string;
  reference_range: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  explanation: string;
}

export interface MedicalReport {
  id: string;
  date: string;
  type: string;
  status: 'processing' | 'completed' | 'error';
  parameters: HealthParameter[];
  summary: string;
  risk_level: 'low' | 'medium' | 'high';
  recommendations: {
    diet: string[];
    exercise: string[];
    lifestyle: string[];
  };

  // ✅ NEW FIELD: extracted health metrics for dashboard use
  analysis?: {
    cholesterol?: number;
    glucose?: number;
    blood_pressure?: string;
    bmi?: number;
    health_score?: number;
  };

  // ✅ Additional metadata from LLM
  llm_analysis?: string;         // 🔍 Full LLM-based detailed explanation
  insights?: string[];           // 💡 AI-generated key takeaways
  sourceFileName?: string;       // 📄 Name of the uploaded file (for UI)
  fileUrl?: string;              // 🔗 Optional file download or view
}

export interface HealthMetrics {
  score: number;
  cholesterol: number;
  glucose: number;
  blood_pressure: string;
  bmi: number;
}

export interface Notification {
  id: number;
  type: 'report_complete' | 'health_alert' | 'reminder' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system' | 'file';
  content: string;
  timestamp: string;
  fileData?: {
    name: string;
    type: string;
    size: number;
    status?: 'uploading' | 'processing' | 'completed' | 'error';
  };
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Reminder {
  id: string;
  title: string;
  type: 'medication' | 'exercise' | 'water' | 'checkup' | 'report' | 'custom';
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  time?: string;
  daysOfWeek?: number[];
  active: boolean;
  notifications: {
    email: boolean;
    browser: boolean;
  };
  createdAt: string;
}
