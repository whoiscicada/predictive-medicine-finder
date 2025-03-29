
import React from "react";
import { StandardMedicine, GenericMedicine } from "@/types/medications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Banknote, Activity, User, Clock } from "lucide-react";
import MatchIndicator from "./MatchIndicator";

interface MedicationCardProps {
  medication: StandardMedicine | GenericMedicine;
  isStandard?: boolean;
  index?: number;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication, isStandard = false, index }) => {
  // Check if this is a generic medicine with match probability
  const isGeneric = !isStandard && "Match Probability" in medication;
  const genericMed = medication as GenericMedicine;
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md", 
      isStandard ? "border-medicine-primary border-2" : "border-gray-200"
    )}>
      <CardHeader className={cn(
        "pb-2",
        isStandard ? "bg-medicine-primary text-white" : "bg-medicine-light"
      )}>
        <CardTitle className="flex items-center justify-between">
          <span>
            {isStandard ? "Standard Medicine" : `Generic Alternative ${index}`}
          </span>
          {isGeneric && (
            <span className="text-sm font-normal px-2 py-1 bg-white/10 rounded-full">
              {(genericMed["Match Probability"] * 100).toFixed(0)}% Match
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Pill className="h-5 w-5 text-medicine-secondary mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Name</p>
              <p className="font-medium">{medication.Name}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Banknote className="h-5 w-5 text-medicine-secondary mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Price</p>
              <p className="font-medium">{medication.Price}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Activity className="h-5 w-5 text-medicine-secondary mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Content</p>
              <p>{medication.Content}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-medicine-secondary mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Disease</p>
              <p>{medication.Disease}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-medicine-secondary mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Dosage</p>
              <p>{medication["Dosage Text"]}</p>
            </div>
          </div>
          
          {isGeneric && (
            <MatchIndicator probability={genericMed["Match Probability"]} className="mt-2" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

import { cn } from "@/lib/utils";

export default MedicationCard;
