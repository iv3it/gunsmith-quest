import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useCounter } from '../context/counter-context';
import { TraderWithoutTask, WeaponWithoutTask } from '../types/types';

interface TableProps {
  tableData: WeaponWithoutTask[];
}

const Table = ({tableData} : TableProps) => {
  const { amounts, increase, decrease } = useCounter();

  return (
    <ScrollView className='my-4'>
      <View>
        {tableData.map((item, index) => {
          const amount = amounts[item.slug] || 0;

          return (
            <View key={index} className='flex-row items-stretch border-b border-[#424242]'>

              {/* Name Cell */}
              <View className='flex-1 flex-row items-center p-4 pl-0'>
                <View className='bg-emerald-800 w-10 h-10 rounded-full mr-4'></View>
                {/* <Image
                  source={{ uri: item.icon }}
                  className='w-8 h-8'
                  resizeMode='contain'
                /> */}
                
                <View className='flex flex-col'>
                  <Text className='text-white text-sm font-semibold'>{item.name}</Text>

                  <Text className='text-white text-xs italic'>{item.traders.map((trader: TraderWithoutTask) => trader.trader.name).join(', ')}</Text>
                </View>
              </View>

              {/* Amount Cell */}
              <View className='flex-1 flex-row justify-end items-center p-4 pr-0'>
                <TouchableOpacity onPress={() => decrease(item.slug)} className='bg-red-700 p-2 rounded-full w-8 h-8 flex justify-center items-center'>
                  <Text className='text-white text-lg'>-</Text>
                </TouchableOpacity>
                <Text className='mx-4 text-white text-lg font-semibold'>{amount}</Text>
                <TouchableOpacity onPress={() => increase(item.slug)} className='bg-emerald-800 p-2 rounded-full w-8 h-8 flex justify-center items-center'>
                  <Text className='text-white text-lg'>+</Text>
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
