import { SoilData } from "@/components/SoilAnalysisForm";

export interface WeatherConditions {
  temperature: number;
  humidity: number;
  rainfall: number;
  season: "spring" | "summer" | "fall" | "winter";
}

export interface CropRecommendation {
  crop: string;
  confidence: number;
  suitabilityScore: number;
  reasons: string[];
  warnings: string[];
  npkRecommendations: {
    nitrogen: { status: "low" | "optimal" | "high"; recommendation: string };
    phosphorus: { status: "low" | "optimal" | "high"; recommendation: string };
    potassium: { status: "low" | "optimal" | "high"; recommendation: string };
  };
  plantingTips: string[];
}

// Crop requirements database
const CROP_REQUIREMENTS = {
  tomatoes: {
    nitrogen: { min: 40, max: 80 },
    phosphorus: { min: 20, max: 40 },
    potassium: { min: 150, max: 300 },
    ph: { min: 6.0, max: 6.8 },
    temperature: { min: 60, max: 85 },
    humidity: { min: 50, max: 80 },
    soilTypes: ["loam", "sandy-loam"],
    drainage: ["good", "excellent"],
    season: ["spring", "summer"]
  },
  lettuce: {
    nitrogen: { min: 30, max: 60 },
    phosphorus: { min: 15, max: 30 },
    potassium: { min: 100, max: 200 },
    ph: { min: 6.0, max: 7.0 },
    temperature: { min: 45, max: 70 },
    humidity: { min: 60, max: 85 },
    soilTypes: ["loam", "clay-loam", "silt"],
    drainage: ["moderate", "good"],
    season: ["spring", "fall"]
  },
  carrots: {
    nitrogen: { min: 20, max: 40 },
    phosphorus: { min: 25, max: 50 },
    potassium: { min: 120, max: 250 },
    ph: { min: 6.0, max: 6.8 },
    temperature: { min: 55, max: 75 },
    humidity: { min: 50, max: 75 },
    soilTypes: ["sandy", "sandy-loam", "loam"],
    drainage: ["good", "excellent"],
    season: ["spring", "fall"]
  },
  spinach: {
    nitrogen: { min: 35, max: 70 },
    phosphorus: { min: 18, max: 35 },
    potassium: { min: 110, max: 220 },
    ph: { min: 6.0, max: 7.0 },
    temperature: { min: 35, max: 65 },
    humidity: { min: 60, max: 85 },
    soilTypes: ["loam", "clay-loam", "silt"],
    drainage: ["moderate", "good"],
    season: ["spring", "fall", "winter"]
  },
  radishes: {
    nitrogen: { min: 25, max: 50 },
    phosphorus: { min: 20, max: 40 },
    potassium: { min: 100, max: 180 },
    ph: { min: 5.8, max: 6.8 },
    temperature: { min: 45, max: 70 },
    humidity: { min: 50, max: 75 },
    soilTypes: ["sandy", "sandy-loam", "loam"],
    drainage: ["good", "excellent"],
    season: ["spring", "fall"]
  },
  peas: {
    nitrogen: { min: 15, max: 30 }, // Lower nitrogen as legumes fix their own
    phosphorus: { min: 25, max: 50 },
    potassium: { min: 130, max: 260 },
    ph: { min: 6.0, max: 7.0 },
    temperature: { min: 40, max: 70 },
    humidity: { min: 55, max: 75 },
    soilTypes: ["loam", "clay-loam", "sandy-loam"],
    drainage: ["moderate", "good"],
    season: ["spring", "fall"]
  }
};

