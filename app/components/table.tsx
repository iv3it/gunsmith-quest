import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useCounter } from '../context/counter-context';
import { Build, QuestData, TraderWithoutTask, Variant, WeaponWithoutTask } from '../types/types';
import { fetchQuestPart } from '../utils/questPart';
import CustomText from './custom-text';
import CustomTitleText from './custom-title-text';

interface TableProps {
  partId: number;
}

export default function Table ({partId} : TableProps) {
  const [loading, setLoading] = useState(true);
  
  const { amounts, increase, decrease, completed } = useCounter();

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
                    {variant.parts.flatMap((part) => part.items).map((item: WeaponWithoutTask, index: number) => {
                      const amount = amounts[item.slug] || 0;

                      return (
                        <View key={index} className='flex-row items-stretch border-b border-[#424242]'>

                          {/* Name Cell */}
                          <View className='flex-1 flex-row items-center p-4 pl-0'>
                            <View className='bg-darkGreen w-10 h-10 rounded-full mr-4'></View>
                            {/* <Image
                              source={{ uri: item.icon }}
                              className='w-8 h-8'
                              resizeMode='contain'
                            /> */}
                            
                            <View className='flex flex-col'>
                              <CustomTitleText className='text-white text-base font-semibold'>{item.name}</CustomTitleText>

                              <CustomText className='text-white text-base'>{item.traders.map((trader: TraderWithoutTask) => trader.trader.name).join(', ')}</CustomText>
                            </View>
                          </View>

                          {/* Amount Cell */}
                          <View className='flex-1 flex-row justify-end items-center p-4 pr-0'>
                            
                            <Shadow
                              distance={7}
                              startColor="rgba(154, 29, 29, 0.3)"
                              offset={[0, 0]}
                              sides={{ top: true, bottom: true, start: true, end: true }}
                              corners={{ topStart: true, topEnd: true, bottomStart: true, bottomEnd: true }}
                              style={{
                                borderRadius: 16,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <TouchableOpacity onPress={() => decrease(item.slug)}
                                className='bg-darkRed p-2 rounded-full flex justify-center items-center'
                              >
                                <Ionicons name="remove-outline" size={20} color="#fff" />
                              </TouchableOpacity>
                            </Shadow> 
                            <CustomText className='mx-4 text-white text-xl font-semibold'>{amount}</CustomText>
                            <Shadow
                              distance={7}
                              startColor="rgba(26, 153, 55, 0.3)"
                              offset={[0, 0]}
                              sides={{ top: true, bottom: true, start: true, end: true }}
                              corners={{ topStart: true, topEnd: true, bottomStart: true, bottomEnd: true }}
                              style={{
                                borderRadius: 16,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <TouchableOpacity onPress={() => increase(item.slug)}
                                className='bg-darkGreen p-2 rounded-full flex justify-center items-center'
                              >
                                <Ionicons name="add-outline" size={20} color="#fff" />
                              </TouchableOpacity>
                            </Shadow>
                          </View>

                        </View>
                      )
                    })}
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
