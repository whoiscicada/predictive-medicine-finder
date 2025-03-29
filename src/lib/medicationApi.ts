
import { MedicationRecommendation } from "@/types/medications";
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = "http://127.0.0.1:5000";

export async function fetchSuggestions(query: string): Promise<string[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/suggestions?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch suggestions");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
}

export async function fetchRecommendations(medicineName: string): Promise<MedicationRecommendation | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ standard_med_name: medicineName })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Failed to get recommendations");
    }

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive"
    });
    console.error("Error fetching recommendations:", error);
    return null;
  }
}
