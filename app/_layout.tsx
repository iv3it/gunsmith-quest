import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CounterProvider } from "./context/counter-context";

export default function RootLayout() {
  return ( 
    <CounterProvider>
      <StatusBar translucent={false} backgroundColor="#1c1c1c" barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </CounterProvider>
  )
}
