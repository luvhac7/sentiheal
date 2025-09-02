
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, MessageCircle, AlertTriangle, Heart, Clock, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CrisisResource {
  id: string;
  name: string;
  phone: string;
  text?: string;
  description: string;
  availability: string;
  type: "hotline" | "text" | "chat" | "local";
}

interface SafetyPlan {
  triggers: string[];
  warnings: string[];
  copingStrategies: string[];
  supportContacts: string[];
  professionals: string[];
  environmentSafety: string[];
}

export const EmergencySupport = () => {
  const [isInCrisis, setIsInCrisis] = useState(false);
  const [safetyPlan, setSafetyPlan] = useState<SafetyPlan>({
    triggers: [],
    warnings: [],
    copingStrategies: [],
    supportContacts: [],
    professionals: [],
    environmentSafety: []
  });
  const [zipCode, setZipCode] = useState("");
  const { toast } = useToast();

  const crisisResources: CrisisResource[] = [
    {
      id: "988",
      name: "Suicide & Crisis Lifeline",
      phone: "988",
      text: "Text 'HELLO' to 741741",
      description: "24/7 support for people in emotional distress or suicidal crisis",
      availability: "24/7",
      type: "hotline"
    },
    {
      id: "crisis-text",
      name: "Crisis Text Line",
      phone: "",
      text: "Text HOME to 741741",
      description: "Free, 24/7 support for people in crisis via text message",
      availability: "24/7",
      type: "text"
    },
    {
      id: "nami",
      name: "NAMI Helpline",
      phone: "1-800-950-6264",
      description: "Information, support and referrals for mental health conditions",
      availability: "Mon-Fri 10am-10pm ET",
      type: "hotline"
    },
    {
      id: "samhsa",
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral service for substance abuse and mental health",
      availability: "24/7",
      type: "hotline"
    },
    {
      id: "emergency",
      name: "Emergency Services",
      phone: "911",
      description: "Immediate emergency medical and psychiatric services",
      availability: "24/7",
      type: "local"
    }
  ];

  const crisisSignsChecklist = [
    "Thoughts of hurting yourself or others",
    "Feeling hopeless or trapped",
    "Severe agitation or anxiety",
    "Increased substance use",
    "Dramatic mood changes",
    "Withdrawing from friends and family",
    "Giving away possessions",
    "Talking about death or dying",
    "Feeling like a burden to others",
    "Inability to perform daily activities"
  ];

  const immediateSteps = [
    {
      title: "Ensure Immediate Safety",
      description: "Remove any means of harm from your environment",
      icon: Shield
    },
    {
      title: "Reach Out for Help",
      description: "Call a crisis line or trusted person immediately",
      icon: Phone
    },
    {
      title: "Use Coping Strategies",
      description: "Apply grounding techniques and coping skills you've learned",
      icon: Heart
    },
    {
      title: "Go to Safe Place",
      description: "Be around supportive people or go to a safe location",
      icon: MapPin
    }
  ];

  const handleCrisisAssessment = () => {
    setIsInCrisis(true);
    toast({
      title: "Crisis Mode Activated",
      description: "You're now in crisis support mode. Help is available immediately.",
      variant: "destructive"
    });
  };

  const handleCallCrisis = (phone: string) => {
    // In a real app, this would initiate a call
    toast({
      title: `Calling ${phone}`,
      description: "In a real application, this would dial the crisis number.",
    });
  };

  const handleFindLocal = () => {
    if (!zipCode) {
      toast({
        title: "Zip Code Required",
        description: "Please enter your zip code to find local resources.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Finding Local Resources",
      description: `Searching for mental health services near ${zipCode}...`,
    });
  };

  if (isInCrisis) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Crisis Banner */}
        <Card className="border-red-500 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-6 h-6" />
              Crisis Support Mode
            </CardTitle>
            <CardDescription className="text-red-700">
              You've indicated you might be in crisis. Your safety is the top priority right now.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white w-full"
                onClick={() => handleCallCrisis("988")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 988 Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50 w-full"
                onClick={() => handleCallCrisis("911")}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Emergency 911
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Take These Steps Right Now</CardTitle>
            <CardDescription>
              Follow these immediate safety steps while help is on the way
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {immediateSteps.map((step, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-heal-100 rounded-full flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-heal-600" />
                    </div>
                    <h4 className="font-medium">{step.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Contact Options */}
        <Card>
          <CardHeader>
            <CardTitle>Get Help Immediately</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {crisisResources.slice(0, 3).map((resource) => (
                <div key={resource.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{resource.name}</h4>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    <p className="text-xs text-gray-500">{resource.availability}</p>
                  </div>
                  <div className="flex gap-2">
                    {resource.phone && (
                      <Button onClick={() => handleCallCrisis(resource.phone)}>
                        <Phone className="w-4 h-4 mr-2" />
                        {resource.phone}
                      </Button>
                    )}
                    {resource.text && (
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Text
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setIsInCrisis(false)}
            className="mt-4"
          >
            I'm Safe Now - Exit Crisis Mode
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Crisis Assessment */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="w-6 h-6" />
            Are You in Crisis Right Now?
          </CardTitle>
          <CardDescription className="text-orange-700">
            If you're having thoughts of hurting yourself or others, or feeling like you can't cope, immediate help is available.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={handleCrisisAssessment}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, I Need Help Now
            </Button>
            <Button variant="outline">
              No, I'm Planning Ahead
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Crisis Resources */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-heal-600" />
              24/7 Crisis Resources
            </CardTitle>
            <CardDescription>
              Professional help available anytime, day or night
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crisisResources.map((resource) => (
                <div key={resource.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{resource.name}</h4>
                    <Badge 
                      variant={resource.type === 'hotline' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {resource.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {resource.availability}
                    </div>
                    <div className="flex gap-2">
                      {resource.phone && (
                        <Button 
                          size="sm" 
                          onClick={() => handleCallCrisis(resource.phone)}
                          className="bg-heal-600 hover:bg-heal-700"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          {resource.phone}
                        </Button>
                      )}
                      {resource.text && (
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Text
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Local Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-calm-600" />
              Find Local Support
            </CardTitle>
            <CardDescription>
              Mental health services in your area
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <Button onClick={handleFindLocal} className="bg-calm-600 hover:bg-calm-700">
                Search
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Emergency Departments</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Hospital emergency rooms provide immediate psychiatric evaluation and care.
                </p>
                <Button variant="outline" size="sm">
                  Find Nearest Hospital
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Crisis Centers</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Local crisis intervention centers offer immediate support and referrals.
                </p>
                <Button variant="outline" size="sm">
                  Find Crisis Centers
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Mobile Crisis Teams</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Teams that can come to your location for crisis intervention.
                </p>
                <Button variant="outline" size="sm">
                  Find Mobile Teams
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warning Signs Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Recognize Crisis Warning Signs
          </CardTitle>
          <CardDescription>
            Learn to identify when you or someone else might need immediate help
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-3">Warning Signs of Crisis:</h4>
              <div className="space-y-2">
                {crisisSignsChecklist.map((sign, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{sign}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
                <h5 className="font-medium text-blue-800 mb-2">Remember:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Crisis feelings are temporary</li>
                  <li>• Help is always available</li>
                  <li>• You don't have to face this alone</li>
                  <li>• Professional support can make a difference</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 border-l-4 border-green-500">
                <h5 className="font-medium text-green-800 mb-2">If someone you know is in crisis:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Take it seriously</li>
                  <li>• Listen without judgment</li>
                  <li>• Help them get professional support</li>
                  <li>• Don't leave them alone</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Planning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-heal-600" />
            Create Your Safety Plan
          </CardTitle>
          <CardDescription>
            Prepare in advance for difficult times
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="font-medium text-sm mb-2 block">
                  My warning signs that crisis may be developing:
                </label>
                <Textarea 
                  placeholder="e.g., sleeping less, hearing more voices, feeling hopeless..."
                  className="h-20"
                />
              </div>
              
              <div>
                <label className="font-medium text-sm mb-2 block">
                  Coping strategies that help me:
                </label>
                <Textarea 
                  placeholder="e.g., listening to music, calling a friend, going for a walk..."
                  className="h-20"
                />
              </div>
              
              <div>
                <label className="font-medium text-sm mb-2 block">
                  People I can contact for support:
                </label>
                <Textarea 
                  placeholder="Name and phone number of trusted friends, family, or mentors..."
                  className="h-20"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="font-medium text-sm mb-2 block">
                  Professional contacts:
                </label>
                <Textarea 
                  placeholder="Therapist, psychiatrist, case manager contact information..."
                  className="h-20"
                />
              </div>
              
              <div>
                <label className="font-medium text-sm mb-2 block">
                  Making my environment safer:
                </label>
                <Textarea 
                  placeholder="Remove or secure items that could be used for self-harm..."
                  className="h-20"
                />
              </div>
              
              <Button className="w-full bg-gradient-to-r from-heal-500 to-calm-500 hover:from-heal-600 hover:to-calm-600">
                Save My Safety Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
