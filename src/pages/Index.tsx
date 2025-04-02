
import React, { useState } from "react";
import { fetchRecommendations } from "@/lib/medicationApi";
import MedicationSearch from "@/components/MedicationSearch";
import MedicationCard from "@/components/MedicationCard";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { MedicationRecommendation } from "@/types/medications";
import { Pill, Loader2 } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<MedicationRecommendation | null>(null);

  const handleSearch = async (medicineName: string) => {
    setIsLoading(true);
    const data = await fetchRecommendations(medicineName);
    if (data) {
      setRecommendation(data);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-medicine-background">
      <BackgroundAnimation />
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Pill className="h-10 w-10 text-medicine-primary mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Predictive Generic Medicine Finder
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find affordable generic alternatives to your prescribed medications with our AI-powered medicine matcher.
          </p>
        </header>

        <div className="mb-10">
          <MedicationSearch onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-medicine-primary" />
            <span className="ml-3 text-lg font-medium text-gray-700">Finding medication alternatives...</span>
          </div>
        )}

        {!isLoading && recommendation && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <MedicationCard 
                medication={recommendation["Standard Medicine"]} 
                isStandard={true} 
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Generic Alternatives
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendation.Recommendations.map((generic, index) => (
                  <MedicationCard 
                    key={index}
                    medication={generic}
                    index={index + 1}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {!isLoading && !recommendation && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center p-4 bg-medicine-light rounded-full mb-4">
              <Pill className="h-8 w-8 text-medicine-secondary" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Search for a medication to see alternatives
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter a standard medication name above to find generic alternatives that could save you money.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
