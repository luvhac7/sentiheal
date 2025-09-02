
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, Send, Bot, User, Heart, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  mood?: "positive" | "neutral" | "concerning";
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI companion. I'm here to listen and support you. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
      mood: "positive"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Response Generation (simulated)
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis detection keywords
    const crisisKeywords = ["hurt myself", "suicide", "end it all", "kill myself", "die", "hopeless"];
    const hallucination = ["hearing voices", "seeing things", "voices telling me", "nobody believes me"];
    const anxiety = ["anxious", "panic", "scared", "worried", "fear"];
    const positive = ["better", "good", "happy", "hopeful", "improving"];

    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "I'm very concerned about what you're sharing. Your life has value, and you deserve support. Would you like me to connect you with a crisis counselor right now? You can also call 988 for immediate help. Please remember that this feeling can pass, and there are people who want to help you.";
    }

    if (hallucination.some(keyword => lowerMessage.includes(keyword))) {
      return "Thank you for sharing that with me. Experiences like hearing voices or seeing things can be very distressing. You're not alone in this, and it's important to know that these experiences, while real to you, can be symptoms that can be managed. Have you been able to speak with your doctor about these experiences? I'm here to support you through this.";
    }

    if (anxiety.some(keyword => lowerMessage.includes(keyword))) {
      return "I hear that you're feeling anxious right now. That must be really difficult. Let's try a grounding technique together: Can you name 5 things you can see around you right now? This can help bring you back to the present moment. Remember, anxiety is temporary and you have the strength to get through this.";
    }

    if (positive.some(keyword => lowerMessage.includes(keyword))) {
      return "I'm so glad to hear that you're feeling better! That's wonderful progress. It takes real strength to work through mental health challenges. What do you think has been helping you feel this way? Celebrating these positive moments is important for your recovery journey.";
    }

    // Default empathetic responses
    const responses = [
      "Thank you for sharing that with me. Your feelings are valid, and I'm here to listen. Can you tell me more about what's on your mind?",
      "I appreciate you opening up. It takes courage to talk about difficult feelings. How can I best support you right now?",
      "I'm here with you. Sometimes just having someone listen can make a difference. What would be most helpful for you in this moment?",
      "Your experience matters, and I want to understand better. Take your time - there's no pressure to share more than you're comfortable with.",
      "Thank you for trusting me with your thoughts. I'm here to support you, not to judge. How are you taking care of yourself today?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        mood: aiResponse.includes("concerned") ? "concerning" : "positive"
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Crisis detection alert
      if (aiResponse.includes("concerned")) {
        toast({
          title: "Crisis Support Available",
          description: "If you need immediate help, please call 988 or contact emergency services.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Feature",
        description: "Voice recognition would be enabled in production with proper permissions.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-[80vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-heal-50 to-calm-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-heal-500 to-calm-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Companion</h3>
              <p className="text-sm text-gray-600">Always here to listen and support</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-heal-500 to-calm-500 text-white"
                        : `bg-gray-100 text-gray-800 ${
                            message.mood === "concerning" 
                              ? "border-l-4 border-red-500" 
                              : ""
                          }`
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === "ai" && (
                        <div className="w-6 h-6 bg-gradient-to-r from-heal-500 to-calm-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          {message.mood === "concerning" ? (
                            <AlertTriangle className="w-3 h-3 text-white" />
                          ) : (
                            <Heart className="w-3 h-3 text-white" />
                          )}
                        </div>
                      )}
                      {message.sender === "user" && (
                        <User className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-heal-600" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceToggle}
                className={`${isListening ? "bg-red-100 text-red-600" : "bg-gray-100"}`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Share your thoughts... I'm here to listen"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-heal-500 to-calm-500 hover:from-heal-600 hover:to-calm-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Your conversations are private and secure. In crisis situations, we may suggest professional help.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
