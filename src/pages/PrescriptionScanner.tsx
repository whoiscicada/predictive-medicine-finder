
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pill, Upload, FileText, Loader2 } from "lucide-react";
import MedicationCard from "@/components/MedicationCard";
import { GenericMedicine } from "@/types/medications";

export default function PrescriptionScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [predictions, setPredictions] = useState<GenericMedicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image file");
      return;
    }
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://127.0.0.1:5001/scan-prescription", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setExtractedText(response.data.extracted_text || "No text found");
      setPredictions(response.data.predictions.Recommendations || []);
    } catch (err) {
      setError("Error processing the image. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-medicine-background">
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Pill className="h-10 w-10 text-medicine-primary mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Prescription Scanner
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your prescription image to find affordable generic alternatives.
          </p>
        </header>

        <div className="max-w-md mx-auto mb-10">
          <Card className="shadow-md">
            <CardHeader className="medicine-header">
              <CardTitle className="text-xl flex items-center">
                <Upload className="mr-2 h-5 w-5" /> Upload Prescription
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <div className="border-2 border-dashed rounded-md p-4 border-medicine-primary/20 hover:border-medicine-primary transition-colors">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
                <Button 
                  onClick={handleUpload} 
                  disabled={loading}
                  className="bg-medicine-primary hover:bg-medicine-secondary w-full py-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Prescription
                    </>
                  )}
                </Button>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-medicine-primary" />
            <span className="ml-3 text-lg font-medium text-gray-700">Processing prescription...</span>
          </div>
        )}

        {!loading && extractedText && (
          <Card className="max-w-2xl mx-auto mt-8 shadow-md">
            <CardHeader className="medicine-header">
              <CardTitle className="text-xl flex items-center">
                <FileText className="mr-2 h-5 w-5" /> Extracted Text
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="whitespace-pre-line text-gray-700">{extractedText}</p>
            </CardContent>
          </Card>
        )}

        {!loading && predictions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Recommended Generic Alternatives
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predictions.map((generic, index) => (
                <MedicationCard 
                  key={index}
                  medication={generic}
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
