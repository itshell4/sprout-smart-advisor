import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, AlertTriangle } from "lucide-react";

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: "sunny" | "cloudy" | "rainy" | "stormy";
    humidity: number;
    windSpeed: number;
    uvIndex: number;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: "sunny" | "cloudy" | "rainy" | "stormy";
    precipitationChance: number;
  }>;
  alerts: Array<{
    type: "frost" | "heat" | "rain" | "wind";
    message: string;
    severity: "low" | "medium" | "high";
  }>;
  gardenTips: string[];
}

// Mock weather data - in a real app, this would come from a weather API
const mockWeatherData: WeatherData = {
  location: "Portland, OR",
  current: {
    temperature: 65,
    condition: "cloudy",
    humidity: 70,
    windSpeed: 8,
    uvIndex: 4
  },
  forecast: [
    { day: "Today", high: 68, low: 45, condition: "cloudy", precipitationChance: 20 },
    { day: "Tomorrow", high: 72, low: 48, condition: "sunny", precipitationChance: 5 },
    { day: "Friday", high: 69, low: 52, condition: "rainy", precipitationChance: 80 },
    { day: "Saturday", high: 66, low: 49, condition: "cloudy", precipitationChance: 30 },
    { day: "Sunday", high: 71, low: 51, condition: "sunny", precipitationChance: 10 }
  ],
  alerts: [
    {
      type: "frost",
      message: "Possible light frost expected Sunday morning. Protect tender seedlings.",
      severity: "medium"
    }
  ],
  gardenTips: [
    "Perfect weather for transplanting cool-season crops",
    "Good time to water deeply before weekend rain",
    "Consider covering tender plants if frost is predicted"
  ]
};

const getWeatherIcon = (condition: string, size: string = "h-6 w-6") => {
  switch (condition) {
    case "sunny": return <Sun className={`${size} text-yellow-500`} />;
    case "cloudy": return <Cloud className={`${size} text-gray-500`} />;
    case "rainy": return <CloudRain className={`${size} text-blue-500`} />;
    case "stormy": return <CloudRain className={`${size} text-purple-500`} />;
    default: return <Cloud className={`${size} text-gray-500`} />;
  }
};

const getAlertColor = (severity: string) => {
  switch (severity) {
    case "high": return "bg-destructive text-destructive-foreground";
    case "medium": return "bg-primary text-primary-foreground";
    case "low": return "bg-accent text-accent-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export const WeatherWidget = () => {
  const { location, current, forecast, alerts, gardenTips } = mockWeatherData;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Weather & Garden Conditions</h2>
        <p className="text-muted-foreground">
          Current conditions and forecast for {location}
        </p>
      </div>

      {/* Current Weather */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getWeatherIcon(current.condition, "h-8 w-8")}
            <div>
              <div className="text-3xl font-bold text-primary">{current.temperature}°F</div>
              <div className="text-sm text-muted-foreground capitalize">{current.condition}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-medium">{current.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">Wind</p>
                <p className="font-medium">{current.windSpeed} mph</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">UV Index</p>
                <p className="font-medium">{current.uvIndex}/10</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Feels Like</p>
                <p className="font-medium">{current.temperature + 2}°F</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
          <CardDescription>Plan your garden activities ahead</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-muted/30">
                <p className="font-medium text-sm">{day.day}</p>
                <div className="flex justify-center my-2">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-primary">{day.high}°</p>
                  <p className="text-sm text-muted-foreground">{day.low}°</p>
                  <p className="text-xs text-blue-500">{day.precipitationChance}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <Card className="shadow-earth border-l-4 border-l-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Garden Weather Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Badge className={getAlertColor(alert.severity)}>
                    {alert.type.toUpperCase()}
                  </Badge>
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Garden Tips */}
      <Card className="bg-gradient-seasonal shadow-growth">
        <CardHeader>
          <CardTitle className="text-primary">Today's Garden Tips</CardTitle>
          <CardDescription>Based on current weather conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {gardenTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <span className="text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};