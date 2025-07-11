
import { Volume2, AlertTriangle, Shield, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSpeak(`${drug.name} information`)}
            className="text-blue-600"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Composition */}
        <div className="mt-3">
          <h4 className="font-semibold text-sm mb-2">{t('composition')}</h4>
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
      
      <CardContent className="p-6 space-y-4">
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

        {/* Dosage Forms */}
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-500" />
            {t('dosageForms')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {drug.dosageForms.map((form, i) => (
              <Badge key={i} variant="outline" className="bg-green-50 text-green-800">
                {form}
              </Badge>
            ))}
          </div>
        </div>

        {/* Premium Features */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center mb-2">
            <Crown className="w-5 h-5 mr-2 text-yellow-600" />
            <span className="font-semibold text-yellow-800">Premium Features</span>
          </div>
          
          <div className="space-y-2">
            <div>
              <h4 className="font-medium text-sm text-yellow-800">{t('disorders')}</h4>
              {drug.isPremium ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {drug.disorders.map((disorder, i) => (
                    <Badge key={i} variant="outline" className="bg-yellow-100 text-yellow-800">
                      {disorder}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-yellow-700">Upgrade to Premium to view</p>
              )}
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-yellow-800">{t('incompatibility')}</h4>
              {drug.isPremium ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {drug.incompatibility.map((incomp, i) => (
                    <Badge key={i} variant="destructive" className="bg-red-100 text-red-800">
                      {incomp}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-yellow-700">Upgrade to Premium to view</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
