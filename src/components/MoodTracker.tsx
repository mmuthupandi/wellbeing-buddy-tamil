import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Heart, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoodEntry {
  id: string;
  score: number;
  note: string;
  timestamp: Date;
}

interface MoodTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  language: "english" | "tamil";
}

const getMoodEmoji = (score: number): string => {
  if (score <= 2) return "😢";
  if (score <= 4) return "😞";
  if (score <= 6) return "😐";
  if (score <= 8) return "🙂";
  return "😊";
};

const getMoodLabel = (score: number, language: "english" | "tamil"): string => {
  const labels = {
    english: {
      0: "Very Low", 1: "Very Low", 2: "Low", 3: "Low", 4: "Below Average",
      5: "Average", 6: "Above Average", 7: "Good", 8: "Good", 9: "Very Good", 10: "Excellent"
    },
    tamil: {
      0: "மிக குறைவு", 1: "மிக குறைவு", 2: "குறைவு", 3: "குறைவு", 4: "சராசரிக்கு கீழ்",
      5: "சராசரி", 6: "சராசரிக்கு மேல்", 7: "நல்லது", 8: "நல்லது", 9: "மிக நல்லது", 10: "சிறந்தது"
    }
  };
  return labels[language][score as keyof typeof labels.english] || "Unknown";
};

export function MoodTracker({ isOpen, onClose, language }: MoodTrackerProps) {
  const [moodScore, setMoodScore] = useState([5]);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load mood history from localStorage
    const saved = localStorage.getItem("moodHistory");
    if (saved) {
      const parsed = JSON.parse(saved).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
      setMoodHistory(parsed);
    }
  }, []);

  const saveMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      score: moodScore[0],
      note: note.trim(),
      timestamp: new Date()
    };

    const updatedHistory = [newEntry, ...moodHistory].slice(0, 30); // Keep last 30 entries
    setMoodHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));

    toast({
      title: language === "english" ? "Mood Saved" : "மனநிலை சேமிக்கப்பட்டது",
      description: language === "english" 
        ? `Your mood (${moodScore[0]}/10) has been recorded.`
        : `உங்கள் மனநிலை (${moodScore[0]}/10) பதிவு செய்யப்பட்டது.`,
    });

    // Reset form
    setMoodScore([5]);
    setNote("");
  };

  const texts = {
    english: {
      title: "Mood Tracker",
      description: "Track your daily mood and thoughts to better understand your wellness patterns.",
      currentMood: "How are you feeling right now?",
      scale: "Rate from 0 (very low) to 10 (excellent)",
      note: "Add a note (optional)",
      notePlaceholder: "What contributed to this feeling?",
      save: "Save Mood",
      history: "Recent Mood History",
      noHistory: "No mood entries yet. Start tracking to see your patterns!",
      today: "Today",
      yesterday: "Yesterday",
      daysAgo: "days ago"
    },
    tamil: {
      title: "மனநிலை கண்காணிப்பு",
      description: "உங்கள் நாளாந்த மனநிலையையும் எண்ணங்களையும் கண்காணித்து உங்கள் நல்வாழ்வு முறைகளை நன்றாக புரிந்து கொள்ளுங்கள்.",
      currentMood: "இப்போது எப்படி உணர்கிறீர்கள்?",
      scale: "0 (மிக குறைவு) முதல் 10 (சிறந்தது) வரை மதிப்பிடுங்கள்",
      note: "குறிப்பு சேர்க்கவும் (விருப்பம்)",
      notePlaceholder: "இந்த உணர்விற்கு என்ன காரணம்?",
      save: "மனநிலையை சேமிக்கவும்",
      history: "சமீபத்திய மனநிலை வரலாறு",
      noHistory: "இன்னும் மனநிலை பதிவுகள் இல்லை. உங்கள் முறைகளைக் காண கண்காணிக்கத் தொடங்குங்கள்!",
      today: "இன்று",
      yesterday: "நேற்று",
      daysAgo: "நாட்களுக்கு முன்பு"
    }
  };

  const t = texts[language];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-therapeutic">
            <Heart className="w-5 h-5" />
            {t.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="border-therapeutic/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{t.currentMood}</CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">{t.scale}</Label>
                <div className="px-2">
                  <Slider
                    value={moodScore}
                    onValueChange={setMoodScore}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">0</span>
                    <div className="text-center">
                      <div className="text-2xl">{getMoodEmoji(moodScore[0])}</div>
                      <div className="text-lg font-semibold text-therapeutic">
                        {moodScore[0]}/10
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getMoodLabel(moodScore[0], language)}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood-note">{t.note}</Label>
                <Textarea
                  id="mood-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.notePlaceholder}
                  className="min-h-[80px] border-therapeutic/30 focus:border-therapeutic"
                />
              </div>

              <Button
                onClick={saveMoodEntry}
                className="w-full bg-gradient-therapeutic hover:shadow-glow transition-bounce"
              >
                <Heart className="w-4 h-4 mr-2" />
                {t.save}
              </Button>
            </CardContent>
          </Card>

          {/* Mood History */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4" />
                {t.history}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {moodHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {t.noHistory}
                </p>
              ) : (
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {moodHistory.slice(0, 5).map((entry) => {
                    const daysDiff = Math.floor(
                      (Date.now() - entry.timestamp.getTime()) / (1000 * 60 * 60 * 24)
                    );
                    let timeLabel = "";
                    if (daysDiff === 0) timeLabel = t.today;
                    else if (daysDiff === 1) timeLabel = t.yesterday;
                    else timeLabel = `${daysDiff} ${t.daysAgo}`;

                    return (
                      <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-chat">
                        <div className="text-lg">{getMoodEmoji(entry.score)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-therapeutic">
                              {entry.score}/10
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {timeLabel}
                            </span>
                          </div>
                          {entry.note && (
                            <p className="text-sm text-muted-foreground truncate">
                              {entry.note}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}