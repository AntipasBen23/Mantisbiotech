"use client";

import { useState, useEffect } from "react";
import CADUploader from "@/components/CADUploader";
import ParsingAnimation from "@/components/ParsingAnimation";
import ResultsDisplay from "@/components/ResultsDisplay";
import { getCADDataByFilename, CADData } from "@/lib/mockData";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [cadData, setCadData] = useState<CADData | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setIsParsing(true);
    setCadData(null);

    // Simulate parsing delay
    setTimeout(() => {
      const data = getCADDataByFilename(selectedFile.name);
      setCadData(data);
      setIsParsing(false);
    }, 3000);
  };

  const handleReset = () => {
    setFile(null);
    setIsParsing(false);
    setCadData(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">
            CAD File Import & Metadata Extractor
          </h1>
          <p className="text-gray-600">
            Upload STEP, STL, or IGES files to automatically extract metadata and geometry data
          </p>
        </div>

        {!file && <CADUploader onFileSelect={handleFileSelect} />}

        {file && !isParsing && !cadData && (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10b981]/10 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={handleReset} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {isParsing && (
          <div className="mt-6">
            <ParsingAnimation />
          </div>
        )}

        {cadData && !isParsing && (
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">Analysis complete</span>
              </div>
              <button
                onClick={handleReset}
                className="text-sm text-[#1e3a8a] hover:text-[#1e3a8a]/80 font-medium"
              >
                Upload another file
              </button>
            </div>
            <ResultsDisplay data={cadData} />
          </div>
        )}
      </div>
    </main>
  );
}