import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewAgentsCardProps {
  count: number;
  trend: number;
  period?: string;
}

const NewAgentsCard = ({
  count = 42,
  trend = -3.1,
  period = "since last month"
}: NewAgentsCardProps) => {
  const isTrendUp = trend >= 0;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500 mb-1">New Agents</span>
          <span className="text-3xl font-bold">{count}</span>
          <div className="flex items-center mt-1">
            <div className={cn(
              "flex items-center text-xs",
              isTrendUp ? "text-green-600" : "text-red-600"
            )}>
              {isTrendUp ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(trend)}%</span>
            </div>
            <span className="text-xs text-gray-500 ml-1">{period}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewAgentsCard;