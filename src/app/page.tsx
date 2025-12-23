"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
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

        <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-12 text-center hover:border-[#f97316] transition-colors">
          <input
            type="file"
            accept=".step,.stp,.stl,.iges,.igs"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 bg-[#1e3a8a]/10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#1e3a8a]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Drop your CAD file here or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports STEP, STL, IGES formats
              </p>
            </div>
          </label>
        </div>

        {file && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#10b981]/10 rounded flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#10b981]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}