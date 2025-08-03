import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Sprout, Sun, Droplets } from "lucide-react";

interface PlantingTask {
  id: string;
  month: string;
  week: string;
  task: string;
  crop: string;
  type: "plant" | "care" | "harvest";
  priority: "high" | "medium" | "low";
  description: string;
  tips: string[];
}

const springTasks: PlantingTask[] = [
  {
    id: "1",
    month: "March",
    week: "Week 1-2",
    task: "Start cool-season crops indoors",
    crop: "Lettuce, Spinach, Kale",
    type: "plant",
    priority: "high",
    description: "Begin seeds indoors for early spring transplanting",
    tips: [
      "Use seed starting mix",
      "Keep soil moist but not waterlogged",
      "Provide 12-14 hours of light daily"
    ]
  },
  {
    id: "2",
    month: "March",
    week: "Week 3-4",
    task: "Direct sow cold-hardy crops",
    crop: "Peas, Radishes, Carrots",
    type: "plant",
    priority: "high",
    description: "Plant directly in garden when soil can be worked",
    tips: [
      "Wait until soil is no longer muddy",
      "Check soil temperature (45°F+)",
      "Plant in raised beds for better drainage"
    ]
  },
  {
    id: "3",
    month: "April",
    week: "Week 1-2",
    task: "Transplant seedlings",
    crop: "Lettuce, Spinach, Kale",
    type: "plant",
    priority: "medium",
    description: "Move indoor-started seedlings to garden",
    tips: [
      "Harden off seedlings for 7-10 days",
      "Plant on cloudy day or in evening",
      "Use row covers if frost threatens"
    ]
  },
  {
    id: "4",
    month: "April",
    week: "Week 3-4",
    task: "Start warm-season crops indoors",
    crop: "Tomatoes, Peppers, Herbs",
    type: "plant",
    priority: "medium",
    description: "Begin warm-season seeds indoors for later transplanting",
    tips: [
      "Use heat mats for better germination",
      "Maintain 70-75°F soil temperature",
      "Start 6-8 weeks before last frost"
    ]
  },
  {
    id: "5",
    month: "May",
    week: "Week 1-2",
    task: "Succession plant lettuce",
    crop: "Lettuce, Arugula",
    type: "plant",
    priority: "low",
    description: "Plant new lettuce every 2 weeks for continuous harvest",
    tips: [
      "Choose heat-tolerant varieties",
      "Plant in partial shade",
      "Keep soil consistently moist"
    ]
  },
  {
    id: "6",
    month: "May",
    week: "Week 3-4",
    task: "Begin harvesting",
    crop: "Radishes, Early Greens",
    type: "harvest",
    priority: "high",
    description: "Harvest first spring crops",
    tips: [
      "Harvest radishes when 1 inch diameter",
      "Cut lettuce leaves from outside first",
      "Harvest in morning for best quality"
    ]
  }
];

const getTaskIcon = (type: string) => {
  switch (type) {
    case "plant": return <Sprout className="h-4 w-4" />;
    case "care": return <Droplets className="h-4 w-4" />;
    case "harvest": return <Sun className="h-4 w-4" />;
    default: return <Calendar className="h-4 w-4" />;
  }
};

const getTaskColor = (type: string) => {
  switch (type) {
    case "plant": return "bg-accent text-accent-foreground";
    case "care": return "bg-primary text-primary-foreground";
    case "harvest": return "bg-gradient-harvest text-white";
    default: return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "border-l-destructive";
    case "medium": return "border-l-primary";
    case "low": return "border-l-accent";
    default: return "border-l-muted";
  }
};

export const PlantingCalendar = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Spring Planting Calendar</h2>
        <p className="text-muted-foreground">
          Your personalized planting schedule for optimal crop success
        </p>
      </div>

      <div className="space-y-4">
        {springTasks.map((task) => (
          <Card 
            key={task.id} 
            className={`shadow-card hover:shadow-earth transition-all duration-300 border-l-4 ${getPriorityColor(task.priority)}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{task.month}</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">{task.week}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTaskColor(task.type)}>
                    {getTaskIcon(task.type)}
                    <span className="ml-1 capitalize">{task.type}</span>
                  </Badge>
                </div>
              </div>
              
              <div>
                <CardTitle className="text-xl text-primary">{task.task}</CardTitle>
                <CardDescription className="text-base mt-1">
                  <span className="font-medium text-accent">{task.crop}</span> • {task.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Tips for Success
                  </h4>
                  <ul className="space-y-1">
                    {task.tips.map((tip, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-seasonal shadow-growth">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-primary">Calendar Reminder</h3>
            <p className="text-muted-foreground">
              These dates are general guidelines. Always check your local weather conditions 
              and soil temperature before planting. Consider using a soil thermometer for best results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};