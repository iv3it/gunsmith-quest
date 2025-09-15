import { SairaExtraCondensed_400Regular } from '@expo-google-fonts/saira-extra-condensed';
import { Tomorrow_400Regular } from '@expo-google-fonts/tomorrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Platform, Pressable, StyleSheet, Switch, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Svg, { Defs, Path, Pattern, Rect } from 'react-native-svg';
import "../../global.css";
import CustomButton from '../components/custom-button';
import CustomText from '../components/custom-text';
import CustomTitleText from '../components/custom-title-text';
import LoadingDots from '../components/loading-dots';
import WeaponBuild from '../components/weapon-build';
import { useCounter } from '../context/counter-context';
import { QuestParts } from '../types/types';
import { fetchQuestPartsList } from '../utils/questPartsList';

const { width, height } = Dimensions.get('window');

export default function Index() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Tomorrow: Tomorrow_400Regular,
    Saira: SairaExtraCondensed_400Regular,
  });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<QuestParts | undefined>(undefined);

  const { completed, toggleCompleted } = useCounter();
  const isCompleted = completed?.[id.toString() ?? ''] || false;

  const [showOverlay, setShowOverlay] = useState(true);
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  const [weaponBuildReady, setWeaponBuildReady] = useState(false);
  
  const toggleSwitch = () => {
    if (id) toggleCompleted(id.toString());
  };

  // hide overlay only when everything is ready
  useEffect(() => {
    if (fontsLoaded && !loading && weaponBuildReady) {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setShowOverlay(false));
    }
  }, [fontsLoaded, loading, weaponBuildReady]);

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
    const saveLastOpenedPart = async () => {
      try {
        await AsyncStorage.setItem('lastOpenedPartId', id.toString());
      } catch (error) {
        console.error("Error saving last part:", error);
      }
    };

    saveLastOpenedPart();
  }, [id]);

  if (!data || !data.parts) {
    return null;
  }

  const currentIndex = data.parts.findIndex((p) => p.toString() === id.toString());

  if (currentIndex === -1) {
    return <CustomText className="text-white">Invalid part ID</CustomText>;
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      router.replace({
        pathname: "/part/[id]",
        params: { id: data.parts[currentIndex - 1] },
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < data.parts.length - 1) {
      router.replace({
        pathname: "/part/[id]",
        params: { id: data.parts[currentIndex + 1] },
      });
    }
  };

  const swipeGesture = Gesture.Pan()
  .activeOffsetX([-50, 50]) // only react if horizontal movement > 50px
  .failOffsetY([-50, 50])   // fail gesture if vertical movement > 50px
  .onEnd((event) => {
    if (!data.parts) return;

    if (event.translationX < 0) {
      handleNext()
    } else if (event.translationX > 0) {
      handlePrev()
    }
  }).runOnJS(true);

  return (
    <View style={{ flex: 1 }} className='bg-[#1c1c1c]'>
      {showOverlay && (
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#1c1c1c',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: overlayOpacity,
            zIndex: 999,
          }}
        >
          <LoadingDots />
        </Animated.View>
      )}

      {(fontsLoaded && !loading) && (
        <FlatList
          data={[]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={null}
          ListHeaderComponent={
            <View>
              <View className='flex flex-row justify-between px-4 py-8'>
                <CustomButton
                  title="Back"
                  onPress={handlePrev}
                  disabled={currentIndex === 0}
                />
                <CustomButton
                  title="Next"
                  onPress={handleNext}
                  disabled={currentIndex === data.parts.length - 1}
                />
              </View>

              <View className='flex flex-row items-center px-4 py-8'>
                {Platform.OS === 'web' ? (
                  <>
                    <Pressable
                      onPress={toggleSwitch}
                      style={[
                        styles.webSwitch,
                        { backgroundColor: isCompleted ? '#767577' : '#767577' },
                      ]}
                    >
                      <View
                        style={[
                          styles.thumb,
                          {
                            left: isCompleted ? 24 : 2,
                            backgroundColor: isCompleted ? '#f4f3f4' : '#f4f3f4',
                          },
                        ]}
                      />
                    </Pressable>
                    <Pressable onPress={toggleSwitch}>
                      <CustomText className='text-white text-xl ml-2'>{`Mark as ${isCompleted ? 'incomplete' : 'complete'}`}</CustomText>
                    </Pressable>
                  </>
                ) : (

                  <>
                    <Switch
                      value={isCompleted}
                      onValueChange={toggleSwitch}
                      trackColor={{ false: '#767577', true: '#767577' }}
                      thumbColor={isCompleted ? '#f4f3f4' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                    />
                    <Pressable onPress={toggleSwitch}>
                      <CustomText className='text-white text-xl ml-2'>{`Mark as ${isCompleted ? 'incomplete' : 'complete'}`}</CustomText>
                    </Pressable>
                  </>
                )}
              </View>

              <GestureDetector gesture={swipeGesture}>
                <View>
                  <CustomTitleText className='text-4xl text-white flex justify-center mb-6 px-4'>
                    Part {id}
                  </CustomTitleText>

                  <WeaponBuild partId={Number(id)} onReady={() => setWeaponBuildReady(true)} />
                </View>
              </GestureDetector>

            </View>
          }
        />
      )}

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

      <View style={styles.gradientWrapper} pointerEvents='none'>
        <LinearGradient
          colors={ isCompleted ? ['rgba(26, 123, 55, 0.35)', 'transparent'] : ['rgba(136, 74, 28, 0.35)', 'transparent']
          }
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          locations={[0, 0.7]}
          style={styles.gradientOverlay}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  gradientWrapper: {
    position: 'absolute',
    bottom: 0,
    height: 300,
    width: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
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