import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadTab } from "./UploadTab";
import { HistoryTab } from "./HistoryTab";
import { Brain, FileText } from "lucide-react";

export const ResumeAnalyzer = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="gradient-primary rounded-full p-3 animate-glow">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Smart Resume Analyzer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and get AI-powered insights, ratings, and personalized improvement suggestions
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Analyze Resume
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Analysis History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <UploadTab />
          </TabsContent>
          
          <TabsContent value="history">
            <HistoryTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};