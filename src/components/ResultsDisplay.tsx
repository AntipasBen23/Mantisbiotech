import { CADData } from "@/lib/mockData";

interface ResultsDisplayProps {
  data: CADData;
}

export default function ResultsDisplay({ data }: ResultsDisplayProps) {
  return (
    <div className="space-y-6">
      {/* File Metadata Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-[#1e3a8a] mb-4">File Metadata</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Filename</p>
            <p className="font-medium text-gray-900">{data.file_metadata.filename}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Format</p>
            <p className="font-medium text-gray-900">{data.file_metadata.format}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="font-medium text-gray-900">{data.file_metadata.created}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Author</p>
            <p className="font-medium text-gray-900">{data.file_metadata.author}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Software</p>
            <p className="font-medium text-gray-900">{data.file_metadata.software}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">File Size</p>
            <p className="font-medium text-gray-900">{data.file_metadata.file_size}</p>
          </div>
        </div>
      </div>

      {/* Geometry Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-[#1e3a8a] mb-4">Geometry Analysis</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Volume</p>
            <p className="text-2xl font-bold text-[#1e3a8a]">{data.geometry.volume}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Surface Area</p>
            <p className="text-2xl font-bold text-[#1e3a8a]">{data.geometry.surface_area}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Bounding Box</p>
            <p className="text-sm font-medium text-gray-900">
              {data.geometry.bounding_box.x} × {data.geometry.bounding_box.y} × {data.geometry.bounding_box.z}
            </p>
          </div>
        </div>
      </div>

      {/* Parts Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-[#1e3a8a] mb-4">Part Hierarchy</h2>
        <div className="space-y-3">
          {data.parts.map((part, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#f97316]/10 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{part.name}</p>
                  <p className="text-sm text-gray-500">{part.material}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600">× {part.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Materials Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-[#1e3a8a] mb-4">Materials</h2>
        <div className="space-y-4">
          {data.materials.map((material, index) => (
            <div key={index}>
              <p className="font-medium text-gray-900 mb-2">{material.name}</p>
              <div className="flex flex-wrap gap-2">
                {material.properties.map((prop, i) => (
                  <span key={i} className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-sm rounded-full">
                    {prop}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 bg-[#1e3a8a] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1e3a8a]/90 transition-colors">
          Export as JSON
        </button>
        <button className="flex-1 bg-white text-[#1e3a8a] py-3 px-6 rounded-lg font-medium border-2 border-[#1e3a8a] hover:bg-[#1e3a8a]/5 transition-colors">
          Export as PDF
        </button>
      </div>
    </div>
  );
}