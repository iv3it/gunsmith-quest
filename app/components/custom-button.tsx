import { Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  title: string;
  backgroundColor: string;
  onPress: () => void;
  disabled?: boolean;
}

const CustomButton = ({ title, backgroundColor, onPress, disabled } : CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${disabled ? 'bg-gray-400' : backgroundColor} rounded-full px-4 py-2`}
    >
      <Text className={`text-white text-center font-semibold`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;