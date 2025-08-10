import Svg, { Line } from 'react-native-svg';

export default function MinusIcon({ size = 20, color = 'white' }) {
  const strokeWidth = 2;
  const half = size / 2;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Line
        x1={strokeWidth}
        y1={half}
        x2={size - strokeWidth}
        y2={half}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}
