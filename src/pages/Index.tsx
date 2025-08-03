import { useState } from "react";
import { LocationForm } from "@/components/LocationForm";
import { CropRecommendations } from "@/components/CropRecommendations";
import { PlantingCalendar } from "@/components/PlantingCalendar";
import { WeatherWidget } from "@/components/WeatherWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Calendar, Cloud, MapPin } from "lucide-react";
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

  const handleLocationSubmit = (data: LocationData) => {
    setLocationData(data);
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
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <Sprout className="h-4 w-4" />
                  Crop Recommendations
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
                <CropRecommendations />
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
