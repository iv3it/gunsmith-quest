import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import CustomText from './custom-text';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const BUTTON_W = 150;
const BUTTON_H = 50;
const CUT_SIZE = 20;

export default function CustomButton ({ title, onPress, disabled } : CustomButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.wrapper, disabled && styles.disabledWrapper]}>
      <LinearGradient
        colors={disabled ? ['transparent', 'transparent', 'transparent'] : ['#dee9e9', '#dee9e9', '#a0a8a8']}
        locations={[0, 0.3125, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ width: BUTTON_W, height: BUTTON_H }}
      />
      <Svg width={BUTTON_W} height={BUTTON_H} style={StyleSheet.absoluteFill}>
        {/* Top-left cut */}
        <Polygon
          points={`0,0 ${CUT_SIZE},0 0,${CUT_SIZE}`}
          fill={disabled ? "transparent" : "#1c1c1c"}
        />
        {/* Bottom-right cut */}
        <Polygon
          points={`${BUTTON_W},${BUTTON_H} ${BUTTON_W - CUT_SIZE},${BUTTON_H} ${BUTTON_W},${BUTTON_H - CUT_SIZE}`}
          fill={disabled ? "transparent" : "#1c1c1c"}
        />
      </Svg>
      <View style={styles.textContainer}>
        <CustomText style={[styles.text, disabled && styles.disabledText]}>{title}</CustomText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: BUTTON_W, height: BUTTON_H, position: 'relative' },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: '#1a1a1a', fontWeight: 'light', fontSize: 24 },
  disabledWrapper: {
    borderWidth: 2,
    borderColor: '#b0b0b0',
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  disabledText: {
    color: '#d1d1d1',
  },
});
