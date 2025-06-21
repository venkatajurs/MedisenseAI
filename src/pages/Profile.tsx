
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '../components/Header';
import { useHealth } from '../contexts/HealthContext';
import { toast } from '@/hooks/use-toast';

interface ProfileProps {
  onNavigate: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const { user, setUser } = useHealth();
  const [formData, setFormData] = useState(user || {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    profile: {
      age: 35,
      gender: 'male' as const,
      height: 175,
      weight: 70,
      dateOfBirth: '1989-01-15',
      phone: '+1 (555) 123-4567',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+1 (555) 987-6543'
      },
      conditions: ['Hypertension'],
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily' }
      ],
      allergies: ['Penicillin'],
      familyHistory: [
        { condition: 'Diabetes', relationship: 'Parent' }
      ],
      diet_type: 'Mediterranean',
      exercise_frequency: 4,
      sleep_hours: 7,
      stress_level: 3,
      smoking_status: 'never' as const,
      alcohol_consumption: 'occasional' as const,
      water_intake: 8,
      goals: ['Maintain Weight', 'Improve Cardiovascular Health'],
      target_metrics: {
        weight: 68,
        cholesterol: 180,
        blood_pressure: '120/80'
      },
      timeline: '6 months'
    },
    preferences: {
      notifications: {
        email_reports: true,
        reminder_checkups: true,
        weekly_summaries: false,
        research_updates: true
      },
      privacy: {
        share_research: false,
        allow_export: true
      }
    }
  });

  const handleSave = () => {
    setUser(formData);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handlePreferenceChange = (category: string, field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: {
          ...prev.preferences?.[category],
          [field]: value
        }
      }
    }));
  };

  const availableConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 
    'Thyroid Disorders', 'High Cholesterol', 'Obesity', 'Depression', 'Anxiety'
  ];

  const availableAllergies = [
    'Penicillin', 'Peanuts', 'Shellfish', 'Latex', 'Dust', 'Pollen', 
    'Pet Dander', 'Eggs', 'Milk', 'Soy'
  ];

  const healthGoals = [
    'Lose Weight', 'Gain Weight', 'Maintain Weight', 'Improve Cardiovascular Health',
    'Manage Diabetes', 'Lower Cholesterol', 'Increase Energy', 'Better Sleep',
    'Reduce Stress', 'Build Muscle', 'Improve Flexibility', 'Quit Smoking'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.profile.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.profile.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.profile.height}
                    onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.profile.weight}
                    onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.profile.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergency-name">Name</Label>
                    <Input
                      id="emergency-name"
                      value={formData.profile.emergencyContact?.name || ''}
                      onChange={(e) => handleInputChange('emergencyContact', {
                        ...formData.profile.emergencyContact,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency-phone">Phone</Label>
                    <Input
                      id="emergency-phone"
                      value={formData.profile.emergencyContact?.phone || ''}
                      onChange={(e) => handleInputChange('emergencyContact', {
                        ...formData.profile.emergencyContact,
                        phone: e.target.value
                      })}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="medical">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Medical History</h2>
              
              <div className="space-y-6">
                <div>
                  <Label>Current Conditions</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {availableConditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={formData.profile.conditions.includes(condition)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange('conditions', [...formData.profile.conditions, condition]);
                            } else {
                              handleInputChange('conditions', formData.profile.conditions.filter(c => c !== condition));
                            }
                          }}
                        />
                        <Label htmlFor={condition} className="text-sm">{condition}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Allergies</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {availableAllergies.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox
                          id={allergy}
                          checked={formData.profile.allergies.includes(allergy)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange('allergies', [...formData.profile.allergies, allergy]);
                            } else {
                              handleInputChange('allergies', formData.profile.allergies.filter(a => a !== allergy));
                            }
                          }}
                        />
                        <Label htmlFor={allergy} className="text-sm">{allergy}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Current Medications</Label>
                  <div className="space-y-3 mt-2">
                    {formData.profile.medications.map((med, index) => (
                      <div key={index} className="flex gap-3">
                        <Input
                          placeholder="Medication name"
                          value={med.name}
                          onChange={(e) => {
                            const newMeds = [...formData.profile.medications];
                            newMeds[index] = {...med, name: e.target.value};
                            handleInputChange('medications', newMeds);
                          }}
                        />
                        <Input
                          placeholder="Dosage"
                          value={med.dosage}
                          onChange={(e) => {
                            const newMeds = [...formData.profile.medications];
                            newMeds[index] = {...med, dosage: e.target.value};
                            handleInputChange('medications', newMeds);
                          }}
                        />
                        <Input
                          placeholder="Frequency"
                          value={med.frequency}
                          onChange={(e) => {
                            const newMeds = [...formData.profile.medications];
                            newMeds[index] = {...med, frequency: e.target.value};
                            handleInputChange('medications', newMeds);
                          }}
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleInputChange('medications', [
                          ...formData.profile.medications,
                          { name: '', dosage: '', frequency: '' }
                        ]);
                      }}
                    >
                      Add Medication
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="lifestyle">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Lifestyle & Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <Label>Diet Type</Label>
                  <Select value={formData.profile.diet_type} onValueChange={(value) => handleInputChange('diet_type', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="omnivore">Omnivore</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="paleo">Paleo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Exercise Frequency (days per week): {formData.profile.exercise_frequency}</Label>
                  <Slider
                    value={[formData.profile.exercise_frequency]}
                    onValueChange={(value) => handleInputChange('exercise_frequency', value[0])}
                    max={7}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Sleep Hours: {formData.profile.sleep_hours}</Label>
                  <Slider
                    value={[formData.profile.sleep_hours]}
                    onValueChange={(value) => handleInputChange('sleep_hours', value[0])}
                    min={4}
                    max={12}
                    step={0.5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Stress Level (1-10): {formData.profile.stress_level}</Label>
                  <Slider
                    value={[formData.profile.stress_level]}
                    onValueChange={(value) => handleInputChange('stress_level', value[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Smoking Status</Label>
                  <Select value={formData.profile.smoking_status} onValueChange={(value) => handleInputChange('smoking_status', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="former">Former</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Alcohol Consumption</Label>
                  <Select value={formData.profile.alcohol_consumption} onValueChange={(value) => handleInputChange('alcohol_consumption', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="heavy">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Water Intake (glasses per day): {formData.profile.water_intake}</Label>
                  <Slider
                    value={[formData.profile.water_intake]}
                    onValueChange={(value) => handleInputChange('water_intake', value[0])}
                    min={1}
                    max={15}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Health Goals</h2>
              
              <div className="space-y-6">
                <div>
                  <Label>Primary Goals</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {healthGoals.map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={formData.profile.goals.includes(goal)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange('goals', [...formData.profile.goals, goal]);
                            } else {
                              handleInputChange('goals', formData.profile.goals.filter(g => g !== goal));
                            }
                          }}
                        />
                        <Label htmlFor={goal} className="text-sm">{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Target Metrics</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label htmlFor="target-weight" className="text-sm">Target Weight (kg)</Label>
                      <Input
                        id="target-weight"
                        type="number"
                        value={formData.profile.target_metrics?.weight || ''}
                        onChange={(e) => handleInputChange('target_metrics', {
                          ...formData.profile.target_metrics,
                          weight: parseInt(e.target.value)
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="target-cholesterol" className="text-sm">Target Cholesterol</Label>
                      <Input
                        id="target-cholesterol"
                        type="number"
                        value={formData.profile.target_metrics?.cholesterol || ''}
                        onChange={(e) => handleInputChange('target_metrics', {
                          ...formData.profile.target_metrics,
                          cholesterol: parseInt(e.target.value)
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="target-bp" className="text-sm">Target Blood Pressure</Label>
                      <Input
                        id="target-bp"
                        value={formData.profile.target_metrics?.blood_pressure || ''}
                        onChange={(e) => handleInputChange('target_metrics', {
                          ...formData.profile.target_metrics,
                          blood_pressure: e.target.value
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Timeline</Label>
                  <Select value={formData.profile.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3 months">3 months</SelectItem>
                      <SelectItem value="6 months">6 months</SelectItem>
                      <SelectItem value="1 year">1 year</SelectItem>
                      <SelectItem value="2 years">2 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email notifications for new reports</Label>
                      <p className="text-sm text-gray-500">Get notified when report analysis is complete</p>
                    </div>
                    <Switch
                      checked={formData.preferences?.notifications.email_reports}
                      onCheckedChange={(checked) => handlePreferenceChange('notifications', 'email_reports', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Checkup reminders</Label>
                      <p className="text-sm text-gray-500">Reminder notifications for regular checkups</p>
                    </div>
                    <Switch
                      checked={formData.preferences?.notifications.reminder_checkups}
                      onCheckedChange={(checked) => handlePreferenceChange('notifications', 'reminder_checkups', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly health summaries</Label>
                      <p className="text-sm text-gray-500">Weekly digest of your health trends</p>
                    </div>
                    <Switch
                      checked={formData.preferences?.notifications.weekly_summaries}
                      onCheckedChange={(checked) => handlePreferenceChange('notifications', 'weekly_summaries', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Research updates and tips</Label>
                      <p className="text-sm text-gray-500">Latest health research and personalized tips</p>
                    </div>
                    <Switch
                      checked={formData.preferences?.notifications.research_updates}
                      onCheckedChange={(checked) => handlePreferenceChange('notifications', 'research_updates', checked)}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Share data for research (anonymized)</Label>
                      <p className="text-sm text-gray-500">Help improve healthcare research with anonymous data</p>
                    </div>
                    <Switch
                      checked={formData.preferences?.privacy.share_research}
                      onCheckedChange={(checked) => handlePreferenceChange('privacy', 'share_research', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow data export to healthcare providers</Label>
                      <p className="text-sm text-gray-500">Enable sharing reports with your doctors</p>
                    </div>
                    <Switch
                      checked={formData.preferences?.privacy.allow_export}
                      onCheckedChange={(checked) => handlePreferenceChange('privacy', 'allow_export', checked)}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Data Management</h2>
                
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Export All Data
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
