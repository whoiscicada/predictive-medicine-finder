
export interface StandardMedicine {
  Name: string;
  Price: string;
  Content: string;
  Disease: string;
  "Dosage Text": string;
}

export interface GenericMedicine extends StandardMedicine {
  "Match Probability": number;
}

export interface MedicationRecommendation {
  "Standard Medicine": StandardMedicine;
  Recommendations: GenericMedicine[];
}

export interface MedicationApiResponse {
  data: MedicationRecommendation;
  error?: string;
}
