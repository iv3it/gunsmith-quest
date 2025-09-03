import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import CustomText from "../components/custom-text";
import CustomTitleText from "../components/custom-title-text";
import { useCounter } from "../context/counter-context";
import { TraderWithoutTask, WeaponWithoutTask, WeaponWithQuestParts } from "../types/types";

function hasQuestParts(item: WeaponWithoutTask | WeaponWithQuestParts): item is WeaponWithQuestParts {
  return (item as WeaponWithQuestParts).questParts !== undefined;
}

function hasTraders(item: WeaponWithoutTask | WeaponWithQuestParts): item is WeaponWithoutTask {
  return (item as WeaponWithoutTask).traders !== undefined;
}

interface ItemsListProps {
  items: (WeaponWithoutTask | WeaponWithQuestParts)[];
}

export default function ItemsList({ items }: ItemsListProps) {
  const { amounts, increase, decrease } = useCounter();

  return (
    <View>
      {items.map((item, index: number) => {
        const amount = amounts[item.slug] || 0;

        return (
          <View key={index} className='flex-row items-stretch border-b border-[#424242]'>

            {/* Name Cell */}
            <View className='flex-1 flex-row items-center p-4 pl-0'>

              {item.icon ? (
                <Image
                  source={{ uri: item.icon }}
                  className='w-24 h-16 mr-4'
                  resizeMode='contain'
                />
              ) : (
                <Ionicons name="ban-outline" size={36} color="white"  className="mr-4"/>
              )}
              
              <View className='flex flex-col'>
                <CustomTitleText className='text-white text-base font-semibold'>{item.name}</CustomTitleText>

                {hasTraders(item) && item.traders &&
                  <CustomText className='text-white text-base'>{item.traders.map((trader: TraderWithoutTask) => trader.trader.name).join(', ')}</CustomText>
                }

                {hasQuestParts(item) && item.questParts &&
                  <CustomText className='text-white text-base'>{item.questParts.length > 0 ? `Parts: ${item.questParts.join(", ")}` : ''}</CustomText>
                }
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
  );
}
