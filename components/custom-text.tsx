import { Text, TextProps } from 'react-native';

export default function CustomText(props: TextProps) {
  return <Text {...props} className={`font-saira ${props.className ?? ''}`} />;
}