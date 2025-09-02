
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Shield, Heart, MessageCircle, Share2, Eye, Settings, Plus, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  relationship: string;
  permissions: {
    viewMood: boolean;
    viewSymptoms: boolean;
    emergencyContact: boolean;
    viewProgress: boolean;
  };
  status: "pending" | "active" | "inactive";
}

interface SharedUpdate {
  id: string;
  type: "mood" | "symptom" | "progress" | "milestone";
  content: string;
  date: Date;
  sharedWith: string[];
}

export const FamilyConnect = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Mom (Sarah)",
      email: "sarah@email.com",
      relationship: "Mother",
      permissions: {
        viewMood: true,
        viewSymptoms: false,
        emergencyContact: true,
        viewProgress: true
      },
      status: "active"
    },
    {
      id: "2",
      name: "John (Brother)",
      email: "john@email.com",
      relationship: "Sibling",
      permissions: {
        viewMood: true,
        viewSymptoms: false,
        emergencyContact: false,
        viewProgress: true
      },
      status: "active"
    }
  ]);

  const [updates] = useState<SharedUpdate[]>([
    {
      id: "1",
      type: "mood",
      content: "Had a good day today - mood rating 7/10. Feeling more social.",
      date: new Date(Date.now() - 86400000),
      sharedWith: ["1", "2"]
    },
    {
      id: "2",
      type: "progress",
      content: "Completed 3 CBT exercises this week. Making good progress!",
      date: new Date(Date.now() - 172800000),
      sharedWith: ["1"]
    },
    {
      id: "3",
      type: "milestone",
      content: "30 days of consistent medication adherence!",
      date: new Date(Date.now() - 259200000),
      sharedWith: ["1", "2"]
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    relationship: ""
  });

  const [privacySettings, setPrivacySettings] = useState({
    autoShareMood: false,
    autoShareProgress: true,
    emergencySharing: true,
    weeklyReports: true
  });

  const { toast } = useToast();

  const handleInviteMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to send an invitation.",
        variant: "destructive"
      });
      return;
    }

    const member: FamilyMember = {
      id: Date.now().toString(),
      name: newMember.name,
      email: newMember.email,
      relationship: newMember.relationship,
      permissions: {
        viewMood: false,
        viewSymptoms: false,
        emergencyContact: false,
        viewProgress: false
      },
      status: "pending"
    };

    setFamilyMembers(prev => [...prev, member]);
    setNewMember({ name: "", email: "", relationship: "" });
    
    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${newMember.email}. They'll receive instructions to join your support network.`,
    });
  };

  const updatePermissions = (memberId: string, permission: string, value: boolean) => {
    setFamilyMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, permissions: { ...member.permissions, [permission]: value }}
        : member
    ));
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "mood": return Heart;
      case "symptom": return Eye;
      case "progress": return Users;
      case "milestone": return Badge;
      default: return MessageCircle;
    }
  };

  const getUpdateColor = (type: string) => {
    switch (type) {
      case "mood": return "text-heal-600 bg-heal-50";
      case "symptom": return "text-orange-600 bg-orange-50";
      case "progress": return "text-calm-600 bg-calm-50";
      case "milestone": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Network</CardTitle>
            <Users className="h-4 w-4 text-heal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heal-600">
              {familyMembers.filter(m => m.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Active connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Updates Shared</CardTitle>
            <Share2 className="h-4 w-4 text-calm-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-calm-600">{updates.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Privacy Level</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Controlled</div>
            <p className="text-xs text-muted-foreground">You choose what to share</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="network" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="network">My Network</TabsTrigger>
          <TabsTrigger value="sharing">Shared Updates</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
          <TabsTrigger value="resources">Family Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Family Members List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-heal-600" />
                  Support Network
                </CardTitle>
                <CardDescription>
                  Family and friends who are part of your support system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {familyMembers.map((member) => (
                    <div key={member.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.relationship}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                        <Badge 
                          variant={member.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {member.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Permissions:</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={member.permissions.viewMood}
                              onCheckedChange={(checked) => updatePermissions(member.id, 'viewMood', checked)}
                              size="sm"
                            />
                            <span>View mood</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={member.permissions.viewProgress}
                              onCheckedChange={(checked) => updatePermissions(member.id, 'viewProgress', checked)}
                              size="sm"
                            />
                            <span>View progress</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={member.permissions.viewSymptoms}
                              onCheckedChange={(checked) => updatePermissions(member.id, 'viewSymptoms', checked)}
                              size="sm"
                            />
                            <span>View symptoms</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={member.permissions.emergencyContact}
                              onCheckedChange={(checked) => updatePermissions(member.id, 'emergencyContact', checked)}
                              size="sm"
                            />
                            <span>Emergency contact</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add New Member */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-calm-600" />
                  Invite Family Member
                </CardTitle>
                <CardDescription>
                  Add someone to your support network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <Input
                    placeholder="e.g., Mom, Dad, Sister Sarah"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input
                    type="email"
                    placeholder="their-email@example.com"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Relationship</label>
                  <Input
                    placeholder="e.g., Mother, Father, Sibling, Friend"
                    value={newMember.relationship}
                    onChange={(e) => setNewMember({...newMember, relationship: e.target.value})}
                  />
                </div>
                
                <Button 
                  onClick={handleInviteMember}
                  className="w-full bg-gradient-to-r from-heal-500 to-calm-500 hover:from-heal-600 hover:to-calm-600"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
                
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> The person will receive an email invitation with instructions to join your support network. You can set their permissions after they accept.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sharing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Shared Updates</CardTitle>
              <CardDescription>
                Information you've shared with your support network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {updates.map((update) => {
                  const Icon = getUpdateIcon(update.type);
                  const colorClasses = getUpdateColor(update.type);
                  
                  return (
                    <div key={update.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className="text-xs">
                              {update.type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {update.date.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{update.content}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Shared with:</span>
                            <div className="flex gap-1">
                              {update.sharedWith.map((memberId) => {
                                const member = familyMembers.find(m => m.id === memberId);
                                return member ? (
                                  <Badge key={memberId} variant="secondary" className="text-xs">
                                    {member.name.split(' ')[0]}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share New Update</CardTitle>
              <CardDescription>
                Let your support network know how you're doing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share something positive about your day, a milestone you've reached, or how you're feeling..."
                className="h-24"
              />
              
              <div>
                <label className="text-sm font-medium mb-2 block">Share with:</label>
                <div className="flex flex-wrap gap-2">
                  {familyMembers.filter(m => m.status === 'active').map((member) => (
                    <Badge
                      key={member.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-heal-50"
                    >
                      {member.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button className="bg-gradient-to-r from-heal-500 to-calm-500 hover:from-heal-600 hover:to-calm-600">
                Share Update
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Privacy & Sharing Settings
              </CardTitle>
              <CardDescription>
                Control what information is automatically shared with your support network
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Auto-share mood ratings</h4>
                    <p className="text-sm text-gray-600">
                      Automatically share daily mood ratings with selected family members
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.autoShareMood}
                    onCheckedChange={(checked) => 
                      setPrivacySettings({...privacySettings, autoShareMood: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Share progress updates</h4>
                    <p className="text-sm text-gray-600">
                      Share when you complete CBT exercises or reach milestones
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.autoShareProgress}
                    onCheckedChange={(checked) => 
                      setPrivacySettings({...privacySettings, autoShareProgress: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Emergency sharing</h4>
                    <p className="text-sm text-gray-600">
                      Allow emergency contacts to be notified if crisis patterns are detected
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.emergencySharing}
                    onCheckedChange={(checked) => 
                      setPrivacySettings({...privacySettings, emergencySharing: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Weekly reports</h4>
                    <p className="text-sm text-gray-600">
                      Send summary reports to family members weekly
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.weeklyReports}
                    onCheckedChange={(checked) => 
                      setPrivacySettings({...privacySettings, weeklyReports: checked})
                    }
                  />
                </div>
              </div>

              <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                <h5 className="font-medium text-green-800 mb-2">Your Privacy is Protected</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• You control exactly what gets shared and with whom</li>
                  <li>• Family members only see what you give permission for</li>
                  <li>• All data is encrypted and HIPAA compliant</li>
                  <li>• You can revoke access at any time</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>For Family Members</CardTitle>
                <CardDescription>
                  Resources to help your loved ones support you better
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-heal-500 bg-heal-50">
                    <h5 className="font-medium text-heal-800">Understanding Schizophrenia</h5>
                    <p className="text-sm text-heal-700 mt-1">
                      Educational materials about symptoms, treatment, and recovery
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      View Resources
                    </Button>
                  </div>
                  
                  <div className="p-4 border-l-4 border-calm-500 bg-calm-50">
                    <h5 className="font-medium text-calm-800">How to Help</h5>
                    <p className="text-sm text-calm-700 mt-1">
                      Practical tips for providing effective support and encouragement
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Read Guide
                    </Button>
                  </div>
                  
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h5 className="font-medium text-purple-800">Crisis Response</h5>
                    <p className="text-sm text-purple-700 mt-1">
                      What to do if your loved one is experiencing a mental health crisis
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Emergency Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Groups</CardTitle>
                <CardDescription>
                  Connect with other families facing similar challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium">NAMI Family Support Groups</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Free support groups for family members and friends
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Find Local Groups
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium">Online Family Forums</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Connect with other families online for support and advice
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Join Forums
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium">Family Therapy</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Professional guidance for the whole family
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Find Therapists
                    </Button>
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
