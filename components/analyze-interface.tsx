"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Play,
  FileVideo,
  Brain,
  CheckCircle,
  AlertCircle,
  Loader2,
  TrendingUp,
  Clock,
  MessageSquare,
  Cloud,
} from "lucide-react";
import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

interface AnalysisResult {
  overall_score: number;
  confidence_score: number;
  strengths: string[];
  improvements: string[];
  detailed_metrics: {
    speech_clarity: number;
    vocal_variety: number;
    body_language: number;
    eye_contact: number;
    pacing: number;
    filler_words: number;
  };
  recommendations: string;
  transcript?: string;
  analysis_duration: string;
}

export default function AnalyzeInterface() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [firebaseUrl, setFirebaseUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("video/")) {
        setUploadedFile(file);
        setError(null);
      } else {
        setError("Please upload a video file");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("video/")) {
        setUploadedFile(file);
        setError(null);
      } else {
        setError("Please upload a video file");
      }
    }
  };

  const uploadToFirebase = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const timestamp = Date.now();
      const fileName = `videos/${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setFirebaseUrl(downloadURL);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setProgress(0);
    setUploadProgress(0);
    setError(null);
    setAnalysisResult(null);
    setCurrentStep("Uploading video to cloud storage...");

    try {
      // Step 1: Upload to Firebase
      const downloadURL = await uploadToFirebase(uploadedFile);

      setCurrentStep("Video uploaded! Starting analysis...");
      setProgress(25);

      // Step 2: Send URL to backend for processing
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoUrl: downloadURL,
          contextNotes: notes,
          fileName: uploadedFile.name,
        }),
      });

      setProgress(50);
      setCurrentStep("Extracting audio and analyzing speech...");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      setProgress(75);
      setCurrentStep("Generating detailed feedback...");

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setProgress(100);
      setCurrentStep("Analysis complete!");

      // Add artificial delay to show completion
      setTimeout(() => {
        setAnalysisResult(data);
        setCurrentStep("");
      }, 500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during analysis"
      );
      setCurrentStep("");
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
        setProgress(0);
        setUploadProgress(0);
      }, 1000);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 8) return "from-green-400 to-emerald-400";
    if (score >= 6) return "from-yellow-400 to-orange-400";
    return "from-red-400 to-pink-400";
  };

  return (
    <div className="pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            AI Speech Analyzer
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Upload your presentation video and get detailed AI-powered feedback
            on your speaking performance.
          </p>
          {/* Removed the Cloud-Optimized banner */}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Upload Your Presentation
              </h2>
              <p className="text-slate-400 text-lg">
                Upload your video to secure cloud storage for efficient AI
                analysis.
              </p>
            </div>

            {/* File Upload */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileVideo className="w-5 h-5 mr-2 text-blue-400" />
                  Video Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-blue-500 bg-blue-500/10"
                      : uploadedFile
                      ? "border-green-500 bg-green-500/10"
                      : "border-slate-700 hover:border-slate-600"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <div>
                        <p className="text-white font-medium">
                          {uploadedFile.name}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {formatFileSize(uploadedFile.size)}
                        </p>
                        {firebaseUrl && (
                          <div className="flex items-center justify-center mt-2 text-xs text-green-400">
                            <Cloud className="w-3 h-3 mr-1" />
                            Ready for cloud processing
                          </div>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setUploadedFile(null);
                          setFirebaseUrl(null);
                        }}
                        className="border-slate-700 text-slate-300 hover:text-white bg-transparent"
                      >
                        Remove File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-slate-500 mx-auto" />
                      <div>
                        <p className="text-white font-medium mb-2">
                          Drop your video here, or click to browse
                        </p>
                        <p className="text-slate-400 text-sm">
                          Supports MP4, MOV, AVI • Uploaded to secure cloud
                          storage
                        </p>
                      </div>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-400" />
                  Analysis Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any specific areas you'd like the AI to focus on (e.g., body language, vocal tone, pacing, eye contact, etc.)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={500}
                  className="min-h-32 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 resize-none"
                />
                <p className="text-slate-500 text-sm mt-2">
                  {notes.length}/500 characters
                </p>
              </CardContent>
            </Card>

            {/* Error Display */}
            {error && (
              <Card className="bg-red-900/20 border-red-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                    <p className="text-red-300">{error}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={!uploadedFile || isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Analysis
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Analysis Results
              </h2>
              <p className="text-slate-400 text-lg">
                Your AI-powered presentation analysis will appear here.
              </p>
            </div>

            {isAnalyzing && (
              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Processing Your Presentation
                      </h3>
                      <p className="text-slate-400">{currentStep}</p>
                    </div>
                    <div className="space-y-4">
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">
                              Upload Progress
                            </span>
                            <span className="text-blue-400">
                              {Math.round(uploadProgress)}%
                            </span>
                          </div>
                          <Progress value={uploadProgress} className="w-full" />
                        </div>
                      )}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">
                            Analysis Progress
                          </span>
                          <span className="text-green-400">
                            {Math.round(progress)}%
                          </span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {analysisResult && (
              <div className="space-y-6">
                {/* Overall Score */}
                <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                      Overall Performance Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div
                        className={`text-4xl font-bold bg-gradient-to-r ${getScoreGradient(
                          analysisResult.overall_score
                        )} bg-clip-text text-transparent`}
                      >
                        {analysisResult.overall_score}/10
                      </div>
                      <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {analysisResult.analysis_duration}
                        </div>
                        <div className="flex items-center">
                          <Cloud className="w-4 h-4 mr-1" />
                          Cloud Processed
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Metrics */}
                <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Detailed Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(analysisResult.detailed_metrics).map(
                      ([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 capitalize">
                              {key.replace("_", " ")}
                            </span>
                            <span
                              className={`font-semibold ${getScoreColor(
                                value
                              )}`}
                            >
                              {value}/10
                            </span>
                          </div>
                          <Progress value={value * 10} className="h-2" />
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>

                {/* Analysis Details */}
                <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Detailed Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Strengths
                      </h4>
                      <ul className="space-y-2 text-slate-300">
                        {analysisResult.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2 text-slate-300">
                        {analysisResult.improvements.map(
                          (improvement, index) => (
                            <li key={index} className="flex items-start">
                              <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                              {improvement}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Recommendations
                      </h4>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-slate-300 leading-relaxed">
                          {analysisResult.recommendations}
                        </p>
                      </div>
                    </div>

                    {analysisResult.transcript && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <MessageSquare className="w-5 h-5 mr-2" />
                          Transcript
                        </h4>
                        <div className="bg-slate-800/50 rounded-lg p-4 max-h-40 overflow-y-auto">
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {analysisResult.transcript}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {!isAnalyzing && !analysisResult && !error && (
              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="text-slate-500">
                    Upload a video and we'll process it using secure cloud
                    storage for optimal performance
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
