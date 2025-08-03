import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Thermometer, Cloud } from "lucide-react";

interface LocationData {
  city: string;
  state: string;
  zipCode: string;
  zone: string;
  lastFrost: string;
  firstFrost: string;
}

interface LocationFormProps {
  onLocationSubmit: (data: LocationData) => void;
}

const hardinessZones = [
  { value: "3a", label: "Zone 3a (-40°F to -35°F)" },
  { value: "3b", label: "Zone 3b (-35°F to -30°F)" },
  { value: "4a", label: "Zone 4a (-30°F to -25°F)" },
  { value: "4b", label: "Zone 4b (-25°F to -20°F)" },
  { value: "5a", label: "Zone 5a (-20°F to -15°F)" },
  { value: "5b", label: "Zone 5b (-15°F to -10°F)" },
  { value: "6a", label: "Zone 6a (-10°F to -5°F)" },
  { value: "6b", label: "Zone 6b (-5°F to 0°F)" },
  { value: "7a", label: "Zone 7a (0°F to 5°F)" },
  { value: "7b", label: "Zone 7b (5°F to 10°F)" },
  { value: "8a", label: "Zone 8a (10°F to 15°F)" },
  { value: "8b", label: "Zone 8b (15°F to 20°F)" },
  { value: "9a", label: "Zone 9a (20°F to 25°F)" },
  { value: "9b", label: "Zone 9b (25°F to 30°F)" },
  { value: "10a", label: "Zone 10a (30°F to 35°F)" },
  { value: "10b", label: "Zone 10b (35°F to 40°F)" }
];

export const LocationForm = ({ onLocationSubmit }: LocationFormProps) => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    zipCode: "",
    zone: "",
    lastFrost: "",
    firstFrost: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLocationSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-earth">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-gradient-earth rounded-lg">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl text-primary">Location & Climate Info</CardTitle>
        </div>
        <CardDescription className="text-lg">
          Tell us about your location to get personalized crop recommendations
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="e.g., Portland"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="e.g., Oregon"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                placeholder="e.g., 97201"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-primary" />
              Hardiness Zone
            </Label>
            <Select value={formData.zone} onValueChange={(value) => handleInputChange("zone", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your USDA Hardiness Zone" />
              </SelectTrigger>
              <SelectContent>
                {hardinessZones.map((zone) => (
                  <SelectItem key={zone.value} value={zone.value}>
                    {zone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-primary" />
                Last Frost Date
              </Label>
              <Input
                type="date"
                value={formData.lastFrost}
                onChange={(e) => handleInputChange("lastFrost", e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Average date of last spring frost in your area
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-primary" />
                First Frost Date
              </Label>
              <Input
                type="date"
                value={formData.firstFrost}
                onChange={(e) => handleInputChange("firstFrost", e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Average date of first fall frost in your area
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-growth text-white shadow-growth hover:opacity-90 transition-all duration-300"
            size="lg"
          >
            Get My Crop Recommendations
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};