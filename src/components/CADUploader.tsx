interface CADUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function CADUploader({ onFileSelect }: CADUploaderProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-12 text-center hover:border-[#f97316] transition-colors"
    >
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
  );
}