import Header from "@/components/header";
import { CounterProvider } from "@/context/counter-context";
import { SearchProvider } from "@/context/search-context";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return ( 
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SearchProvider>
        <CounterProvider>
          <StatusBar translucent={false} backgroundColor="#1c1c1c" barStyle="light-content" />

          <SafeAreaView style={{ flex: 1, backgroundColor: "#1c1c1c" }}>
            <Header></Header>
            <Stack screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#1c1c1c" },
            }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="search" />
            </Stack>
          </SafeAreaView>
          
        </CounterProvider>
      </SearchProvider>
    </GestureHandlerRootView>
  )
}
