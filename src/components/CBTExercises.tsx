
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Brain, BookOpen, Target, CheckCircle, Circle, Lightbulb, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ThoughtRecord {
  id: string;
  situation: string;
  thoughts: string;
  emotions: string;
  evidence: string;
  alternative: string;
  completed: boolean;
  date: Date;
}

interface GroundingExercise {
  id: string;
  title: string;
  description: string;
  steps: string[];
  duration: string;
  category: "anxiety" | "hallucinations" | "grounding";
}

export const CBTExercises = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [thoughtRecords, setThoughtRecords] = useState<ThoughtRecord[]>([]);
  const [currentThought, setCurrentThought] = useState<Partial<ThoughtRecord>>({});
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const { toast } = useToast();

  const exercises: GroundingExercise[] = [
    {
      id: "5-4-3-2-1",
      title: "5-4-3-2-1 Grounding Technique",
      description: "Use your senses to ground yourself in the present moment",
      category: "grounding",
      duration: "5 minutes",
      steps: [
        "Name 5 things you can see around you",
        "Name 4 things you can touch",
        "Name 3 things you can hear",
        "Name 2 things you can smell",
        "Name 1 thing you can taste"
      ]
    },
    {
      id: "reality-testing",
      title: "Reality Testing for Voices",
      description: "Techniques to evaluate and cope with auditory experiences",
      category: "hallucinations",
      duration: "10 minutes",
      steps: [
        "Ask yourself: 'Are others around me reacting to what I'm hearing?'",
        "Check if the voice is coming from a specific direction or everywhere",
        "Rate the clarity and volume compared to normal sounds",
        "Remind yourself: 'This is a symptom of my condition, not reality'",
        "Use a coping statement: 'I am safe, this will pass'",
        "Engage in a grounding activity like listening to music"
      ]
    },
    {
      id: "breathing",
      title: "4-7-8 Breathing Exercise",
      description: "Calming breathing technique for anxiety and stress",
      category: "anxiety",
      duration: "3 minutes",
      steps: [
        "Inhale quietly through your nose for 4 counts",
        "Hold your breath for 7 counts",
        "Exhale completely through your mouth for 8 counts",
        "This completes one cycle. Repeat 3-4 times",
        "Focus only on counting and breathing"
      ]
    },
    {
      id: "thought-stopping",
      title: "Thought Stopping Technique",
      description: "Interrupt negative or intrusive thought patterns",
      category: "anxiety",
      duration: "5 minutes",
      steps: [
        "When you notice an unwanted thought, say 'STOP' (aloud or mentally)",
        "Take a deep breath and pause",
        "Replace the thought with a prepared positive statement",
        "Engage in a physical activity (clap, snap, stand up)",
        "Redirect your attention to your immediate environment"
      ]
    },
    {
      id: "progressive-muscle",
      title: "Progressive Muscle Relaxation",
      description: "Systematic relaxation of muscle groups to reduce tension",
      category: "anxiety",
      duration: "15 minutes",
      steps: [
        "Start with your toes - tense for 5 seconds, then relax",
        "Move to your calves - tense and relax",
        "Continue with thighs, abdomen, hands, arms",
        "Work up to shoulders, neck, and face",
        "Notice the difference between tension and relaxation",
        "End with 3 deep breaths, feeling completely relaxed"
      ]
    },
    {
      id: "delusion-challenge",
      title: "Delusion Challenging Worksheet",
      description: "Examine and evaluate unusual beliefs or thoughts",
      category: "hallucinations",
      duration: "15 minutes",
      steps: [
        "Write down the belief or thought you're having",
        "Rate how strongly you believe it (1-10)",
        "List evidence that supports this belief",
        "List evidence that contradicts this belief",
        "Consider alternative explanations",
        "Re-rate your belief strength after this analysis"
      ]
    }
  ];

  const thoughtChallengingQuestions = [
    "What evidence supports this thought?",
    "What evidence contradicts this thought?",
    "How might a friend view this situation?",
    "What would I tell a friend in this situation?",
    "Am I assuming the worst will happen?",
    "Is this thought helping me right now?",
    "What are some other ways to look at this?"
  ];

  const handleCompleteExercise = (exerciseId: string) => {
    setCompletedExercises(prev => [...prev, exerciseId]);
    setActiveExercise(null);
    toast({
      title: "Exercise Completed!",
      description: "Great job working on your mental wellness. You're building valuable coping skills.",
    });
  };

  const handleSaveThoughtRecord = () => {
    if (currentThought.situation && currentThought.thoughts) {
      const newRecord: ThoughtRecord = {
        id: Date.now().toString(),
        situation: currentThought.situation || "",
        thoughts: currentThought.thoughts || "",
        emotions: currentThought.emotions || "",
        evidence: currentThought.evidence || "",
        alternative: currentThought.alternative || "",
        completed: true,
        date: new Date()
      };

      setThoughtRecords(prev => [...prev, newRecord]);
      setCurrentThought({});
      toast({
        title: "Thought Record Saved",
        description: "Your reflection has been recorded. This helps build awareness of thought patterns.",
      });
    }
  };

  const completionRate = (completedExercises.length / exercises.length) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-heal-600" />
            CBT Progress Overview
          </CardTitle>
          <CardDescription>
            Building mental wellness skills through evidence-based techniques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Exercises Completed</span>
                <span>{completedExercises.length}/{exercises.length}</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-heal-50 rounded-lg">
                <div className="text-2xl font-bold text-heal-600">{completedExercises.length}</div>
                <div className="text-sm text-heal-700">Exercises Done</div>
              </div>
              <div className="p-4 bg-calm-50 rounded-lg">
                <div className="text-2xl font-bold text-calm-600">{thoughtRecords.length}</div>
                <div className="text-sm text-calm-700">Thought Records</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(completionRate)}%
                </div>
                <div className="text-sm text-purple-700">Completion Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="exercises" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exercises">Guided Exercises</TabsTrigger>
          <TabsTrigger value="thought-records">Thought Records</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-4">
          {activeExercise ? (
            <Card>
              <CardHeader>
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveExercise(null)}
                  className="w-fit mb-4"
                >
                  ← Back to Exercises
                </Button>
                <CardTitle>
                  {exercises.find(e => e.id === activeExercise)?.title}
                </CardTitle>
                <CardDescription>
                  {exercises.find(e => e.id === activeExercise)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800 mb-2">
                      <Target className="w-5 h-5" />
                      <span className="font-medium">Duration: {exercises.find(e => e.id === activeExercise)?.duration}</span>
                    </div>
                    <p className="text-blue-700 text-sm">
                      Take your time with each step. There's no pressure to rush through this exercise.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-lg">Follow these steps:</h4>
                    {exercises.find(e => e.id === activeExercise)?.steps.map((step, index) => (
                      <div key={index} className="flex gap-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-heal-100 text-heal-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={() => handleCompleteExercise(activeExercise)}
                      className="bg-gradient-to-r from-heal-500 to-calm-500 hover:from-heal-600 hover:to-calm-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Completed
                    </Button>
                    <Button variant="outline" onClick={() => setActiveExercise(null)}>
                      Save for Later
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises.map((exercise) => (
                <Card 
                  key={exercise.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    completedExercises.includes(exercise.id) 
                      ? 'border-green-200 bg-green-50' 
                      : 'hover:border-heal-300'
                  }`}
                  onClick={() => setActiveExercise(exercise.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className={`p-2 rounded-full ${
                        exercise.category === 'grounding' ? 'bg-heal-100 text-heal-600' :
                        exercise.category === 'anxiety' ? 'bg-calm-100 text-calm-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {exercise.category === 'grounding' ? <Target className="w-5 h-5" /> :
                         exercise.category === 'anxiety' ? <Heart className="w-5 h-5" /> :
                         <Brain className="w-5 h-5" />}
                      </div>
                      {completedExercises.includes(exercise.id) && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {exercise.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {exercise.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {exercise.steps.length} steps
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="thought-records" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* New Thought Record Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-heal-600" />
                  New Thought Record
                </CardTitle>
                <CardDescription>
                  Challenge negative thoughts and develop balanced thinking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    What situation triggered these thoughts?
                  </label>
                  <Textarea
                    placeholder="Describe the situation that led to distressing thoughts..."
                    value={currentThought.situation || ""}
                    onChange={(e) => setCurrentThought({...currentThought, situation: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    What thoughts went through your mind?
                  </label>
                  <Textarea
                    placeholder="Write down the specific thoughts you had..."
                    value={currentThought.thoughts || ""}
                    onChange={(e) => setCurrentThought({...currentThought, thoughts: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    What emotions did you feel?
                  </label>
                  <Textarea
                    placeholder="Describe your emotional response..."
                    value={currentThought.emotions || ""}
                    onChange={(e) => setCurrentThought({...currentThought, emotions: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    What evidence supports or contradicts these thoughts?
                  </label>
                  <Textarea
                    placeholder="Look at the facts objectively..."
                    value={currentThought.evidence || ""}
                    onChange={(e) => setCurrentThought({...currentThought, evidence: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    What's a more balanced way to think about this?
                  </label>
                  <Textarea
                    placeholder="Develop a more realistic, balanced perspective..."
                    value={currentThought.alternative || ""}
                    onChange={(e) => setCurrentThought({...currentThought, alternative: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleSaveThoughtRecord}
                  disabled={!currentThought.situation || !currentThought.thoughts}
                  className="w-full bg-gradient-to-r from-heal-500 to-calm-500 hover:from-heal-600 hover:to-calm-600"
                >
                  Save Thought Record
                </Button>
              </CardContent>
            </Card>

            {/* Thought Challenging Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Thought Challenging Questions
                </CardTitle>
                <CardDescription>
                  Use these questions to examine your thoughts more objectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {thoughtChallengingQuestions.map((question, index) => (
                    <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                      <p className="text-sm text-yellow-800">{question}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Previous Thought Records */}
          {thoughtRecords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Previous Thought Records</CardTitle>
                <CardDescription>Review your progress in challenging thoughts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {thoughtRecords.slice().reverse().map((record) => (
                    <div key={record.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">Thought Record</h4>
                        <span className="text-xs text-muted-foreground">
                          {record.date.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Situation:</strong>
                          <p className="text-muted-foreground mt-1">{record.situation}</p>
                        </div>
                        <div>
                          <strong>Thoughts:</strong>
                          <p className="text-muted-foreground mt-1">{record.thoughts}</p>
                        </div>
                        {record.alternative && (
                          <div className="md:col-span-2">
                            <strong>Balanced Perspective:</strong>
                            <p className="text-green-700 mt-1">{record.alternative}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Understanding CBT</CardTitle>
                <CardDescription>Learn about cognitive behavioral therapy principles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-heal-500 bg-heal-50">
                    <h4 className="font-medium text-heal-800">Thought-Feeling Connection</h4>
                    <p className="text-sm text-heal-700 mt-1">
                      Our thoughts, feelings, and behaviors are all connected. Changing one can influence the others.
                    </p>
                  </div>
                  
                  <div className="p-4 border-l-4 border-calm-500 bg-calm-50">
                    <h4 className="font-medium text-calm-800">Automatic Thoughts</h4>
                    <p className="text-sm text-calm-700 mt-1">
                      We often have automatic thoughts that pop into our minds. CBT helps us notice and evaluate these.
                    </p>
                  </div>
                  
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-medium text-purple-800">Cognitive Distortions</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Common thinking patterns that can be unhelpful, like all-or-nothing thinking or catastrophizing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crisis Coping Strategies</CardTitle>
                <CardDescription>Quick techniques for difficult moments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                    <h5 className="font-medium text-red-800">If hearing voices:</h5>
                    <ul className="text-sm text-red-700 mt-1 space-y-1">
                      <li>• Use earphones with music or white noise</li>
                      <li>• Talk to someone you trust</li>
                      <li>• Focus on grounding techniques</li>
                      <li>• Remind yourself this is a symptom</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
                    <h5 className="font-medium text-orange-800">If feeling paranoid:</h5>
                    <ul className="text-sm text-orange-700 mt-1 space-y-1">
                      <li>• Look for concrete evidence</li>
                      <li>• Talk to a trusted person</li>
                      <li>• Use reality-testing questions</li>
                      <li>• Practice breathing exercises</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <h5 className="font-medium text-blue-800">Emergency contacts:</h5>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Crisis Text Line: Text HOME to 741741</li>
                      <li>• National Suicide Prevention: 988</li>
                      <li>• Emergency Services: 911</li>
                    </ul>
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
