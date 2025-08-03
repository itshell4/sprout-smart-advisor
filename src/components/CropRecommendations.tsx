import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, Calendar, Droplets, Sun, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { CropRecommendation } from "@/utils/cropAnalysis";

interface CropRecommendationsProps {
  recommendations: CropRecommendation[];
}

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 80) return "bg-primary text-primary-foreground";
  if (confidence >= 60) return "bg-accent text-accent-foreground";
  if (confidence >= 40) return "bg-secondary text-secondary-foreground";
  return "bg-destructive text-destructive-foreground";
};

const getNutrientStatusIcon = (status: "low" | "optimal" | "high") => {
  switch (status) {
    case "optimal": return <CheckCircle className="h-4 w-4 text-primary" />;
    case "low": return <TrendingUp className="h-4 w-4 text-yellow-500" />;
    case "high": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
  }
};

export const CropRecommendations = ({ recommendations }: CropRecommendationsProps) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center space-y-4">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
        <h2 className="text-2xl font-bold text-primary">No Recommendations Available</h2>
        <p className="text-muted-foreground">
          Please complete the soil analysis to get personalized crop recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">AI Crop Recommendations</h2>
        <p className="text-muted-foreground">
          Based on your soil analysis and current weather conditions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((recommendation, index) => (
          <Card key={recommendation.crop} className="shadow-card hover:shadow-growth transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-growth rounded-lg">
                    <Sprout className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-primary capitalize">
                      {recommendation.crop}
                      {index === 0 && (
                        <Badge className="ml-2 bg-primary text-primary-foreground">
                          Best Match
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-base">
                      AI Confidence: {recommendation.confidence}%
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getConfidenceColor(recommendation.confidence)}>
                  {recommendation.confidence}%
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Suitability Reasons */}
              <div>
                <h4 className="font-medium text-primary mb-2">Why This Crop Works:</h4>
                <ul className="space-y-1">
                  {recommendation.reasons.map((reason, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warnings */}
              {recommendation.warnings.length > 0 && (
                <div>
                  <h4 className="font-medium text-yellow-600 mb-2">Considerations:</h4>
                  <ul className="space-y-1">
                    {recommendation.warnings.map((warning, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* NPK Recommendations */}
              <div>
                <h4 className="font-medium text-primary mb-2">Nutrient Analysis:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(recommendation.npkRecommendations).map(([nutrient, data]) => (
                    <div key={nutrient} className="flex items-start gap-2 p-2 bg-muted/30 rounded">
                      {getNutrientStatusIcon(data.status)}
                      <div className="flex-1">
                        <p className="text-sm font-medium capitalize">{nutrient}</p>
                        <p className="text-xs text-muted-foreground">{data.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Planting Tips */}
              <div>
                <h4 className="font-medium text-primary mb-2">Customized Planting Tips:</h4>
                <ul className="space-y-1">
                  {recommendation.plantingTips.slice(0, 4).map((tip, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
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