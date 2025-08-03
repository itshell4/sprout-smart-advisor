import { useState } from "react";
import { LocationForm } from "@/components/LocationForm";
import { CropRecommendations } from "@/components/CropRecommendations";
import { SoilAnalysisForm, SoilData } from "@/components/SoilAnalysisForm";
import { PlantingCalendar } from "@/components/PlantingCalendar";
import { WeatherWidget } from "@/components/WeatherWidget";
import { analyzeCropSuitability, getCurrentSeason, CropRecommendation, WeatherConditions } from "@/utils/cropAnalysis";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Calendar, Cloud, MapPin, TestTube } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

interface LocationData {
  city: string;
  state: string;
  zipCode: string;
  zone: string;
  lastFrost: string;
  firstFrost: string;
}

const Index = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [cropRecommendations, setCropRecommendations] = useState<CropRecommendation[]>([]);

  const handleLocationSubmit = (data: LocationData) => {
    setLocationData(data);
  };

  const handleSoilDataSubmit = (data: SoilData) => {
    setSoilData(data);
    
    // Mock weather data - in a real app, this would come from a weather API
    const mockWeather: WeatherConditions = {
      temperature: 65,
      humidity: 70,
      rainfall: 25,
      season: getCurrentSeason()
    };
    
    const recommendations = analyzeCropSuitability(data, mockWeather);
    setCropRecommendations(recommendations);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Agricultural fields at sunrise" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-5xl font-bold">AI Seasonal Crop Advisor</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Get personalized crop recommendations, planting schedules, and care routines 
              tailored to your location and growing conditions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {!locationData ? (
          <LocationForm onLocationSubmit={handleLocationSubmit} />
        ) : !soilData ? (
          <>
            {/* Location Summary */}
            <Card className="shadow-earth bg-gradient-earth">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin className="h-6 w-6" />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {locationData.city}, {locationData.state}
                    </h2>
                    <p className="text-muted-foreground">
                      Zone {locationData.zone} • Last Frost: {new Date(locationData.lastFrost).toLocaleDateString()} 
                      • First Frost: {new Date(locationData.firstFrost).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <SoilAnalysisForm onSoilDataSubmit={handleSoilDataSubmit} />
          </>
        ) : (
          <>
            {/* Location Summary */}
            <Card className="shadow-earth bg-gradient-earth">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin className="h-6 w-6" />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {locationData.city}, {locationData.state}
                    </h2>
                    <p className="text-muted-foreground">
                      Zone {locationData.zone} • Last Frost: {new Date(locationData.lastFrost).toLocaleDateString()} 
                      • First Frost: {new Date(locationData.firstFrost).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Tabs */}
            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <Sprout className="h-4 w-4" />
                  AI Recommendations
                </TabsTrigger>
                <TabsTrigger value="soil" className="flex items-center gap-2">
                  <TestTube className="h-4 w-4" />
                  Soil Analysis
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Planting Calendar
                </TabsTrigger>
                <TabsTrigger value="weather" className="flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  Weather & Conditions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations">
                <CropRecommendations recommendations={cropRecommendations} />
              </TabsContent>
              
              <TabsContent value="soil">
                <div className="space-y-6">
                  <Card className="shadow-earth bg-gradient-earth">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Nitrogen</p>
                          <p className="text-2xl font-bold text-primary">{soilData.nitrogen}</p>
                          <p className="text-xs">ppm</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phosphorus</p>
                          <p className="text-2xl font-bold text-primary">{soilData.phosphorus}</p>
                          <p className="text-xs">ppm</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Potassium</p>
                          <p className="text-2xl font-bold text-primary">{soilData.potassium}</p>
                          <p className="text-xs">ppm</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">pH</p>
                          <p className="text-2xl font-bold text-primary">{soilData.ph}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Organic Matter</p>
                          <p className="text-2xl font-bold text-primary">{soilData.organicMatter}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Soil Type</p>
                          <p className="font-medium text-primary capitalize">{soilData.soilType.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <SoilAnalysisForm onSoilDataSubmit={handleSoilDataSubmit} />
                </div>
              </TabsContent>

              <TabsContent value="calendar">
                <PlantingCalendar />
              </TabsContent>

              <TabsContent value="weather">
                <WeatherWidget />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
