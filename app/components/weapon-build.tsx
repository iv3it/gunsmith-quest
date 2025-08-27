import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useCounter } from '../context/counter-context';
import { Build, QuestData, Variant } from '../types/types';
import { fetchQuestPart } from '../utils/questPart';
import CustomText from './custom-text';
import ItemsList from './items-list';

interface TableProps {
  partId: number;
}

export default function WeaponBuild ({partId} : TableProps) {
  const [loading, setLoading] = useState(true);
  
  const { completed } = useCounter();

  const [partData, setPartData] = useState<QuestData | undefined>(undefined);

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

  
  if (loading) {
    return <ActivityIndicator />;
  }

  const isCompleted = !!completed?.[partId];

  return (
    <ScrollView className='my-4 overflow-visible'>
      <View>
        {partData && partData.builds.map((build: Build, partDataIndex: number) =>
          <View key={partDataIndex} className='px-4'>
            <CustomText className='text-2xl text-white font-medium flex justify-center mb-6'>{build.weapon?.name || 'No name'}</CustomText>
            <CustomText className={`text-2xl text-darkGreen flex justify-center ${isCompleted ? 'opacity-100' : 'opacity-0'}`}>Completed</CustomText>
            <View className='flex'>
              {build.variants.map((variant: Variant, variantIndex: number) => (
                <View className='mt-16 mb-8' key={variantIndex}>
                  <CustomText className='text-xl text-white font-semibold'>VARIANT {variantIndex + 1}</CustomText>
                  <View>
                    <ItemsList items={variant.parts.flatMap((part) => part.items)}/>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

      </View>
    </ScrollView>
  );
};