export function analyzeCropSuitability(soilData: SoilData, weather: WeatherConditions): CropRecommendation[] {
  const recommendations: CropRecommendation[] = [];

  Object.entries(CROP_REQUIREMENTS).forEach(([cropName, requirements]) => {
    const suitabilityFactors = [];
    const reasons = [];
    const warnings = [];

    // Analyze NPK levels
    const nStatus = getNutrientStatus(soilData.nitrogen, requirements.nitrogen);
    const pStatus = getNutrientStatus(soilData.phosphorus, requirements.phosphorus);
    const kStatus = getNutrientStatus(soilData.potassium, requirements.potassium);

    // pH analysis
    const phInRange = soilData.ph >= requirements.ph.min && soilData.ph <= requirements.ph.max;
    if (phInRange) {
      suitabilityFactors.push(0.8);
      reasons.push(`Optimal pH range (${requirements.ph.min}-${requirements.ph.max})`);
    } else {
      suitabilityFactors.push(0.3);
      warnings.push(`pH ${soilData.ph} is outside optimal range (${requirements.ph.min}-${requirements.ph.max})`);
    }

    // Temperature analysis
    const tempInRange = weather.temperature >= requirements.temperature.min && 
                       weather.temperature <= requirements.temperature.max;
    if (tempInRange) {
      suitabilityFactors.push(0.9);
      reasons.push(`Good temperature range for growth`);
    } else {
      suitabilityFactors.push(0.4);
      warnings.push(`Temperature ${weather.temperature}°F may not be optimal`);
    }

    // Soil type compatibility
    const soilTypeMatch = requirements.soilTypes.includes(soilData.soilType);
    if (soilTypeMatch) {
      suitabilityFactors.push(0.7);
      reasons.push(`Excellent soil type match`);
    } else {
      suitabilityFactors.push(0.4);
      warnings.push(`${soilData.soilType} soil may not be ideal`);
    }

    // Drainage compatibility
    const drainageMatch = requirements.drainage.includes(soilData.drainage);
    if (drainageMatch) {
      suitabilityFactors.push(0.6);
      reasons.push(`Good drainage conditions`);
    } else {
      suitabilityFactors.push(0.3);
      warnings.push(`Drainage conditions may need improvement`);
    }

    // Season compatibility
    const seasonMatch = requirements.season.includes(weather.season);
    if (seasonMatch) {
      suitabilityFactors.push(0.8);
      reasons.push(`Perfect season for planting`);
    } else {
      suitabilityFactors.push(0.2);
      warnings.push(`Not the ideal season for this crop`);
    }

    // Calculate overall suitability score
    const suitabilityScore = suitabilityFactors.reduce((sum, factor) => sum + factor, 0) / suitabilityFactors.length;
    const confidence = Math.round(suitabilityScore * 100);

    // Generate NPK recommendations
    const npkRecommendations = {
      nitrogen: generateNutrientRecommendation("Nitrogen", soilData.nitrogen, requirements.nitrogen),
      phosphorus: generateNutrientRecommendation("Phosphorus", soilData.phosphorus, requirements.phosphorus),
      potassium: generateNutrientRecommendation("Potassium", soilData.potassium, requirements.potassium)
    };

    // Generate planting tips based on analysis
    const plantingTips = generatePlantingTips(cropName, soilData, weather, requirements);

    recommendations.push({
      crop: cropName,
      confidence,
      suitabilityScore,
      reasons,
      warnings,
      npkRecommendations,
      plantingTips
    });
  });

  // Sort by suitability score
  return recommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

function getNutrientStatus(actual: number, required: { min: number; max: number }): "low" | "optimal" | "high" {
  if (actual < required.min) return "low";
  if (actual > required.max) return "high";
  return "optimal";
}

function generateNutrientRecommendation(
  nutrient: string, 
  actual: number, 
  required: { min: number; max: number }
) {
  const status = getNutrientStatus(actual, required);
  
  let recommendation = "";
  
  switch (status) {
    case "low":
      recommendation = `Add ${nutrient.toLowerCase()} fertilizer. Current: ${actual}ppm, Target: ${required.min}-${required.max}ppm`;
      break;
    case "high":
      recommendation = `Reduce ${nutrient.toLowerCase()} input. Current: ${actual}ppm, Target: ${required.min}-${required.max}ppm`;
      break;
    case "optimal":
      recommendation = `${nutrient} levels are perfect for this crop`;
      break;
  }
  
  return { status, recommendation };
}

function generatePlantingTips(
  cropName: string, 
  soilData: SoilData, 
  weather: WeatherConditions,
  requirements: any
): string[] {
  const tips = [];
  
  // pH-based tips
  if (soilData.ph < requirements.ph.min) {
    tips.push("Add lime to raise soil pH before planting");
  } else if (soilData.ph > requirements.ph.max) {
    tips.push("Add sulfur or organic matter to lower soil pH");
  }
  
  // Temperature-based tips
  if (weather.temperature < requirements.temperature.min) {
    tips.push("Consider using row covers or cold frames for protection");
  } else if (weather.temperature > requirements.temperature.max) {
    tips.push("Provide shade during hottest parts of the day");
  }
  
  // Drainage-based tips
  if (soilData.drainage === "poor" && requirements.drainage.includes("good")) {
    tips.push("Improve drainage with raised beds or organic matter");
  }
  
  // Organic matter tips
  if (soilData.organicMatter < 3) {
    tips.push("Add compost to improve soil structure and fertility");
  }
  
  // Crop-specific tips
  switch (cropName) {
    case "tomatoes":
      tips.push("Stake or cage plants for support", "Water consistently to prevent blossom end rot");
      break;
    case "lettuce":
      tips.push("Plant in succession every 2 weeks", "Harvest outer leaves first");
      break;
    case "carrots":
      tips.push("Ensure soil is loose and rock-free", "Thin seedlings to prevent crowding");
      break;
    case "spinach":
      tips.push("Plant in partial shade during warm weather", "Harvest before bolting");
      break;
    case "radishes":
      tips.push("Harvest when roots are 1 inch diameter", "Plant every 10 days for continuous harvest");
      break;
    case "peas":
      tips.push("Provide support for climbing varieties", "Plant as soon as soil can be worked");
      break;
  }
  
  return tips;
}

export function getCurrentSeason(): "spring" | "summer" | "fall" | "winter" {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "fall";
  return "winter";
}