import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Globe, Heart, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MoodTracker } from "./MoodTracker";
import { SafetyDisclaimer } from "./SafetyDisclaimer";
import { chatAI, Language, Intent } from "../lib/chatAI";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  intent?: Intent;
  isEmergency?: boolean;
}

interface ChatBotProps {
  className?: string;
}

export function ChatBot({ className }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm here to support your mental wellness journey. How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
      intent: "greeting"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState<Language>("english");
  const [isLoading, setIsLoading] = useState(false);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await chatAI(inputValue, language);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isBot: true,
        timestamp: new Date(),
        intent: response.intent,
        isEmergency: response.isEmergency
      };

      setMessages(prev => [...prev, botMessage]);

      if (response.isEmergency) {
        toast({
          title: "Emergency Support",
          description: "If you're in immediate danger, please contact emergency services.",
          variant: "destructive",
        });
      }

      if (response.intent === "mood_tracking") {
        setShowMoodTracker(true);
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Connection Error",
        description: "Sorry, I'm having trouble responding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleLanguage = () => {
    const newLang = language === "english" ? "tamil" : "english";
    setLanguage(newLang);
    toast({
      title: "Language Changed",
      description: `Switched to ${newLang === "english" ? "English" : "Tamil"}`,
    });
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <SafetyDisclaimer />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-primary rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Mental Wellness Bot</h2>
            <p className="text-white/80 text-sm">Safe support & guidance</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="text-white hover:bg-white/20"
        >
          <Globe className="w-4 h-4 mr-2" />
          {language === "english" ? "EN" : "TA"}
        </Button>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4 bg-gradient-chat" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <Card
                className={`max-w-xs sm:max-w-sm lg:max-w-md p-3 transition-smooth ${
                  message.isBot
                    ? message.isEmergency
                      ? "bg-emergency text-white shadow-soft"
                      : "bg-therapeutic text-white shadow-soft"
                    : "bg-card shadow-soft ml-auto"
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.isBot && (
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {message.isEmergency ? (
                        <AlertTriangle className="w-3 h-3 text-white" />
                      ) : (
                        <MessageSquare className="w-3 h-3 text-white" />
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className={`text-sm leading-relaxed ${
                      message.isBot && !message.isEmergency ? "text-white" : ""
                    }`}>
                      {message.text}
                    </p>
                    {message.intent && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {message.intent}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-therapeutic text-white p-3 shadow-soft">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2 mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMoodTracker(!showMoodTracker)}
            className="text-therapeutic border-therapeutic/30 hover:bg-therapeutic/5"
          >
            <Heart className="w-4 h-4 mr-2" />
            Track Mood
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              language === "english" 
                ? "Share what's on your mind..." 
                : "உங்கள் மனதில் என்ன இருக்கிறது என்று பகிர்ந்து கொள்ளுங்கள்..."
            }
            className="flex-1 border-therapeutic/30 focus:border-therapeutic focus:ring-therapeutic/20"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-therapeutic hover:shadow-glow transition-bounce"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mood Tracker Modal */}
      {showMoodTracker && (
        <MoodTracker 
          isOpen={showMoodTracker}
          onClose={() => setShowMoodTracker(false)}
          language={language}
        />
      )}
    </div>
  );
}