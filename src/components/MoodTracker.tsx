
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Moon, Pill, Activity, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoodEntry {
  id: string;
  date: Date;
  mood: number;
  anxiety: number;
  sleep: number;
  medication: boolean;
  symptoms: string[];
  notes: string;
  hallucinations: boolean;
  socialInteraction: number;
}

export const MoodTracker = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState<Partial<MoodEntry>>({
    mood: 5,
    anxiety: 5,
    sleep: 5,
    socialInteraction: 5,
    medication: true,
    symptoms: [],
    notes: "",
    hallucinations: false
  });
  
  const [entries, setEntries] = useState<MoodEntry[]>([
    {
      id: "1",
      date: new Date(Date.now() - 86400000),
      mood: 6,
      anxiety: 4,
      sleep: 7,
      medication: true,
      symptoms: ["mild anxiety"],
      notes: "Good day overall, felt more social",
      hallucinations: false,
      socialInteraction: 7
    },
    {
      id: "2", 
      date: new Date(Date.now() - 172800000),
      mood: 4,
      anxiety: 7,
      sleep: 3,
      medication: false,
      symptoms: ["hearing voices", "paranoia"],
      notes: "Difficult day, forgot medication",
      hallucinations: true,
      socialInteraction: 2
    }
  ]);

  const { toast } = useToast();

  const symptomOptions = [
    "hearing voices", "seeing things", "paranoia", "anxiety", "depression",
    "confusion", "difficulty concentrating", "social withdrawal", "insomnia",
    "fatigue", "irritability", "mood swings"
  ];

  const handleSymptomToggle = (symptom: string) => {
    const currentSymptoms = currentEntry.symptoms || [];
    const newSymptoms = currentSymptoms.includes(symptom)
      ? currentSymptoms.filter(s => s !== symptom)
      : [...currentSymptoms, symptom];
    
    setCurrentEntry({ ...currentEntry, symptoms: newSymptoms });
  };

  const handleSaveEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      mood: currentEntry.mood || 5,
      anxiety: currentEntry.anxiety || 5,
      sleep: currentEntry.sleep || 5,
      socialInteraction: currentEntry.socialInteraction || 5,
      medication: currentEntry.medication || false,
      symptoms: currentEntry.symptoms || [],
      notes: currentEntry.notes || "",
      hallucinations: currentEntry.hallucinations || false
    };

    setEntries(prev => [...prev.filter(e => e.date.toDateString() !== selectedDate.toDateString()), newEntry]);
    
    // Check for concerning patterns
    if (newEntry.mood <= 3 || newEntry.anxiety >= 8 || newEntry.hallucinations) {
      toast({
        title: "Concerning Pattern Detected",
        description: "Consider reaching out to your healthcare provider or using our emergency support.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Entry Saved",
        description: "Your mood data has been recorded successfully.",
      });
    }
  };

  const getEntryForDate = (date: Date) => {
    return entries.find(entry => entry.date.toDateString() === date.toDateString());
  };

  const getWeeklyAverage = () => {
    const lastWeek = entries.filter(entry => {
      const daysDiff = (new Date().getTime() - entry.date.getTime()) / (1000 * 3600 * 24);
      return daysDiff <= 7;
    });
    
    if (lastWeek.length === 0) return { mood: 0, anxiety: 0 };
    
    return {
      mood: lastWeek.reduce((sum, entry) => sum + entry.mood, 0) / lastWeek.length,
      anxiety: lastWeek.reduce((sum, entry) => sum + entry.anxiety, 0) / lastWeek.length
    };
  };

  const weeklyAvg = getWeeklyAverage();
  const todayEntry = getEntryForDate(selectedDate);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Mood Average</CardTitle>
            <Heart className="h-4 w-4 text-heal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heal-600">
              {weeklyAvg.mood.toFixed(1)}/10
            </div>
            <p className="text-xs text-muted-foreground">
              {weeklyAvg.mood >= 6 ? "Positive trend" : "Needs attention"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anxiety Level</CardTitle>
            <Brain className="h-4 w-4 text-calm-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-calm-600">
              {weeklyAvg.anxiety.toFixed(1)}/10
            </div>
            <p className="text-xs text-muted-foreground">
              {weeklyAvg.anxiety <= 4 ? "Well managed" : "Consider support"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medication Adherence</CardTitle>
            <Pill className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((entries.filter(e => e.medication).length / Math.max(entries.length, 1)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="track" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="track">Track Today</TabsTrigger>
          <TabsTrigger value="history">View History</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="track" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Daily Entry Form */}
            <Card>
              <CardHeader>
                <CardTitle>How are you feeling today?</CardTitle>
                <CardDescription>
                  Selected date: {selectedDate.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Overall Mood (1-10)</Label>
                    <div className="px-3 py-2">
                      <Slider
                        value={[currentEntry.mood || 5]}
                        onValueChange={(value) => setCurrentEntry({ ...currentEntry, mood: value[0] })}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Very Low</span>
                        <span className="font-medium">{currentEntry.mood}/10</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Anxiety Level (1-10)</Label>
                    <div className="px-3 py-2">
                      <Slider
                        value={[currentEntry.anxiety || 5]}
                        onValueChange={(value) => setCurrentEntry({ ...currentEntry, anxiety: value[0] })}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Calm</span>
                        <span className="font-medium">{currentEntry.anxiety}/10</span>
                        <span>Very Anxious</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Sleep Quality (1-10)</Label>
                    <div className="px-3 py-2">
                      <Slider
                        value={[currentEntry.sleep || 5]}
                        onValueChange={(value) => setCurrentEntry({ ...currentEntry, sleep: value[0] })}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Poor</span>
                        <span className="font-medium">{currentEntry.sleep}/10</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Social Interaction (1-10)</Label>
                    <div className="px-3 py-2">
                      <Slider
                        value={[currentEntry.socialInteraction || 5]}
                        onValueChange={(value) => setCurrentEntry({ ...currentEntry, socialInteraction: value[0] })}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Isolated</span>
                        <span className="font-medium">{currentEntry.socialInteraction}/10</span>
                        <span>Very Social</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="medication"
                      checked={currentEntry.medication}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, medication: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="medication">Took medication as prescribed</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hallucinations"
                      checked={currentEntry.hallucinations}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, hallucinations: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="hallucinations">Experienced hallucinations or delusions</Label>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Symptoms experienced today</Label>
                  <div className="flex flex-wrap gap-2">
                    {symptomOptions.map((symptom) => (
                      <Badge
                        key={symptom}
                        variant={currentEntry.symptoms?.includes(symptom) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          currentEntry.symptoms?.includes(symptom) 
                            ? "bg-heal-600 hover:bg-heal-700" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleSymptomToggle(symptom)}
                      >
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-medium">Additional notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="How was your day? Any specific events or feelings to note?"
                    value={currentEntry.notes}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <Button 
                  onClick={handleSaveEntry}
                  className="w-full bg-gradient-to-r from-heal-500 to-calm-500 hover:from-heal-600 hover:to-calm-600"
                >
                  Save Today's Entry
                </Button>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>
                  Choose a date to track or view existing entries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      const existingEntry = getEntryForDate(date);
                      if (existingEntry) {
                        setCurrentEntry(existingEntry);
                      } else {
                        setCurrentEntry({
                          mood: 5,
                          anxiety: 5,
                          sleep: 5,
                          socialInteraction: 5,
                          medication: true,
                          symptoms: [],
                          notes: "",
                          hallucinations: false
                        });
                      }
                    }
                  }}
                  className="rounded-md border p-3 pointer-events-auto"
                  modifiers={{
                    hasEntry: (date) => entries.some(entry => entry.date.toDateString() === date.toDateString()),
                    concerning: (date) => {
                      const entry = getEntryForDate(date);
                      return entry && (entry.mood <= 3 || entry.anxiety >= 8 || entry.hallucinations);
                    }
                  }}
                  modifiersStyles={{
                    hasEntry: { 
                      backgroundColor: "#ccfbef",
                      color: "#0d9488",
                      fontWeight: "bold"
                    },
                    concerning: {
                      backgroundColor: "#fecaca",
                      color: "#dc2626"
                    }
                  }}
                />
                
                <div className="mt-4 text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-heal-200 rounded"></div>
                    <span>Has entry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-200 rounded"></div>
                    <span>Concerning symptoms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
              <CardDescription>Your mood tracking history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entries.slice().reverse().map((entry) => (
                  <div key={entry.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{entry.date.toLocaleDateString()}</h4>
                      {(entry.mood <= 3 || entry.anxiety >= 8 || entry.hallucinations) && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Concerning
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Mood:</span>
                        <span className="ml-1 font-medium">{entry.mood}/10</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Anxiety:</span>
                        <span className="ml-1 font-medium">{entry.anxiety}/10</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sleep:</span>
                        <span className="ml-1 font-medium">{entry.sleep}/10</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Medication:</span>
                        <span className={`ml-1 font-medium ${entry.medication ? "text-green-600" : "text-red-600"}`}>
                          {entry.medication ? "✓" : "✗"}
                        </span>
                      </div>
                    </div>
                    
                    {entry.symptoms.length > 0 && (
                      <div className="mb-2">
                        <span className="text-sm text-muted-foreground">Symptoms: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {entry.symptoms.map((symptom, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {entry.notes && (
                      <p className="text-sm text-muted-foreground italic">
                        "{entry.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-heal-600" />
                  Pattern Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-heal-50 rounded-lg">
                  <h4 className="font-medium text-heal-800 mb-2">Medication Correlation</h4>
                  <p className="text-sm text-heal-700">
                    Your mood tends to be {
                      entries.filter(e => e.medication).reduce((sum, e) => sum + e.mood, 0) / 
                      Math.max(entries.filter(e => e.medication).length, 1) > 
                      entries.filter(e => !e.medication).reduce((sum, e) => sum + e.mood, 0) / 
                      Math.max(entries.filter(e => !e.medication).length, 1) 
                      ? "higher" : "lower"
                    } on days when you take your medication consistently.
                  </p>
                </div>
                
                <div className="p-4 bg-calm-50 rounded-lg">
                  <h4 className="font-medium text-calm-800 mb-2">Sleep Impact</h4>
                  <p className="text-sm text-calm-700">
                    Better sleep quality appears to correlate with improved mood and reduced anxiety levels.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-heal-500 bg-heal-50">
                    <h5 className="font-medium text-sm">Maintain Medication Schedule</h5>
                    <p className="text-xs text-muted-foreground">
                      Your data shows better outcomes on medication-consistent days
                    </p>
                  </div>
                  
                  <div className="p-3 border-l-4 border-calm-500 bg-calm-50">
                    <h5 className="font-medium text-sm">Focus on Sleep Hygiene</h5>
                    <p className="text-xs text-muted-foreground">
                      Consider establishing a regular bedtime routine
                    </p>
                  </div>
                  
                  <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                    <h5 className="font-medium text-sm">Increase Social Connection</h5>
                    <p className="text-xs text-muted-foreground">
                      Days with higher social interaction show improved mood
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
