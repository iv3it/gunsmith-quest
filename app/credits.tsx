import CustomText from "@/components/custom-text";
import CustomTitleText from "@/components/custom-title-text";
import * as Linking from 'expo-linking';
import { View } from "react-native";

export default function CreditsPage() {
  return (
    <View className="flex-1 bg-[#1c1c1c] px-4 pt-4">
      <CustomTitleText className='text-4xl text-white md:text-center my-6'>
        Credits
      </CustomTitleText>

      <CustomText className="text-white text-2xl mb-4">Creators:</CustomText>
      <CustomText className="mb-12">
        <CustomText className="text-white underline underline-offset-4 text-xl" onPress={() => Linking.openURL('https://github.com/Fyffe')}>Fyffe</CustomText>
        <CustomText className="text-white text-xl"> & </CustomText>
        <CustomText className="text-white underline underline-offset-4 text-xl" onPress={() => Linking.openURL('https://github.com/iv3it')}>iv3it</CustomText>
      </CustomText>

      <CustomText className="text-white text-2xl mb-4">Sources:</CustomText>
      <CustomText className="text-white underline underline-offset-4 text-xl mb-2" onPress={() => Linking.openURL('https://www.flaticon.com/free-icon/rifle_4810861')}>Rifle icon created by Triangle Squad - Flaticon</CustomText>

      <CustomText className="text-white text-xl mb-2">Game content and materials are trademarks and copyrights of Battlestate Games and its licensors. All rights reserved.</CustomText>
    </View>
  );
}
