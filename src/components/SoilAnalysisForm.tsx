import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestTube, Beaker, Droplets } from "lucide-react";

export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  organicMatter: number;
  soilType: string;
  drainage: string;
}

interface SoilAnalysisFormProps {
  onSoilDataSubmit: (data: SoilData) => void;
}

const soilTypes = [
  { value: "clay", label: "Clay" },
  { value: "sandy", label: "Sandy" },
  { value: "loam", label: "Loam" },
  { value: "silt", label: "Silt" },
  { value: "sandy-loam", label: "Sandy Loam" },
  { value: "clay-loam", label: "Clay Loam" }
];

const drainageOptions = [
  { value: "poor", label: "Poor (Water stands for hours)" },
  { value: "moderate", label: "Moderate (Water drains in 2-4 hours)" },
  { value: "good", label: "Good (Water drains in 30-60 minutes)" },
  { value: "excellent", label: "Excellent (Water drains in 10-30 minutes)" }
];

export const SoilAnalysisForm = ({ onSoilDataSubmit }: SoilAnalysisFormProps) => {
  const [soilData, setSoilData] = useState<SoilData>({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    ph: 6.5,
    organicMatter: 0,
    soilType: "",
    drainage: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSoilDataSubmit(soilData);
  };

  const handleInputChange = (field: keyof SoilData, value: string | number) => {
    setSoilData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-earth">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-gradient-earth rounded-lg">
            <TestTube className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl text-primary">Soil Analysis</CardTitle>
        </div>
        <CardDescription className="text-lg">
          Enter your soil test results for personalized crop recommendations
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NPK Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Beaker className="h-4 w-4 text-primary" />
                Nitrogen (N) - ppm
              </Label>
              <Input
                type="number"
                placeholder="0-300"
                value={soilData.nitrogen || ''}
                onChange={(e) => handleInputChange("nitrogen", Number(e.target.value))}
                required
              />
              <p className="text-xs text-muted-foreground">
                Low: 0-25, Medium: 25-50, High: 50+
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Beaker className="h-4 w-4 text-primary" />
                Phosphorus (P) - ppm
              </Label>
              <Input
                type="number"
                placeholder="0-100"
                value={soilData.phosphorus || ''}
                onChange={(e) => handleInputChange("phosphorus", Number(e.target.value))}
                required
              />
              <p className="text-xs text-muted-foreground">
                Low: 0-15, Medium: 15-30, High: 30+
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Beaker className="h-4 w-4 text-primary" />
                Potassium (K) - ppm
              </Label>
              <Input
                type="number"
                placeholder="0-400"
                value={soilData.potassium || ''}
                onChange={(e) => handleInputChange("potassium", Number(e.target.value))}
                required
              />
              <p className="text-xs text-muted-foreground">
                Low: 0-100, Medium: 100-200, High: 200+
              </p>
            </div>
          </div>

          {/* pH and Organic Matter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>pH Level</Label>
              <Input
                type="number"
                step="0.1"
                min="3"
                max="9"
                placeholder="6.5"
                value={soilData.ph || ''}
                onChange={(e) => handleInputChange("ph", Number(e.target.value))}
                required
              />
              <p className="text-xs text-muted-foreground">
                Acidic: 3-6, Neutral: 6-7, Alkaline: 7-9
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Organic Matter (%)</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="2.5"
                value={soilData.organicMatter || ''}
                onChange={(e) => handleInputChange("organicMatter", Number(e.target.value))}
                required
              />
              <p className="text-xs text-muted-foreground">
                Low: 0-2%, Medium: 2-4%, High: 4%+
              </p>
            </div>
          </div>

          {/* Soil Type and Drainage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Soil Type</Label>
              <Select value={soilData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                Drainage
              </Label>
              <Select value={soilData.drainage} onValueChange={(value) => handleInputChange("drainage", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select drainage level" />
                </SelectTrigger>
                <SelectContent>
                  {drainageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-growth text-white shadow-growth hover:opacity-90 transition-all duration-300"
            size="lg"
          >
            Analyze Soil & Get Recommendations
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};