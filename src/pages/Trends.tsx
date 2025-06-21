
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Header from '../components/Header';
import { TrendingUp, TrendingDown, Download } from 'lucide-react';

interface TrendsProps {
  onNavigate: (page: string) => void;
}

const Trends: React.FC<TrendsProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState('6M');
  const [selectedParameters, setSelectedParameters] = useState(['cholesterol', 'glucose', 'blood_pressure']);

  // Sample trend data
  const trendData = [
    { date: '2024-01', cholesterol: 220, glucose: 105, blood_pressure_sys: 140, blood_pressure_dia: 90, bmi: 25.2 },
    { date: '2024-02', cholesterol: 210, glucose: 98, blood_pressure_sys: 135, blood_pressure_dia: 88, bmi: 24.8 },
    { date: '2024-03', cholesterol: 200, glucose: 92, blood_pressure_sys: 130, blood_pressure_dia: 85, bmi: 24.5 },
    { date: '2024-04', cholesterol: 195, glucose: 88, blood_pressure_sys: 128, blood_pressure_dia: 82, bmi: 24.2 },
    { date: '2024-05', cholesterol: 185, glucose: 85, blood_pressure_sys: 125, blood_pressure_dia: 80, bmi: 23.8 },
    { date: '2024-06', cholesterol: 180, glucose: 82, blood_pressure_sys: 120, blood_pressure_dia: 78, bmi: 23.5 },
  ];

  const metrics = [
    {
      name: 'Total Cholesterol',
      current: 180,
      previous: 220,
      unit: 'mg/dL',
      status: 'improved',
      change: -18.2
    },
    {
      name: 'Blood Glucose',
      current: 82,
      previous: 105,
      unit: 'mg/dL',
      status: 'improved',
      change: -21.9
    },
    {
      name: 'Systolic BP',
      current: 120,
      previous: 140,
      unit: 'mmHg',
      status: 'improved',
      change: -14.3
    },
    {
      name: 'BMI',
      current: 23.5,
      previous: 25.2,
      unit: '',
      status: 'improved',
      change: -6.7
    }
  ];

  const exportData = (format: 'png' | 'pdf') => {
    // Simulate export functionality
    console.log(`Exporting trends as ${format.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Health Trends</h1>
          <p className="text-gray-600 mt-2">Track your health parameters over time</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1M">1 Month</SelectItem>
              <SelectItem value="3M">3 Months</SelectItem>
              <SelectItem value="6M">6 Months</SelectItem>
              <SelectItem value="1Y">1 Year</SelectItem>
              <SelectItem value="ALL">All Time</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => exportData('png')}>
              <Download className="h-4 w-4 mr-2" />
              Export PNG
            </Button>
            <Button variant="outline" onClick={() => exportData('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.name} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                {metric.status === 'improved' ? (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {metric.current}
                </span>
                <span className="text-sm text-gray-500">{metric.unit}</span>
              </div>
              <div className="mt-2">
                <span className={`text-sm font-medium ${
                  metric.status === 'improved' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cholesterol Trend */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Cholesterol Levels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cholesterol" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  name="Total Cholesterol (mg/dL)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Blood Glucose Trend */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Blood Glucose</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="glucose" 
                  stroke="#059669" 
                  strokeWidth={2}
                  name="Glucose (mg/dL)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Blood Pressure Trend */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Blood Pressure</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="blood_pressure_sys" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  name="Systolic (mmHg)"
                />
                <Line 
                  type="monotone" 
                  dataKey="blood_pressure_dia" 
                  stroke="#d97706" 
                  strokeWidth={2}
                  name="Diastolic (mmHg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* BMI Trend */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Body Mass Index</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="bmi" 
                  fill="#0891b2" 
                  name="BMI"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Insights Panel */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Health Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <TrendingDown className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">Excellent Progress!</h4>
                <p className="text-green-700 text-sm">
                  Your cholesterol levels have improved by 18% over the past 6 months. Keep up the great work with your Mediterranean diet!
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <TrendingDown className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Blood Pressure Improvement</h4>
                <p className="text-blue-700 text-sm">
                  Your blood pressure has normalized from stage 1 hypertension to optimal levels. Continue your current exercise routine.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Maintain Current Lifestyle</h4>
                <p className="text-yellow-700 text-sm">
                  Your current health trends are very positive. Maintain your current diet and exercise routine for continued improvement.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Trends;
