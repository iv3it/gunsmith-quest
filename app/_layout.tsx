import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/header";
import { CounterProvider } from "./context/counter-context";
import { SearchProvider } from "./context/search-context";

export default function RootLayout() {
  return ( 
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SearchProvider>
        <CounterProvider>
          <StatusBar translucent={false} backgroundColor="#1c1c1c" barStyle="light-content" />

          <SafeAreaView style={{ flex: 1 }}>
            <Header></Header>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="search" />
            </Stack>
          </SafeAreaView>
        </CounterProvider>
      </SearchProvider>
    </GestureHandlerRootView>
  )
}
