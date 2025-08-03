import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import "../global.css";
import CustomButton from './components/custom-button';
import Table from './components/table';
import { CounterProvider } from './context/counter-context';
import { Build, QuestData, QuestParts, Variant } from './types/types';
import { fetchQuestPart } from './utils/questPart';
import { fetchQuestPartsList } from './utils/questPartsList';

export default function Index() {
  const [data, setData] = useState<QuestParts | undefined>(undefined);
  const [partData, setPartData] = useState<QuestData | undefined>(undefined);

  const [questPartIndex, setQuestPartIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartsList = async () => {
      try {
        const response = await fetchQuestPartsList();

        setData(response);
      } catch (error) {
        console.error('Axios error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartsList();
  }, []);

  useEffect(() => {
    if (questPartIndex < 0 || !data) return;

    const fetchPart = async () => {
      setLoading(true);
      try {
        const response = await fetchQuestPart(data.parts[questPartIndex]);
        setPartData(response);
      } catch (error) {
        console.error('Axios error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [questPartIndex, data]);

  if (loading) return <ActivityIndicator />;

  const handlePrev = () => {
    setQuestPartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!data) return;
    setQuestPartIndex((prev) => Math.min(data.parts.length - 1, prev + 1));
  };

  return (
    <CounterProvider>
      <ScrollView className='bg-[#1c1c1c]'>
        <View className='flex justify-center'>
          <View className='flex flex-row justify-between px-4 py-8'>
            <CustomButton
              title="Back"
              backgroundColor="bg-emerald-800"
              onPress={handlePrev}
              disabled={questPartIndex === 0}
            />
            <CustomButton
              title="Next"
              backgroundColor="bg-emerald-800"
              onPress={handleNext}
              disabled={questPartIndex === (data?.parts.length ?? 1) - 1}
            />
          </View>

          {data && data.parts && (
            <Text className='text-3xl text-white font-bold flex justify-center mb-6 px-4'>
              Part {data.parts[questPartIndex]}
            </Text>
          )}

          {partData && partData.builds.map((build: Build, partDataIndex: number) =>
            <View key={partDataIndex} className='px-4'>
              <Text className='text-xl text-white font-medium flex justify-center mb-6'>{build.weapon?.name || 'No name'}</Text>
              <View className='flex'>
                {build.variants.map((variant: Variant, variantIndex: number) => (
                  <View className='mt-16 mb-8'>
                    <Text className='text-xl text-white font-semibold'>VARIANT {variantIndex + 1}</Text>
                    <View key={variantIndex}>
                      <Table
                        tableData={variant.parts.flatMap((part) => part.items)}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

        </View>
      </ScrollView>
    </CounterProvider>
  );
}
