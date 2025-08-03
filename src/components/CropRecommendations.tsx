import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Calendar, Droplets, Sun } from "lucide-react";

interface Crop {
  id: string;
  name: string;
  description: string;
  plantingWindow: string;
  harvestTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  waterNeeds: "Low" | "Medium" | "High";
  sunRequirement: "Full Sun" | "Partial Sun" | "Shade";
  soilType: string;
  tips: string[];
}

const springCrops: Crop[] = [
  {
    id: "lettuce",
    name: "Lettuce",
    description: "Fast-growing leafy green perfect for cool spring weather",
    plantingWindow: "March - May",
    harvestTime: "45-65 days",
    difficulty: "Easy",
    waterNeeds: "Medium",
    sunRequirement: "Partial Sun",
    soilType: "Well-draining, rich soil",
    tips: [
      "Plant every 2 weeks for continuous harvest",
      "Harvest outer leaves first",
      "Keep soil consistently moist"
    ]
  },
  {
    id: "radishes",
    name: "Radishes",
    description: "Quick-growing root vegetable ideal for beginners",
    plantingWindow: "March - May",
    harvestTime: "25-30 days",
    difficulty: "Easy",
    waterNeeds: "Medium",
    sunRequirement: "Full Sun",
    soilType: "Loose, well-draining soil",
    tips: [
      "Plant directly in garden",
      "Thin seedlings to 1 inch apart",
      "Harvest when roots are 1 inch diameter"
    ]
  },
  {
    id: "spinach",
    name: "Spinach",
    description: "Nutrient-rich leafy green that thrives in cool weather",
    plantingWindow: "March - April",
    harvestTime: "40-50 days",
    difficulty: "Easy",
    waterNeeds: "Medium",
    sunRequirement: "Partial Sun",
    soilType: "Rich, well-draining soil",
    tips: [
      "Plant in succession for extended harvest",
      "Harvest baby leaves for best flavor",
      "Protect from hot afternoon sun"
    ]
  },
  {
    id: "peas",
    name: "Peas",
    description: "Cool-season legume that enriches soil with nitrogen",
    plantingWindow: "March - April",
    harvestTime: "60-70 days",
    difficulty: "Medium",
    waterNeeds: "Medium",
    sunRequirement: "Full Sun",
    soilType: "Well-draining, slightly alkaline soil",
    tips: [
      "Plant as soon as soil can be worked",
      "Provide support for climbing varieties",
      "Harvest pods when plump but tender"
    ]
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-accent text-accent-foreground";
    case "Medium": return "bg-secondary text-secondary-foreground";
    case "Hard": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getWaterColor = (waterNeeds: string) => {
  switch (waterNeeds) {
    case "Low": return "text-secondary";
    case "Medium": return "text-primary";
    case "High": return "text-primary-muted";
    default: return "text-muted-foreground";
  }
};

export const CropRecommendations = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Spring Crop Recommendations</h2>
        <p className="text-muted-foreground">
          Perfect crops for spring planting based on your location and season
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {springCrops.map((crop) => (
          <Card key={crop.id} className="shadow-card hover:shadow-growth transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-growth rounded-lg">
                    <Sprout className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-primary">{crop.name}</CardTitle>
                    <CardDescription className="text-base">
                      {crop.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getDifficultyColor(crop.difficulty)}>
                  {crop.difficulty}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Planting</p>
                    <p className="font-medium">{crop.plantingWindow}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Harvest</p>
                    <p className="font-medium">{crop.harvestTime}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className={`h-4 w-4 ${getWaterColor(crop.waterNeeds)}`} />
                  <div>
                    <p className="text-sm text-muted-foreground">Water Needs</p>
                    <p className="font-medium">{crop.waterNeeds}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Sun</p>
                    <p className="font-medium text-sm">{crop.sunRequirement}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Soil Type</p>
                <p className="font-medium">{crop.soilType}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Growing Tips</p>
                <ul className="space-y-1">
                  {crop.tips.map((tip, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};