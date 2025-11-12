
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Loader2, X, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { savePrescription } from '@/services/prescriptionService';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

const Prescription = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [currentPrescriptionId, setCurrentPrescriptionId] = useState<string | null>(null);
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase Storage and analyze
    await uploadAndAnalyze(file);
  };

  const handleCameraCapture = () => {
    // Create file input programmatically to trigger camera on mobile
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use back camera
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload({ target: { files: [file] } } as any);
      }
    };
    input.click();
  };

  const uploadAndAnalyze = async (file: File) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload prescriptions",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Save prescription (uploads to Supabase Storage)
      const { data: prescriptionData, error: uploadError } = await savePrescription(file);

      if (uploadError) {
        throw uploadError;
      }

      if (prescriptionData) {
        setCurrentPrescriptionId(prescriptionData.id);
        
        // Check if analysis was completed
        if (prescriptionData.analysis_results) {
          setAnalysisResult(prescriptionData.analysis_results);
          toast({
            title: "Success",
            description: "Prescription uploaded and analyzed successfully"
          });
        } else {
          toast({
            title: "Upload successful",
            description: "Prescription uploaded. Analysis in progress..."
          });
        }
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload prescription image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearUpload = () => {
    setUploadedFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setCurrentPrescriptionId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 sm:mb-8 shadow-lg border border-gray-200 rounded-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/b5751d8a-2aa5-4a0f-98b6-4a3ef09935da.png" 
                    alt="PharmaCure Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-gray-800">{t('prescription')} Analysis</span>
              </CardTitle>
              <p className="text-center text-sm sm:text-base text-gray-600 mt-2 px-2">
                Upload your prescription to get detailed drug information and safety analysis
              </p>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6 lg:p-8">
              {!uploadedFile ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* File Upload */}
                  <label htmlFor="file-upload" className="block cursor-pointer">
                    <div className="border-2 border-dashed border-blue-300 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center hover:border-blue-400 transition-colors bg-blue-50/50 min-h-[200px] sm:min-h-0 flex flex-col justify-center">
                      <Upload className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 text-blue-500" />
                      <h3 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg text-gray-800">Upload from Gallery</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 px-2">Choose image from your device</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button variant="outline" className="pointer-events-none border-blue-500 text-blue-600 hover:bg-blue-50 text-sm sm:text-base">
                        Select File
                      </Button>
                    </div>
                  </label>

                  {/* Camera Capture */}
                  <div className="border-2 border-dashed border-green-300 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center hover:border-green-400 transition-colors bg-green-50/50 cursor-pointer min-h-[200px] sm:min-h-0 flex flex-col justify-center" onClick={handleCameraCapture}>
                    <Camera className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 text-green-500" />
                    <h3 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg text-gray-800">Take Photo</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 px-2">Capture prescription with camera</p>
                    <Button variant="outline" className="pointer-events-none border-green-500 text-green-600 hover:bg-green-50 text-sm sm:text-base">
                      Open Camera
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Image Preview */}
                  <div className="relative">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-gray-800">Uploaded Prescription</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearUpload}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                    
                    {imagePreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-gray-200 max-w-md mx-auto">
                        <img 
                          src={imagePreview} 
                          alt="Prescription preview" 
                          className="w-full h-auto object-contain max-h-96"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-8 border border-gray-200 rounded-xl">
                        <FileText className="w-16 h-16 text-gray-400 mb-2" />
                        <p className="text-gray-600">{uploadedFile.name}</p>
                      </div>
                    )}
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="flex items-center justify-center space-x-3 bg-blue-50 p-6 rounded-xl">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      <span className="text-lg font-medium text-blue-700">Uploading and analyzing prescription...</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && analysisResult.medications && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Analysis Results</h2>
              
              {analysisResult.medications.map((med: any, index: number) => (
                <Card key={index} className="shadow-lg border border-gray-200 rounded-xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-xl">
                    <CardTitle className="text-2xl text-gray-800">{med.name}</CardTitle>
                    <div className="space-y-1 mt-2">
                      <p className="text-gray-700 font-medium">
                        <span className="font-bold">Dosage Form:</span> {med.dosageForm || 'N/A'}
                      </p>
                      <p className="text-gray-700 font-medium">
                        <span className="font-bold">Dose:</span> {med.dosage}
                      </p>
                      <p className="text-gray-700 font-medium">
                        <span className="font-bold">Frequency:</span> {med.frequency} for {med.duration}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-6">
                    {med.sideEffects && med.sideEffects.length > 0 && (
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
                    )}

                    {med.interactions && med.interactions.length > 0 && (
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-lg text-blue-800 mb-3">Drug Interactions</h4>
                        <div className="flex flex-wrap gap-2">
                          {med.interactions.map((interaction: string, i: number) => (
                            <span key={i} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {interaction}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
