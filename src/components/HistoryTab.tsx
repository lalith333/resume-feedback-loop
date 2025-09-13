import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar, 
  FileText, 
  Star, 
  Eye, 
  Mail, 
  Phone, 
  User,
  TrendingUp,
  Target,
  Award,
  Brain
} from "lucide-react";
import { formatDistance } from "date-fns";

interface ResumeAnalysis {
  id: string;
  filename: string;
  uploadedAt: string;
  extractedData: {
    name: string;
    email: string;
    phone: string;
    coreSkills: string[];
    softSkills: string[];
    experience: Array<{
      company: string;
      position: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      year: string;
    }>;
  };
  analysis: {
    resumeRating: number;
    improvementAreas: string;
    upskillSuggestions: Array<{
      skill: string;
      reason: string;
    }>;
  };
}

export const HistoryTab = () => {
  const [analyses, setAnalyses] = useState<ResumeAnalysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<ResumeAnalysis | null>(null);

  useEffect(() => {
    // Load analyses from localStorage
    const savedAnalyses = JSON.parse(localStorage.getItem('resumeAnalyses') || '[]');
    setAnalyses(savedAnalyses);
  }, []);

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-success";
    if (rating >= 6) return "text-warning";
    return "text-destructive";
  };

  const getRatingBadgeVariant = (rating: number) => {
    if (rating >= 8) return "default";
    if (rating >= 6) return "secondary";
    return "destructive";
  };

  if (analyses.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="glass">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 rounded-full bg-muted p-4 w-fit">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">No Analysis History</CardTitle>
            <CardDescription>
              You haven't analyzed any resumes yet. Upload your first resume to get started!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Analysis History</h2>
        <p className="text-muted-foreground">
          View your past resume analyses and track your improvements
        </p>
      </div>

      <div className="grid gap-6">
        {analyses.map((analysis) => (
          <Card key={analysis.id} className="glass hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="gradient-primary rounded-lg p-2">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                        {analysis.filename}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDistance(new Date(analysis.uploadedAt), new Date(), { addSuffix: true })}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {analysis.extractedData.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-warning" />
                      <span className={`font-bold ${getRatingColor(analysis.analysis.resumeRating)}`}>
                        {analysis.analysis.resumeRating}/10
                      </span>
                      <Badge variant={getRatingBadgeVariant(analysis.analysis.resumeRating)}>
                        {analysis.analysis.resumeRating >= 8 ? "Excellent" : 
                         analysis.analysis.resumeRating >= 6 ? "Good" : "Needs Improvement"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {analysis.extractedData.coreSkills.length} skills found
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {analysis.extractedData.coreSkills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {analysis.extractedData.coreSkills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{analysis.extractedData.coreSkills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-4">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        Resume Analysis Details
                      </DialogTitle>
                      <DialogDescription>
                        Complete analysis for {analysis.filename}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-6">
                      {/* Rating */}
                      <Card className="border-success/20">
                        <CardHeader className="text-center pb-3">
                          <div className="flex items-center justify-center gap-2">
                            <Award className="h-6 w-6 text-warning" />
                            <span className="text-3xl font-bold text-warning">
                              {analysis.analysis.resumeRating}/10
                            </span>
                          </div>
                        </CardHeader>
                      </Card>

                      {/* Personal Info */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Personal Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{analysis.extractedData.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{analysis.extractedData.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{analysis.extractedData.phone}</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Skills */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Star className="h-5 w-5 text-primary" />
                              Technical Skills
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {analysis.extractedData.coreSkills.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <TrendingUp className="h-5 w-5 text-primary" />
                              Soft Skills
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {analysis.extractedData.softSkills.map((skill, index) => (
                                <Badge key={index} variant="outline">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Improvement Areas */}
                      <Card className="border-warning/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-warning" />
                            Areas for Improvement
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed">
                            {analysis.analysis.improvementAreas}
                          </p>
                        </CardContent>
                      </Card>

                      {/* Upskill Suggestions */}
                      <Card className="border-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Recommended Skills to Learn
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {analysis.analysis.upskillSuggestions.map((suggestion, index) => (
                            <div key={index} className="border border-border rounded-lg p-4">
                              <h4 className="font-semibold text-primary mb-2">{suggestion.skill}</h4>
                              <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {analyses.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          <p>Total analyses: {analyses.length}</p>
        </div>
      )}
    </div>
  );
};