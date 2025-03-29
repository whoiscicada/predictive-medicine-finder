
import React from "react";
import { cn } from "@/lib/utils";

interface MatchIndicatorProps {
  probability: number;
  className?: string;
}

const MatchIndicator: React.FC<MatchIndicatorProps> = ({ probability, className }) => {
  const percentage = Math.round(probability * 100);
  
  // Determine color based on match probability
  const getColor = () => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 75) return "bg-green-400"; 
    if (percentage >= 60) return "bg-yellow-400";
    return "bg-yellow-500";
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">
          Match Quality
        </span>
        <span className="text-sm font-medium text-gray-700">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${getColor()} h-2.5 rounded-full transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MatchIndicator;
