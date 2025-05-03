import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { STUDENT_STAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Function to get dynamic color class based on color name
const getColorClass = (color: string, type: 'bg' | 'text' | 'border' = 'bg') => {
  const opacity = type === 'bg' ? '100' : (type === 'text' ? '800' : '300');
  return `${type}-${color}-${opacity}`;
};

// Import common icons
import { 
  MessageCircle, 
  FileText, 
  Award, 
  CreditCard, 
  Plane, 
  BookOpen, 
  UserCheck 
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle />,
  FileText: <FileText />,
  Award: <Award />,
  CreditCard: <CreditCard />,
  Plane: <Plane />,
  BookOpen: <BookOpen />,
  UserCheck: <UserCheck />
};

// Lucide icon component
const LucideIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = iconMap[name];
  
  if (!Icon) {
    return <span className={className}>?</span>;
  }
  
  return <div className={className}>{Icon}</div>;
};

const StudentJourneyPipeline = () => {
  const { data: stageCounts = {} as Record<string, number>, isLoading } = useQuery<Record<string, number>>({
    queryKey: ['/api/stats/students/stage-counts'],
  });
  
  return (
    <Card className="shadow-sm mb-6">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Student Journey Pipeline</h2>
        
        <div className="flex flex-wrap justify-between gap-2">
          {isLoading ? (
            // Loading skeleton
            Array(7).fill(0).map((_, i) => (
              <div key={i} className="min-w-[80px] p-4 rounded-lg">
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))
          ) : (
            // Actual data
            STUDENT_STAGES.map(stage => (
              <div 
                key={stage.id} 
                className={cn(
                  "journey-stage p-4 rounded-lg text-center mb-2 transition-all hover:-translate-y-1",
                  getColorClass(stage.color, 'bg')
                )}
              >
                <div className={cn("text-2xl font-bold", getColorClass(stage.color, 'text'))}>
                  {stageCounts[stage.id] || 0}
                </div>
                <div className="text-sm font-medium text-gray-800 mt-1 flex items-center justify-center gap-1">
                  <LucideIcon name={stage.icon} className="h-3 w-3" />
                  <span>{stage.label}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentJourneyPipeline;