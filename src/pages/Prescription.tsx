
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
          <Card className="mb-8 shadow-lg border border-gray-200 rounded-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
              <CardTitle className="text-3xl text-center flex items-center justify-center space-x-3">
                <div className="w-10 h-10">
                  <img 
                    src="/lovable-uploads/c2a08633-046c-4777-a1c8-0fc700677015.png" 
                    alt="PharmaCure Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-gray-800">{t('prescription')} Analysis</span>
              </CardTitle>
              <p className="text-center text-gray-600 mt-2">
                Upload your prescription to get detailed drug information and safety analysis
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              {!uploadedFile ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-blue-50/50">
                    <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                    <h3 className="font-bold mb-2 text-lg text-gray-800">Upload from Gallery</h3>
                    <p className="text-sm text-gray-600 mb-6">Choose image from your device</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer border-blue-500 text-blue-600 hover:bg-blue-50">
                        Select File
                      </Button>
                    </label>
                  </div>

                  {/* Camera Capture */}
                  <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors bg-green-50/50">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-green-500" />
                    <h3 className="font-bold mb-2 text-lg text-gray-800">Take Photo</h3>
                    <p className="text-sm text-gray-600 mb-6">Capture prescription with camera</p>
                    <Button variant="outline" onClick={handleCameraCapture} className="border-green-500 text-green-600 hover:bg-green-50">
                      Open Camera
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-6">
                    <FileText className="w-20 h-20 mx-auto text-blue-600 mb-4" />
                    <p className="font-bold text-lg text-gray-800">{uploadedFile.name}</p>
                  </div>
                  
                  {isAnalyzing && (
                    <div className="flex items-center justify-center space-x-3 bg-blue-50 p-6 rounded-xl">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      <span className="text-lg font-medium text-blue-700">Analyzing prescription...</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Analysis Results</h2>
              
              {analysisResult.medications.map((med: any, index: number) => (
                <Card key={index} className="shadow-lg border border-gray-200 rounded-xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-xl">
                    <CardTitle className="text-2xl text-gray-800">{med.name}</CardTitle>
                    <p className="text-gray-600 font-medium">
                      {med.dosage} - {med.frequency} for {med.duration}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3 text-gray-800">Side Effects</h4>
                      <div className="flex flex-wrap gap-2">
                        {med.sideEffects.map((effect: string, i: number) => (
                          <span key={i} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                      <h4 className="font-bold text-lg text-yellow-800 mb-3">Drug Interactions</h4>
                      {med.isPremium ? (
                        <div className="flex flex-wrap gap-2">
                          {med.interactions.map((interaction: string, i: number) => (
                            <span key={i} className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                              {interaction}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-yellow-700 font-medium">
                          Upgrade to Premium to view detailed drug interactions
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
