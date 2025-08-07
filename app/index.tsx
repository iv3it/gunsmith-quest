import { SairaExtraCondensed_400Regular } from '@expo-google-fonts/saira-extra-condensed';
import { Tomorrow_400Regular } from '@expo-google-fonts/tomorrow';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, Switch, View } from "react-native";
import Svg, { Defs, Path, Pattern, Rect } from 'react-native-svg';
import "../global.css";
import CustomButton from './components/custom-button';
import CustomText from './components/custom-text';
import CustomTitleText from './components/custom-title-text';
import Table from './components/table';
import { useCounter } from './context/counter-context';
import { Build, QuestData, QuestParts, Variant } from './types/types';
import { fetchQuestPart } from './utils/questPart';
import { fetchQuestPartsList } from './utils/questPartsList';

const { width, height } = Dimensions.get('window');

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
        <View className='flex flex-row justify-between px-4 py-8'>
          <CustomButton
            title="Back"
            onPress={handlePrev}
            disabled={questPartIndex === 0}
          />
          <CustomButton
            title="Next"
            onPress={handleNext}
            disabled={questPartIndex === (data?.parts.length ?? 1) - 1}
          />
        </View>

        <View className='flex flex-row items-center px-4 py-8'>
          {Platform.OS === 'web' ? (
            <>
              <Pressable
                onPress={toggleSwitch}
                style={[
                  styles.webSwitch,
                  { backgroundColor: isCompleted ? '#f8f8f8' : '#767577' },
                ]}
              >
                <View
                  style={[
                    styles.thumb,
                    {
                      left: isCompleted ? 24 : 2,
                      backgroundColor: isCompleted ? '#f96900' : '#f4f3f4',
                    },
                  ]}
                />
              </Pressable>
              <CustomText className='text-white text-xl ml-2'>{`Mark as ${isCompleted ? 'incomplete' : 'complete'}`}</CustomText>
            </>
          ) : (

            <>
              <Switch
                value={isCompleted}
                onValueChange={toggleSwitch}
                trackColor={{ false: '#767577', true: '#f8f8f8' }}
                thumbColor={isCompleted ? '#f96900' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
              <CustomText className='text-white text-xl ml-2'>{`Mark as ${isCompleted ? 'incomplete' : 'complete'}`}</CustomText>
            </>
          )}
        </View>

        {data && data.parts && (
          <CustomTitleText className='text-4xl text-white font-bold flex justify-center mb-6 px-4'>
            Part {data.parts[questPartIndex]}
          </CustomTitleText>
        )}

        {partData && partData.builds.map((build: Build, partDataIndex: number) =>
          <View key={partDataIndex} className='px-4'>
            <CustomText className='text-2xl text-white font-medium flex justify-center mb-6'>{build.weapon?.name || 'No name'}</CustomText>
            <CustomText className={`text-2xl text-darkOrange flex justify-center ${isCompleted ? 'opacity-100' : 'opacity-0'}`}>Completed</CustomText>
            <View className='flex'>
              {build.variants.map((variant: Variant, variantIndex: number) => (
                <View className='mt-16 mb-8' key={variantIndex}>
                  <CustomText className='text-xl text-white font-semibold'>VARIANT {variantIndex + 1}</CustomText>
                  <View>
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

      <Svg width={width} height={height} style={{ position: 'absolute', zIndex: -1, opacity: 0.01 }}>
        <Defs>
          <Pattern
            id="stripes"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="rotate(45)"
          >
            <Path d="M0 0 L20 0 L20 10 L0 10 Z" fill="#FFC0CB" />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#stripes)" />
      </Svg>

      <ImageBackground 
          source={require("../assets/images/shadow-orange.png")} 
          resizeMode="cover" 
          className='absolute bottom-0'
          style={{
            width: '100%',
          }}
        ></ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  webSwitch: {
    width: 50,
    height: 30,
    borderRadius: 30,
    position: 'relative',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    top: 3,
  },
});