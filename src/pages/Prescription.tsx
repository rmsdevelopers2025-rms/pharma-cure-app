
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Camera, FileText, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';

const Prescription = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { t } = useLanguage();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      analyzePresecription(file);
    }
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    const mockFile = new File([''], 'camera-capture.jpg', { type: 'image/jpeg' });
    setUploadedFile(mockFile);
    analyzePresecription(mockFile);
  };

  const analyzePresecription = (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        medications: [
          {
            name: 'Amoxicillin',
            dosage: '500mg',
            frequency: '3 times daily',
            duration: '7 days',
            sideEffects: ['Nausea', 'Diarrhea', 'Skin rash'],
            interactions: ['Warfarin'],
            isPremium: false
          },
          {
            name: 'Ibuprofen',
            dosage: '400mg',
            frequency: '2 times daily',
            duration: '5 days',
            sideEffects: ['Stomach pain', 'Heartburn'],
            interactions: ['Aspirin', 'Warfarin'],
            isPremium: true
          }
        ]
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                <FileText className="w-8 h-8 mx-auto mb-2" />
                {t('prescription')} Analysis
              </CardTitle>
              <p className="text-center text-gray-600">
                Upload your prescription to get detailed drug information
              </p>
            </CardHeader>
            
            <CardContent>
              {!uploadedFile ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-semibold mb-2">Upload from Gallery</h3>
                    <p className="text-sm text-gray-600 mb-4">Choose image from your device</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Select File
                      </Button>
                    </label>
                  </div>

                  {/* Camera Capture */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-semibold mb-2">Take Photo</h3>
                    <p className="text-sm text-gray-600 mb-4">Capture prescription with camera</p>
                    <Button variant="outline" onClick={handleCameraCapture}>
                      Open Camera
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <FileText className="w-16 h-16 mx-auto text-blue-600 mb-2" />
                    <p className="font-semibold">{uploadedFile.name}</p>
                  </div>
                  
                  {isAnalyzing && (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                      <span>Analyzing prescription...</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Analysis Results</h2>
              
              {analysisResult.medications.map((med: any, index: number) => (
                <Card key={index}>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardTitle className="text-xl">{med.name}</CardTitle>
                    <p className="text-gray-600">
                      {med.dosage} - {med.frequency} for {med.duration}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Side Effects</h4>
                      <div className="flex flex-wrap gap-2">
                        {med.sideEffects.map((effect: string, i: number) => (
                          <span key={i} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Drug Interactions</h4>
                      {med.isPremium ? (
                        <div className="flex flex-wrap gap-2">
                          {med.interactions.map((interaction: string, i: number) => (
                            <span key={i} className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm">
                              {interaction}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-yellow-700 text-sm">
                          Upgrade to Premium to view drug interactions
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescription;
