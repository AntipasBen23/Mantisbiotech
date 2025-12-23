export default function ParsingAnimation() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#1e3a8a]/20 border-t-[#1e3a8a] rounded-full animate-spin" />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Analyzing CAD File...
          </h3>
          <p className="text-sm text-gray-600">
            Extracting metadata and geometry data
          </p>
        </div>

        <div className="w-full max-w-md space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">Reading file format</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">Extracting metadata</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-[#f97316] animate-pulse" />
            <span className="text-sm text-gray-700">Analyzing geometry...</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            <span className="text-sm text-gray-400">Processing materials</span>
          </div>
        </div>
      </div>
    </div>
  );
}