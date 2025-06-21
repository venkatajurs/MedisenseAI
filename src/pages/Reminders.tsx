
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '../components/Header';
import { useHealth } from '../contexts/HealthContext';
import { Reminder } from '../types/health';
import { Plus, Clock, Pill, Activity, Droplets, Calendar, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RemindersProps {
  onNavigate: (page: string) => void;
}

const Reminders: React.FC<RemindersProps> = ({ onNavigate }) => {
  const { reminders, addReminder, toggleReminder } = useHealth();
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    title: '',
    type: 'custom',
    frequency: 'daily',
    time: '09:00',
    daysOfWeek: [],
    active: true,
    notifications: {
      email: true,
      browser: true
    }
  });

  const reminderTypes = [
    { value: 'medication', label: 'Medication', icon: Pill },
    { value: 'exercise', label: 'Exercise', icon: Activity },
    { value: 'water', label: 'Water Intake', icon: Droplets },
    { value: 'checkup', label: 'Checkup', icon: Calendar },
    { value: 'report', label: 'Upload Report', icon: AlertCircle },
    { value: 'custom', label: 'Custom', icon: Clock }
  ];

  const daysOfWeek = [
    { value: 0, label: 'Sun' },
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' },
    { value: 5, label: 'Fri' },
    { value: 6, label: 'Sat' }
  ];

  const handleAddReminder = () => {
    if (!newReminder.title?.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reminder title.",
        variant: "destructive"
      });
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      type: newReminder.type || 'custom',
      frequency: newReminder.frequency || 'daily',
      time: newReminder.time,
      daysOfWeek: newReminder.daysOfWeek || [],
      active: newReminder.active || true,
      notifications: newReminder.notifications || { email: true, browser: true },
      createdAt: new Date().toISOString()
    };

    addReminder(reminder);
    setShowAddReminder(false);
    setNewReminder({
      title: '',
      type: 'custom',
      frequency: 'daily',
      time: '09:00',
      daysOfWeek: [],
      active: true,
      notifications: { email: true, browser: true }
    });

    toast({
      title: "Reminder Added",
      description: "Your reminder has been created successfully.",
    });
  };

  const getIcon = (type: string) => {
    const reminderType = reminderTypes.find(t => t.value === type);
    const IconComponent = reminderType?.icon || Clock;
    return <IconComponent className="h-5 w-5" />;
  };

  const getFrequencyText = (reminder: Reminder) => {
    if (reminder.frequency === 'daily') return 'Daily';
    if (reminder.frequency === 'weekly' && reminder.daysOfWeek?.length) {
      return `Weekly on ${reminder.daysOfWeek.map(d => daysOfWeek.find(day => day.value === d)?.label).join(', ')}`;
    }
    if (reminder.frequency === 'monthly') return 'Monthly';
    return 'Custom';
  };

  // Sample reminders if none exist
  React.useEffect(() => {
    if (reminders.length === 0) {
      const sampleReminders: Reminder[] = [
        {
          id: '1',
          title: 'Take morning medication',
          type: 'medication',
          frequency: 'daily',
          time: '08:00',
          active: true,
          notifications: { email: true, browser: true },
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: '30-minute cardio workout',
          type: 'exercise',
          frequency: 'weekly',
          time: '18:00',
          daysOfWeek: [1, 3, 5], // Mon, Wed, Fri
          active: true,
          notifications: { email: false, browser: true },
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Drink water',
          type: 'water',
          frequency: 'daily',
          time: '10:00',
          active: false,
          notifications: { email: false, browser: true },
          createdAt: new Date().toISOString()
        }
      ];
      
      sampleReminders.forEach(reminder => addReminder(reminder));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reminders</h1>
            <p className="text-gray-600 mt-2">Manage your health reminders and notifications</p>
          </div>
          
          <Dialog open={showAddReminder} onOpenChange={setShowAddReminder}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Reminder</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newReminder.title || ''}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    placeholder="Enter reminder title"
                  />
                </div>
                
                <div>
                  <Label>Type</Label>
                  <Select 
                    value={newReminder.type} 
                    onValueChange={(value) => setNewReminder({...newReminder, type: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reminderTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Frequency</Label>
                  <Select 
                    value={newReminder.frequency} 
                    onValueChange={(value) => setNewReminder({...newReminder, frequency: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {newReminder.frequency === 'weekly' && (
                  <div>
                    <Label>Days of Week</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {daysOfWeek.map((day) => (
                        <div key={day.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`day-${day.value}`}
                            checked={newReminder.daysOfWeek?.includes(day.value)}
                            onCheckedChange={(checked) => {
                              const days = newReminder.daysOfWeek || [];
                              if (checked) {
                                setNewReminder({...newReminder, daysOfWeek: [...days, day.value]});
                              } else {
                                setNewReminder({...newReminder, daysOfWeek: days.filter(d => d !== day.value)});
                              }
                            }}
                          />
                          <Label htmlFor={`day-${day.value}`} className="text-sm">{day.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time || '09:00'}
                    onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>Notification Methods</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notif">Email notifications</Label>
                      <Switch
                        id="email-notif"
                        checked={newReminder.notifications?.email}
                        onCheckedChange={(checked) => setNewReminder({
                          ...newReminder, 
                          notifications: {...newReminder.notifications, email: checked}
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="browser-notif">Browser notifications</Label>
                      <Switch
                        id="browser-notif"
                        checked={newReminder.notifications?.browser}
                        onCheckedChange={(checked) => setNewReminder({
                          ...newReminder, 
                          notifications: {...newReminder.notifications, browser: checked}
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowAddReminder(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddReminder}>
                  Create Reminder
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reminders List */}
        <div className="space-y-4">
          {reminders.length === 0 ? (
            <Card className="p-12 text-center">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders yet</h3>
              <p className="text-gray-500 mb-4">Create your first reminder to stay on top of your health routine.</p>
              <Button onClick={() => setShowAddReminder(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Reminder
              </Button>
            </Card>
          ) : (
            reminders.map((reminder) => (
              <Card key={reminder.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${
                      reminder.type === 'medication' ? 'bg-blue-100 text-blue-600' :
                      reminder.type === 'exercise' ? 'bg-green-100 text-green-600' :
                      reminder.type === 'water' ? 'bg-cyan-100 text-cyan-600' :
                      reminder.type === 'checkup' ? 'bg-purple-100 text-purple-600' :
                      reminder.type === 'report' ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {getIcon(reminder.type)}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{reminder.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {getFrequencyText(reminder)}
                        </span>
                        {reminder.time && (
                          <span className="text-sm text-gray-500">
                            at {reminder.time}
                          </span>
                        )}
                        <div className="flex items-center space-x-2">
                          {reminder.notifications.email && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Email</span>
                          )}
                          {reminder.notifications.browser && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Browser</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={reminder.active}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
