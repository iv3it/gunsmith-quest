import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useCounter } from '../context/counter-context';
import { TraderWithoutTask, WeaponWithoutTask } from '../types/types';
import CustomText from './custom-text';
import CustomTitleText from './custom-title-text';
import MinusIcon from './minus-icon';
import PlusIcon from './plus-icon';

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
                
                <Shadow
                  distance={7}
                  startColor="rgba(241, 127, 41, 0.2)"
                  offset={[0, 0]}
                  sides={{ top: true, bottom: true, start: true, end: true }}
                  corners={{ topStart: true, topEnd: true, bottomStart: true, bottomEnd: true }}
                  style={{
                    borderRadius: 16,
                    width: 32,
                    height: 32,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity onPress={() => decrease(item.slug)}
                    className='bg-darkOrange p-2 rounded-full w-8 h-8 flex justify-center items-center'
                  >
                    <MinusIcon size={20} color="white" />
                  </TouchableOpacity>
                </Shadow> 
                <CustomText className='mx-4 text-white text-xl font-semibold'>{amount}</CustomText>
                <Shadow
                  distance={7}
                  startColor="rgba(241, 127, 41, 0.2)"
                  offset={[0, 0]}
                  sides={{ top: true, bottom: true, start: true, end: true }}
                  corners={{ topStart: true, topEnd: true, bottomStart: true, bottomEnd: true }}
                  style={{
                    borderRadius: 16,
                    width: 32,
                    height: 32,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity onPress={() => increase(item.slug)}
                    className='bg-darkOrange p-2 rounded-full w-8 h-8 flex justify-center items-center'
                  >
                    <PlusIcon size={20} color="white" />
                  </TouchableOpacity>
                </Shadow>
              </View>

            </View>
          )
        })}
      </View>
    </ScrollView>
  );
};

export default Table;
