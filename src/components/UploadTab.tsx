import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Star, 
  TrendingUp, 
  Target,
  CheckCircle,
  Clock,
  Award,
  Brain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

export const UploadTab = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    setProgress(0);

    // Simulate progress
    const progressSteps = [
      { value: 20, message: "Extracting text from PDF..." },
      { value: 40, message: "Parsing resume sections..." },
      { value: 60, message: "Analyzing with AI..." },
      { value: 80, message: "Generating insights..." },
      { value: 100, message: "Analysis complete!" }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(step.value);
      toast({
        title: step.message,
        description: `Progress: ${step.value}%`,
      });
    }

    // Mock analysis result
    const mockAnalysis: ResumeAnalysis = {
      id: Math.random().toString(36).substr(2, 9),
      filename: file.name,
      uploadedAt: new Date().toISOString(),
      extractedData: {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        coreSkills: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"],
        softSkills: ["Leadership", "Communication", "Problem-solving", "Team collaboration"],
        experience: [
          {
            company: "Tech Solutions Inc",
            position: "Senior Software Engineer",
            duration: "2021 - Present",
            description: "Led development of web applications using React and Node.js"
          },
          {
            company: "StartupCorp",
            position: "Full Stack Developer",
            duration: "2019 - 2021",
            description: "Built scalable backend systems and responsive frontend interfaces"
          }
        ],
        education: [
          {
            institution: "University of Technology",
            degree: "Bachelor of Computer Science",
            year: "2019"
          }
        ]
      },
      analysis: {
        resumeRating: 8.2,
        improvementAreas: "Consider adding more quantifiable achievements and metrics to demonstrate impact. Include relevant certifications and expand on leadership experiences.",
        upskillSuggestions: [
          {
            skill: "TypeScript",
            reason: "High demand in modern web development and improves code maintainability"
          },
          {
            skill: "Docker & Kubernetes",
            reason: "Essential for containerization and orchestration in DevOps practices"
          },
          {
            skill: "Machine Learning",
            reason: "Emerging field with growing opportunities in software development"
          }
        ]
      }
    };

    // Save to localStorage (simulating database)
    const existingAnalyses = JSON.parse(localStorage.getItem('resumeAnalyses') || '[]');
    existingAnalyses.push(mockAnalysis);
    localStorage.setItem('resumeAnalyses', JSON.stringify(existingAnalyses));

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    setProgress(0);
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.includes('pdf')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    await simulateAnalysis(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="glass border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 gradient-primary rounded-full p-4 w-fit animate-pulse">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Analyzing Your Resume</CardTitle>
            <CardDescription>
              Our AI is processing your resume and generating insights...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 animate-spin" />
              <span>This usually takes 30-60 seconds...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (analysis) {
    return (
      <div className="space-y-6">
        {/* Header with Rating */}
        <Card className="glass border-success/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="gradient-success rounded-full p-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Analysis Complete!</CardTitle>
                <CardDescription>Your resume has been thoroughly analyzed</CardDescription>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="h-8 w-8 text-warning" />
              <span className="text-4xl font-bold text-warning">
                {analysis.analysis.resumeRating}/10
              </span>
            </div>
          </CardHeader>
        </Card>

        {/* Personal Information */}
        <Card className="glass">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass">
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

          <Card className="glass">
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
        <Card className="glass border-warning/20">
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
        <Card className="glass border-primary/20">
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

        <div className="flex justify-center">
          <Button 
            onClick={() => setAnalysis(null)} 
            variant="outline"
            size="lg"
          >
            Analyze Another Resume
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="glass">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Upload Your Resume</CardTitle>
          <CardDescription>
            Drop your PDF resume here or click to browse. Get instant AI-powered analysis and insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/5 scale-105"
                : "border-border hover:border-primary/50 hover:bg-primary/5"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="mx-auto gradient-primary rounded-full p-4 w-fit animate-float">
                {isDragging ? (
                  <Upload className="h-8 w-8 text-white" />
                ) : (
                  <FileText className="h-8 w-8 text-white" />
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {isDragging ? "Drop your resume here" : "Drag & drop your resume"}
                </h3>
                <p className="text-muted-foreground">
                  Supports PDF files up to 10MB
                </p>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="gradient-primary hover:scale-105 transition-transform"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            </div>
          </div>

          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileSelect}
          />

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Your resume will be analyzed for:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <span>• Skills extraction</span>
              <span>• Experience review</span>
              <span>• Improvement suggestions</span>
              <span>• Rating & feedback</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};