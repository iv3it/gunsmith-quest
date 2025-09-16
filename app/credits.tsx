import { View } from "react-native";
import CustomText from "./components/custom-text";
import CustomTitleText from "./components/custom-title-text";

export default function CreditsPage() {
  return (
    <View className="flex-1 bg-[#1c1c1c] px-4 pt-4">
      <CustomTitleText className='text-4xl text-white md:text-center mb-6'>
        Credits
      </CustomTitleText>
      <CustomText className="text-white text-xl">test</CustomText>
    </View>
  );
}
