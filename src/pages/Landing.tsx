
import React from 'react';
import { ArrowRight, CheckCircle, Upload, BarChart3, Shield, MessageCircle, TrendingUp, Users } from 'lucide-react';
import { Button } from '../components/ui/button';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Upload,
      title: 'Smart Report Upload',
      description: 'Upload any medical report format - PDF, images, or scanned documents. Our AI extracts and interprets all data automatically.'
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Analysis',
      description: 'Get detailed insights into your health parameters with easy-to-understand explanations and trend analysis.'
    },
    {
      icon: Shield,
      title: 'Personalized Recommendations',
      description: 'Receive tailored health advice based on your unique profile, medical history, and current results.'
    },
    {
      icon: MessageCircle,
      title: 'AI Health Chat',
      description: 'Ask questions about your reports anytime with our 24/7 AI health assistant that knows your complete medical history.'
    },
    {
      icon: TrendingUp,
      title: 'Health Tracking',
      description: 'Monitor your progress over time with intelligent trend analysis and personalized health score tracking.'
    },
    {
      icon: Users,
      title: 'Doctor Integration',
      description: 'Share reports and insights seamlessly with your healthcare providers for better coordinated care.'
    }
  ];

  const benefits = [
    'AI-powered medical report interpretation',
    'Integrated chat system with health context',
    'Personalized dietary recommendations',
    'Exercise plans tailored to your condition',
    'Early risk detection and alerts',
    'Secure, HIPAA-compliant data storage'
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Complete Your Profile',
      description: 'Add your medical history, conditions, medications, and health goals for personalized insights.'
    },
    {
      step: '02',
      title: 'Upload Reports',
      description: 'Drag and drop medical reports for instant AI analysis and integration with your health profile.'
    },
    {
      step: '03',
      title: 'Get AI Analysis',
      description: 'Receive instant, personalized health insights with clear explanations and actionable recommendations.'
    },
    {
      step: '04',
      title: 'Chat & Ask Questions',
      description: 'Interactive AI assistant that knows your complete medical history and provides contextual answers.'
    },
    {
      step: '05',
      title: 'Track Progress',
      description: 'Monitor health trends and improvements with personalized dashboards and progress tracking.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Pre-diabetic Patient',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c6b3?w=100&h=100&fit=crop&crop=face',
      quote: 'Medisense AI helped me understand my HbA1c results and gave me specific diet recommendations. My levels improved by 0.8% in 6 months!'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
      quote: 'The report analysis accuracy is impressive. My patients come to appointments better informed and engaged in their care.'
    },
    {
      name: 'Robert Martinez',
      role: 'Heart Disease Patient',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      quote: 'The AI chat feature is like having a knowledgeable health coach available 24/7. It remembers all my conditions and medications.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l1.5 4.5H18l-3.75 2.75L15.75 14 12 11.25 8.25 14l1.5-4.75L6 6.5h4.5L12 2z"/>
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">Medisense AI</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm" onClick={onGetStarted}>Get Started Free</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Understand Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Medical Reports
              </span>
              <br />
              Like Never Before
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Medisense AI transforms complex medical reports into clear, actionable insights. 
              Get personalized recommendations and track your health journey with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                onClick={onGetStarted}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">10k+</div>
                <div className="text-sm text-gray-600">Reports Analyzed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">AI Assistant</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Health Intelligence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced AI technology makes understanding your health reports simple and actionable
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Medisense AI Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Five simple steps to transform your health understanding
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Take Control of Your Health Journey
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Don't let complex medical jargon confuse you. Our AI breaks down your reports 
                into clear, understandable insights that empower you to make informed health decisions.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <div className="font-medium text-gray-900">HbA1c</div>
                      <div className="text-sm text-gray-600">5.9% (Improved!)</div>
                    </div>
                    <div className="text-green-600 font-medium">Normal</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <div className="font-medium text-gray-900">Cholesterol</div>
                      <div className="text-sm text-gray-600">185 mg/dL</div>
                    </div>
                    <div className="text-blue-600 font-medium">Good</div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center mb-2">
                      <MessageCircle className="h-4 w-4 text-purple-600 mr-2" />
                      <div className="font-medium text-gray-900">AI Insight</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      "Great progress! Your HbA1c improved from 6.2% to 5.9%. Your Mediterranean diet and exercise routine are working well. Keep it up!"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Patients and Doctors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how Medisense AI is transforming healthcare understanding
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health Understanding?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust Medisense AI for clear, actionable health insights.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            onClick={onGetStarted}
          >
            Start Your Free Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l1.5 4.5H18l-3.75 2.75L15.75 14 12 11.25 8.25 14l1.5-4.75L6 6.5h4.5L12 2z"/>
                    </svg>
                  </div>
                </div>
                <span className="text-xl font-bold">Medisense AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming healthcare through intelligent report analysis and personalized insights.
              </p>
              <div className="text-sm text-gray-500">
                <p className="mb-1">© 2024 Medisense AI</p>
                <p>Not intended to replace professional medical advice</p>
                <div className="flex items-center mt-2">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>HIPAA Compliant</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Medisense AI</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Report Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Chat</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Progress Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Doctor Sharing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
