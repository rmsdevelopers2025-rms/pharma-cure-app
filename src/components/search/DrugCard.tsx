
import { Volume2, AlertTriangle, Shield, Crown, Info, Heart, Clock, Pill, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Drug } from '@/data/drugDatabase';

interface DrugCardProps {
  drug: Drug;
  onSpeak: (text: string) => void;
}

export default function DrugCard({ drug, onSpeak }: DrugCardProps) {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{drug.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Generic: {drug.genericName}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                {drug.therapeuticClass}
              </Badge>
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                {drug.category}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSpeak(`${drug.name} pharmaceutical information`)}
            className="text-blue-600"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Composition */}
        <div className="mt-3">
          <h4 className="font-semibold text-sm mb-2 flex items-center">
            <Beaker className="w-4 h-4 mr-1" />
            {t('composition')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {drug.composition.map((comp, i) => (
              <Badge key={i} variant="outline" className="bg-blue-50 text-blue-800">
                {comp.activeIngredient} {comp.strength}
              </Badge>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="mt-3">
          <h4 className="font-semibold text-sm mb-2">{t('brands')}</h4>
          <div className="flex flex-wrap gap-2">
            {drug.brands.map((brand, i) => (
              <Badge key={i} variant="secondary">{brand}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="clinical">Clinical</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 mt-4">
            {/* Mechanism of Action */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-500" />
                Mechanism of Action
              </h3>
              <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">{drug.mechanism}</p>
            </div>

            {/* Indications */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-green-500" />
                Indications
              </h3>
              <div className="flex flex-wrap gap-2">
                {drug.indications.map((indication, i) => (
                  <Badge key={i} variant="outline" className="bg-green-50 text-green-800">
                    {indication}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Dosage Forms */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Pill className="w-5 h-5 mr-2 text-purple-500" />
                Available Forms & Strengths
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Dosage Forms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {drug.dosageForms.map((form, i) => (
                      <Badge key={i} variant="outline" className="bg-purple-50 text-purple-800">
                        {form}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Available Strengths:</h4>
                  <div className="flex flex-wrap gap-2">
                    {drug.availableStrengths.map((strength, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-50 text-gray-800">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clinical" className="space-y-4 mt-4">
            {/* Dosage */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                Dosage Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Adult:</h4>
                  <p className="text-sm">{drug.dosage.adult}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Pediatric:</h4>
                  <p className="text-sm">{drug.dosage.pediatric}</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Elderly:</h4>
                  <p className="text-sm">{drug.dosage.elderly}</p>
                </div>
              </div>
            </div>

            {/* Monitoring */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Monitoring Parameters</h3>
              <div className="flex flex-wrap gap-2">
                {drug.monitoring.map((param, i) => (
                  <Badge key={i} variant="outline" className="bg-yellow-50 text-yellow-800">
                    {param}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Storage Conditions</h3>
              <p className="text-sm bg-gray-50 p-3 rounded-lg">{drug.storage}</p>
            </div>
          </TabsContent>


          <TabsContent value="safety" className="space-y-4 mt-4">
            {/* Side Effects */}
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                {t('sideEffects')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {drug.sideEffects.map((effect, i) => (
                  <Badge key={i} variant="destructive" className="bg-red-100 text-red-800">
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contraindications */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Contraindications</h3>
              <div className="flex flex-wrap gap-2">
                {drug.contraindications.map((contra, i) => (
                  <Badge key={i} variant="destructive" className="bg-red-200 text-red-900">
                    {contra}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Warnings */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Warnings & Precautions</h3>
              <div className="flex flex-wrap gap-2">
                {drug.warnings.map((warning, i) => (
                  <Badge key={i} variant="outline" className="bg-orange-50 text-orange-800 border-orange-200">
                    {warning}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pregnancy & Lactation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Pregnancy:</h4>
                <p className="text-sm">{drug.pregnancyCategory}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Lactation:</h4>
                <p className="text-sm">{drug.lactation}</p>
              </div>
            </div>

            {/* Overdose */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Overdose Management</h3>
              <p className="text-sm bg-red-50 p-3 rounded-lg border border-red-200">{drug.overdose}</p>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="space-y-2">
                <div>
                  <h4 className="font-medium text-sm text-blue-800">{t('disorders')}</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {drug.disorders.map((disorder, i) => (
                      <Badge key={i} variant="outline" className="bg-blue-100 text-blue-800">
                        {disorder}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-blue-800">{t('incompatibility')}</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {drug.incompatibility.map((incomp, i) => (
                      <Badge key={i} variant="destructive" className="bg-red-100 text-red-800">
                        {incomp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
