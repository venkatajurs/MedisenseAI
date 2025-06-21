import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

import { summarizeReport, AIReportSummary } from '../services/summarizeReport';
import { useHealth } from '../contexts/HealthContext';
import { MedicalReport, HealthParameter } from '../types/health';

// Set PDF worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface UploadReportProps {
  onBack: () => void;
  onUploadComplete: (report: { id: string; summary: AIReportSummary }) => void;
}

const UploadReport: React.FC<UploadReportProps> = ({ onBack, onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const { addReport } = useHealth();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast({ title: 'No file selected', description: 'Please choose a PDF to upload.' });
      return;
    }

    if (!apiKey) {
      toast({
        title: 'API Key Missing',
        description: 'Please set your OpenRouter API key in the Profile page.',
      });
      return;
    }

    try {
      setIsProcessing(true);
      setUploadProgress(15);

      const arrayBuffer = await file.arrayBuffer();
      const pdfText = await extractTextFromPDF(arrayBuffer);

      setUploadProgress(50);

      const summary = await summarizeReport(pdfText, apiKey);
      setUploadProgress(80);

      const typedParameters: HealthParameter[] = summary.parameters.map((param) => ({
        name: param.name,
        unit: param.unit,
        value: typeof param.value === 'string' ? parseFloat(param.value) : param.value,
        reference_range: '-',     // Placeholder
        status: 'normal',         // Default
        explanation: '',          // Optional enrichment
      }));

      const newReport: MedicalReport = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type: 'PDF Upload',
        status: 'completed',
        summary: summary.summary,
        risk_level: summary.risk_level,
        parameters: typedParameters,
        recommendations: summary.recommendations,
      };

      addReport(newReport);
      setUploadProgress(100);
      setIsProcessing(false);

      onUploadComplete({ id: newReport.id, summary });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: error.message || 'Something went wrong during processing.',
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Upload Medical Report</h2>

      <Input type="file" accept="application/pdf" onChange={handleFileSelect} />

      <div className="flex gap-4">
        <Button onClick={handleFileUpload} disabled={!file || isProcessing}>
          {isProcessing ? 'Analyzing...' : 'Upload'}
        </Button>
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
      </div>

      {isProcessing && <Progress value={uploadProgress} />}

      {/* Optional: "Back to Dashboard" */}
      {!isProcessing && (
        <div className="pt-4">
          <Button variant="ghost" onClick={onBack}>
            ← Back to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadReport;

// --- PDF Text Extraction ---
async function extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
    fullText += strings.join(' ') + '\n';
  }

  return fullText.trim();
}
