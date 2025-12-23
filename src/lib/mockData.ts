export interface CADData {
  file_metadata: {
    filename: string;
    format: string;
    created: string;
    author: string;
    software: string;
    file_size: string;
  };
  geometry: {
    volume: string;
    surface_area: string;
    bounding_box: {
      x: string;
      y: string;
      z: string;
    };
  };
  parts: Array<{
    name: string;
    material: string;
    count: number;
  }>;
  materials: Array<{
    name: string;
    properties: string[];
  }>;
}

export const mockCADData: Record<string, CADData> = {
  "cardiac-stent.step": {
    file_metadata: {
      filename: "cardiac-stent.step",
      format: "STEP AP214",
      created: "2024-11-15",
      author: "Sarah Chen",
      software: "SolidWorks 2024",
      file_size: "2.4 MB"
    },
    geometry: {
      volume: "245.3 mm³",
      surface_area: "892.1 mm²",
      bounding_box: {
        x: "2.5 mm",
        y: "2.5 mm",
        z: "15.0 mm"
      }
    },
    parts: [
      {
        name: "Stent Body",
        material: "316L Stainless Steel",
        count: 1
      },
      {
        name: "Strut",
        material: "316L Stainless Steel",
        count: 12
      },
      {
        name: "Connector Link",
        material: "316L Stainless Steel",
        count: 6
      }
    ],
    materials: [
      {
        name: "316L Stainless Steel",
        properties: ["Biocompatible", "Corrosion Resistant", "ISO 5832-1"]
      }
    ]
  },
  "hip-implant.stl": {
    file_metadata: {
      filename: "hip-implant.stl",
      format: "STL Binary",
      created: "2024-10-22",
      author: "Michael Torres",
      software: "Creo Parametric 9.0",
      file_size: "8.7 MB"
    },
    geometry: {
      volume: "18,432.5 mm³",
      surface_area: "4,256.8 mm²",
      bounding_box: {
        x: "52.0 mm",
        y: "48.5 mm",
        z: "125.0 mm"
      }
    },
    parts: [
      {
        name: "Femoral Stem",
        material: "Ti-6Al-4V Titanium Alloy",
        count: 1
      },
      {
        name: "Femoral Head",
        material: "Cobalt-Chrome Alloy",
        count: 1
      },
      {
        name: "Acetabular Cup",
        material: "UHMWPE",
        count: 1
      }
    ],
    materials: [
      {
        name: "Ti-6Al-4V Titanium Alloy",
        properties: ["ASTM F136", "High Strength", "Osseointegration"]
      },
      {
        name: "Cobalt-Chrome Alloy",
        properties: ["ASTM F75", "Wear Resistant", "Biocompatible"]
      },
      {
        name: "UHMWPE",
        properties: ["ISO 5834-2", "Low Friction", "Biocompatible"]
      }
    ]
  },
  "surgical-screw.iges": {
    file_metadata: {
      filename: "surgical-screw.iges",
      format: "IGES 5.3",
      created: "2024-12-01",
      author: "David Kim",
      software: "Fusion 360",
      file_size: "1.2 MB"
    },
    geometry: {
      volume: "156.8 mm³",
      surface_area: "485.3 mm²",
      bounding_box: {
        x: "4.5 mm",
        y: "4.5 mm",
        z: "25.0 mm"
      }
    },
    parts: [
      {
        name: "Screw Thread",
        material: "Titanium Grade 5",
        count: 1
      },
      {
        name: "Screw Head",
        material: "Titanium Grade 5",
        count: 1
      }
    ],
    materials: [
      {
        name: "Titanium Grade 5",
        properties: ["ASTM F136", "Biocompatible", "High Tensile Strength"]
      }
    ]
  }
};

export function getCADDataByFilename(filename: string): CADData | null {
  // Try exact match first
  if (mockCADData[filename]) {
    return mockCADData[filename];
  }

  // Try partial match based on keywords
  const lowerFilename = filename.toLowerCase();
  
  if (lowerFilename.includes("stent")) {
    return mockCADData["cardiac-stent.step"];
  }
  if (lowerFilename.includes("hip") || lowerFilename.includes("implant")) {
    return mockCADData["hip-implant.stl"];
  }
  if (lowerFilename.includes("screw") || lowerFilename.includes("surgical")) {
    return mockCADData["surgical-screw.iges"];
  }

  // Default to first entry if no match
  return mockCADData["cardiac-stent.step"];
}