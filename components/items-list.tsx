import { useCounter } from "@/context/counter-context";
import { Weapon, WeaponWithQuestParts } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { FlatList, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import CustomText from "./custom-text";
import CustomTitleText from "./custom-title-text";

function hasQuestParts(item: Weapon | WeaponWithQuestParts): item is WeaponWithQuestParts {
  return (item as WeaponWithQuestParts).questParts !== undefined;
}

function hasTraders(item: Weapon | WeaponWithQuestParts): item is Weapon {
  return (item as Weapon).traders !== undefined;
}

interface ItemsListProps {
  items: (Weapon[][] | WeaponWithQuestParts)[];
}

export default function ItemsList({ items }: ItemsListProps) {
  const { amounts, increase, decrease } = useCounter();

  const renderRow = (item: Weapon | WeaponWithQuestParts) => {
    const amount = amounts[item.slug] || 0;

    return (
      <View className='flex-row items-stretch' key={item.slug}>

        {/* Name Cell */}
        <View className='flex-1 flex-row items-center p-4 pl-0'>

          {item.icon ? (
            <Image
              source={item.icon}
              contentFit="contain"
              contentPosition="left"
              cachePolicy="memory-disk"
              transition={700}
              style={{
                width: 80,
                height: 64,
                marginRight: 16,
              }}
            />
          ) : (
            <Ionicons name="ban-outline" size={36} color="white" className="mr-4"/>
          )}
          
          <View className='flex flex-col flex-1'>
            <CustomTitleText className='text-white text-base font-semibold'>{item.name}</CustomTitleText>

            {hasTraders(item) && item.traders && item.traders.length > 0 &&
              <CustomText className='text-white text-base'>
                {item.traders.map((item, tradersIndex) => {
                  const { trader, loyalty, isBarter, task } = item;
                  const barterText = isBarter ? 'B' : '';
                  const taskText = task ? ` - ${task}` : '';
                  return `${trader.name} (${loyalty}${barterText}${taskText})`;
                }).join(', ')}
              </CustomText>
            }

            {hasQuestParts(item) && item.questParts && item.questParts.length > 0 &&
              <CustomText className='text-white text-base'>Part: {item.questParts.join(", ")}</CustomText>
            }
          </View>
        </View>

        {/* Amount Cell */}
        <View className='flex-shrink-0 flex-row justify-end items-center p-4 pr-0'>
          
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
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        // Weapon[][]:
        if (Array.isArray(item)) {
          return (
            <View className="border-b border-[#424242]">
              {item.map((innerArray, innerArrayIndex) => (
                <View key={innerArrayIndex} className="mb-2">
                  {/* Render all items inside this inner array */}
                  {innerArray.map((alt) => renderRow(alt))}

                  {/* show "or" between inner arrays */}
                  {innerArrayIndex < item.length - 1 && (
                    <CustomText className="text-center text-gray-400 my-2">or</CustomText>
                  )}
                </View>
              ))}
            </View>
          )
        }

        // WeaponWithQuestParts:
        return (
          <View className="border-b border-[#424242]">
            {renderRow(item)}
          </View>
        );
      }}
    />
  );
}
