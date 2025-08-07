import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useCounter } from '../context/counter-context';
import { TraderWithoutTask, WeaponWithoutTask } from '../types/types';
import CustomText from './custom-text';
import CustomTitleText from './custom-title-text';

interface TableProps {
  tableData: WeaponWithoutTask[];
}

const Table = ({tableData} : TableProps) => {
  const { amounts, increase, decrease } = useCounter();

  return (
    <ScrollView className='my-4 overflow-visible'>
      <View>
        {tableData.map((item, index) => {
          const amount = amounts[item.slug] || 0;

          return (
            <View key={index} className='flex-row items-stretch border-b border-[#424242]'>

              {/* Name Cell */}
              <View className='flex-1 flex-row items-center p-4 pl-0'>
                <View className='bg-darkOrange w-10 h-10 rounded-full mr-4'></View>
                {/* <Image
                  source={{ uri: item.icon }}
                  className='w-8 h-8'
                  resizeMode='contain'
                /> */}
                
                <View className='flex flex-col'>
                  <CustomTitleText className='text-white text-base font-semibold'>{item.name}</CustomTitleText>

                  <CustomText className='text-white text-base italic'>{item.traders.map((trader: TraderWithoutTask) => trader.trader.name).join(', ')}</CustomText>
                </View>
              </View>

              {/* Amount Cell */}
              <View className='flex-1 flex-row justify-end items-center p-4 pr-0'>
                <TouchableOpacity onPress={() => decrease(item.slug)} className='bg-lightOrange shadow-orange-glow p-2 rounded-full w-8 h-8 flex justify-center items-center'>
                  <CustomText className='text-white text-3xl'>-</CustomText>
                </TouchableOpacity>
                <CustomText className='mx-4 text-white text-xl font-semibold'>{amount}</CustomText>
                <TouchableOpacity onPress={() => increase(item.slug)} className='bg-darkOrange shadow-orange-glow p-2 rounded-full w-8 h-8 flex justify-center items-center'>
                  <CustomText className='text-white text-3xl'>+</CustomText>
                </TouchableOpacity>
              </View>

            </View>
          )
        })}
      </View>
    </ScrollView>
  );
};

export default Table;
