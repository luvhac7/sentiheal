
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Brain, Shield, Users, Phone, ChevronRight, Star } from "lucide-react";
import { AIChat } from "@/components/AIChat";
import { MoodTracker } from "@/components/MoodTracker";
import { CBTExercises } from "@/components/CBTExercises";
import { EmergencySupport } from "@/components/EmergencySupport";
import { FamilyConnect } from "@/components/FamilyConnect";

const Index = () => {
  const [activeView, setActiveView] = useState<string>("home");

  const features = [
    {
      icon: MessageCircle,
      title: "AI Companion",
      description: "24/7 empathetic AI support trained for mental health assistance",
      color: "text-heal-600",
      bgColor: "bg-heal-50"
    },
    {
      icon: Brain,
      title: "CBT Tools",
      description: "Interactive cognitive behavioral therapy exercises and journaling",
      color: "text-calm-600",
      bgColor: "bg-calm-50"
    },
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "Smart symptom tracking with pattern recognition and insights",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      icon: Shield,
      title: "Emergency Support",
      description: "Crisis detection and immediate connection to professional help",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Users,
      title: "Family Connect",
      description: "Safe sharing and support network for loved ones",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Phone,
      title: "Voice Support",
      description: "Natural voice conversations with our AI companion",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Patient",
      content: "SentiHeal has been my constant companion. The AI understands my struggles and provides comfort when I need it most.",
      rating: 5
    },
    {
      name: "Dr. James Rodriguez",
      role: "Psychiatrist",
      content: "This platform bridges the gap between therapy sessions. My patients show remarkable improvement in self-awareness.",
      rating: 5
    },
    {
      name: "Maria K.",
      role: "Family Member",
      content: "Finally, a way to support my brother without feeling helpless. The family features give me peace of mind.",
      rating: 5
    }
  ];

  if (activeView !== "home") {
    return (
      <div className="min-h-screen gradient-bg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setActiveView("home")}
              className="text-heal-700 hover:text-heal-800"
            >
              ← Back to Home
            </Button>
            <div className="text-sm text-muted-foreground">
              Safe • Confidential • 24/7 Available
            </div>
          </div>
          
          {activeView === "chat" && <AIChat />}
          {activeView === "mood" && <MoodTracker />}
          {activeView === "cbt" && <CBTExercises />}
          {activeView === "emergency" && <EmergencySupport />}
          {activeView === "family" && <FamilyConnect />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-breathing inline-block mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-heal-500 to-calm-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-heal-600 to-calm-600 bg-clip-text text-transparent mb-6">
            SentiHeal
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
            Empathetic AI Companion for Mental Wellness
          </p>
          
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Revolutionary AI-driven support designed specifically for individuals with schizophrenia. 
            Get 24/7 compassionate assistance, evidence-based therapy tools, and connect with your support network.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-heal-600 to-calm-600 hover:from-heal-700 hover:to-calm-700 text-white px-8 py-3 text-lg"
              onClick={() => setActiveView("chat")}
            >
              Start Conversation
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-heal-300 text-heal-700 hover:bg-heal-50 px-8 py-3 text-lg"
              onClick={() => setActiveView("mood")}
            >
              Track Your Mood
            </Button>
          </div>
          
          <div className="text-sm text-gray-500 space-y-1">
            <p>✓ HIPAA Compliant • ✓ End-to-End Encrypted • ✓ Crisis Detection</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Comprehensive Mental Health Support
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides personalized, evidence-based support tailored to your unique needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 glass-effect"
              onClick={() => {
                const viewMap: Record<string, string> = {
                  "AI Companion": "chat",
                  "CBT Tools": "cbt",
                  "Mood Tracking": "mood",
                  "Emergency Support": "emergency",
                  "Family Connect": "family",
                  "Voice Support": "chat"
                };
                setActiveView(viewMap[feature.title] || "home");
              }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto ${feature.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trusted by Patients and Professionals
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from our community
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-effect border-0">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 border-t border-red-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-800 mb-2">
              Need Immediate Help?
            </h3>
            <p className="text-red-600 mb-4">
              If you're experiencing a mental health crisis, help is available 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setActiveView("emergency")}
              >
                Get Emergency Support
              </Button>
              <div className="text-sm text-red-600">
                <p>Crisis Hotline: 988 (US) • Emergency: 911</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              © 2024 SentiHeal. Designed for mental wellness and recovery.
            </p>
            <p className="text-sm">
              This platform is not a replacement for professional medical care. Always consult with healthcare providers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
