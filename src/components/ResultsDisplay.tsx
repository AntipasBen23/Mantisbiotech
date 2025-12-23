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
        <button 
          onClick={() => {
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${data.file_metadata.filename}-analysis.json`;
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="flex-1 bg-[#1e3a8a] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1e3a8a]/90 transition-colors"
        >
          Export as JSON
        </button>
        <button 
          onClick={() => {
            const printWindow = window.open('', '_blank');
            if (!printWindow) return;
            
            printWindow.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <title>CAD Analysis Report - ${data.file_metadata.filename}</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 40px; color: #1f2937; }
                  h1 { color: #1e3a8a; margin-bottom: 10px; }
                  h2 { color: #1e3a8a; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; }
                  .metadata-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
                  .metadata-item { padding: 10px; background: #f9fafb; border-radius: 5px; }
                  .metadata-label { font-size: 12px; color: #6b7280; margin-bottom: 5px; }
                  .metadata-value { font-weight: 600; }
                  .geometry-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
                  .geometry-box { text-align: center; padding: 20px; background: #f9fafb; border-radius: 8px; }
                  .geometry-value { font-size: 24px; font-weight: bold; color: #1e3a8a; }
                  .part-item { padding: 15px; margin: 10px 0; background: #f9fafb; border-radius: 8px; display: flex; justify-content: space-between; }
                  .material-section { margin: 15px 0; }
                  .material-name { font-weight: 600; margin-bottom: 10px; }
                  .property-tag { display: inline-block; padding: 5px 12px; margin: 5px 5px 5px 0; background: #d1fae5; color: #10b981; border-radius: 15px; font-size: 14px; }
                  @media print { body { padding: 20px; } }
                </style>
              </head>
              <body>
                <h1>CAD Analysis Report</h1>
                <p style="color: #6b7280; margin-bottom: 30px;">Generated on ${new Date().toLocaleDateString()}</p>
                
                <h2>File Metadata</h2>
                <div class="metadata-grid">
                  <div class="metadata-item">
                    <div class="metadata-label">Filename</div>
                    <div class="metadata-value">${data.file_metadata.filename}</div>
                  </div>
                  <div class="metadata-item">
                    <div class="metadata-label">Format</div>
                    <div class="metadata-value">${data.file_metadata.format}</div>
                  </div>
                  <div class="metadata-item">
                    <div class="metadata-label">Created</div>
                    <div class="metadata-value">${data.file_metadata.created}</div>
                  </div>
                  <div class="metadata-item">
                    <div class="metadata-label">Author</div>
                    <div class="metadata-value">${data.file_metadata.author}</div>
                  </div>
                  <div class="metadata-item">
                    <div class="metadata-label">Software</div>
                    <div class="metadata-value">${data.file_metadata.software}</div>
                  </div>
                  <div class="metadata-item">
                    <div class="metadata-label">File Size</div>
                    <div class="metadata-value">${data.file_metadata.file_size}</div>
                  </div>
                </div>

                <h2>Geometry Analysis</h2>
                <div class="geometry-grid">
                  <div class="geometry-box">
                    <div class="metadata-label">Volume</div>
                    <div class="geometry-value">${data.geometry.volume}</div>
                  </div>
                  <div class="geometry-box">
                    <div class="metadata-label">Surface Area</div>
                    <div class="geometry-value">${data.geometry.surface_area}</div>
                  </div>
                  <div class="geometry-box">
                    <div class="metadata-label">Bounding Box</div>
                    <div style="font-size: 14px; font-weight: 600; margin-top: 5px;">
                      ${data.geometry.bounding_box.x} × ${data.geometry.bounding_box.y} × ${data.geometry.bounding_box.z}
                    </div>
                  </div>
                </div>

                <h2>Part Hierarchy</h2>
                ${data.parts.map(part => `
                  <div class="part-item">
                    <div>
                      <div style="font-weight: 600;">${part.name}</div>
                      <div style="color: #6b7280; font-size: 14px;">${part.material}</div>
                    </div>
                    <div style="font-weight: 600;">× ${part.count}</div>
                  </div>
                `).join('')}

                <h2>Materials</h2>
                ${data.materials.map(material => `
                  <div class="material-section">
                    <div class="material-name">${material.name}</div>
                    <div>
                      ${material.properties.map(prop => `<span class="property-tag">${prop}</span>`).join('')}
                    </div>
                  </div>
                `).join('')}
              </body>
              </html>
            `);
            
            printWindow.document.close();
            setTimeout(() => {
              printWindow.print();
            }, 250);
          }}
          className="flex-1 bg-white text-[#1e3a8a] py-3 px-6 rounded-lg font-medium border-2 border-[#1e3a8a] hover:bg-[#1e3a8a]/5 transition-colors"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}