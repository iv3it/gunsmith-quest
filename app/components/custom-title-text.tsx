import { Text, TextProps } from 'react-native';

export default function CustomTitleText(props: TextProps) {
  return <Text {...props} className={`font-tomorrow ${props.className ?? ''}`} />;
}