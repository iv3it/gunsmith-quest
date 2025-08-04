import { SairaExtraCondensed_400Regular } from '@expo-google-fonts/saira-extra-condensed';
import { Tomorrow_400Regular } from '@expo-google-fonts/tomorrow';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Switch, View } from "react-native";
import "../global.css";
import CustomButton from './components/custom-button';
import CustomText from './components/custom-text';
import CustomTitleText from './components/custom-title-text';
import Table from './components/table';
import { useCounter } from './context/counter-context';
import { Build, QuestData, QuestParts, Variant } from './types/types';
import { fetchQuestPart } from './utils/questPart';
import { fetchQuestPartsList } from './utils/questPartsList';

export default function Index() {
  const [loaded] = useFonts({
    Tomorrow: Tomorrow_400Regular,
    Saira: SairaExtraCondensed_400Regular,
  });

  const [data, setData] = useState<QuestParts | undefined>(undefined);
  const [partData, setPartData] = useState<QuestData | undefined>(undefined);

  const [questPartIndex, setQuestPartIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  const { completed, toggleCompleted } = useCounter();
  const currentPart = data?.parts[questPartIndex];
  const isCompleted = completed?.[currentPart?.toString() ?? ''] || false;
  
  const toggleSwitch = () => {
    if (currentPart) toggleCompleted(currentPart.toString());
  };

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

  if (!loaded || loading) return <ActivityIndicator />;

  const handlePrev = () => {
    setQuestPartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!data) return;
    setQuestPartIndex((prev) => Math.min(data.parts.length - 1, prev + 1));
  };

  return (
    <ScrollView className='bg-[#1c1c1c]'>
      <View className='flex justify-center'>
        <ImageBackground 
          source={require("../assets/images/shadow-orange.png")} 
          resizeMode="cover" 
          className='absolute top-0'
          style={{
            width: '100%',
          }}
        ></ImageBackground>
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

        <View className='flex flex-row items-center px-4 py-8'>
          <Switch
            trackColor={{false: '#767577', true: '#b5b5b5'}}
            thumbColor={isCompleted ? '#065f46' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isCompleted}
          />
          <CustomText className='text-white text-xs ml-2'>{`Mark as ${isCompleted ? 'incomplete' : 'complete'}`}</CustomText>
        </View>

        {data && data.parts && (
          <CustomTitleText className='text-3xl text-white font-bold flex justify-center mb-6 px-4'>
            Part {data.parts[questPartIndex]}
          </CustomTitleText>
        )}

        {partData && partData.builds.map((build: Build, partDataIndex: number) =>
          <View key={partDataIndex} className='px-4'>
            <CustomText className='text-xl text-white font-medium flex justify-center mb-6'>{build.weapon?.name || 'No name'}</CustomText>
            <CustomText className={`text-xs text-emerald-500 flex justify-center ${isCompleted ? 'opacity-100' : 'opacity-0'}`}>Completed</CustomText>
            <View className='flex'>
              {build.variants.map((variant: Variant, variantIndex: number) => (
                <View className='mt-16 mb-8'>
                  <CustomText className='text-xl text-white font-semibold'>VARIANT {variantIndex + 1}</CustomText>
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
  );
}
