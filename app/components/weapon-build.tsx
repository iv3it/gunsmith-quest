import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useCounter } from '../context/counter-context';
import { Build, QuestData, Variant } from '../types/types';
import { fetchQuestPart } from '../utils/questPart';
import CustomText from './custom-text';
import ItemsList from './items-list';

interface WeaponBuildProps {
  partId: number;
  onReady: () => void;
}

export default function WeaponBuild ({ partId, onReady } : WeaponBuildProps) {
  const [loading, setLoading] = useState(true);
  
  const { completed } = useCounter();

  const [partData, setPartData] = useState<QuestData | undefined>(undefined);

  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
      if (partId < 0) return;
  
      const fetchPart = async () => {
        setLoading(true);
        try {
          const response = await fetchQuestPart(partId);
          setPartData(response);          
        } catch (error) {
          console.error('Axios error:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPart();
  }, [partId]);

  useEffect(() => {
    if (!loading && partData) {
      onReady();
    }
  }, [loading, partData]);

  const isCompleted = !!completed?.[partId];

  return (
    <View className='my-4'>
      {partData && partData.builds.map((build: Build, partDataIndex: number) =>
        <View key={partDataIndex} className='px-4'>
          <CustomText className='text-2xl text-white font-medium flex justify-center mb-4'>{build.weapon?.name || 'No name'}</CustomText>
          <CustomText className='text-white text-xl text-center'>
            {build.weapon.traders.map((item, tradersIndex) => {
              const { trader, loyalty, isBarter, task } = item;
              const barterText = isBarter ? 'B' : '';
              const taskText = task ? ` - ${task}` : '';
              return `${trader.name} (${loyalty}${barterText}${taskText})`;
            }).join(', ')}
          </CustomText>
          <CustomText className={`text-2xl text-darkGreen flex justify-center mb-6 ${isCompleted ? 'opacity-100' : 'opacity-0'}`}>Completed</CustomText>

          {/* Tabs */}
          <View className="flex-row mb-6">
            {build.variants.map((variant: Variant, variantIndex: number) => (
              <Pressable
                key={variantIndex}
                onPress={() => setSelectedVariant(variantIndex)}
                className="mr-6"
              >
                <CustomText className={`text-xl ${selectedVariant === variantIndex ? 'text-white pb-1 border-gray-50 border-b-2' : 'text-gray-400'}`}>
                  VARIANT {variantIndex + 1}
                </CustomText>
              </Pressable>
            ))}
          </View>

          {/* Active Variant Content */}
          <View className="mt-4 mb-8">
            <ItemsList items={build.variants[selectedVariant].parts.map((part) => part.items)} />
          </View>

        </View>
      )}
    </View>
  );
};
