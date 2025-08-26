import { Stack } from "expo-router";
import { Keyboard, Platform, StatusBar, TouchableWithoutFeedback } from "react-native";
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

          {Platform.OS === "web" ? (
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
          ) : (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            </TouchableWithoutFeedback>
          )}
          
        </CounterProvider>
      </SearchProvider>
    </GestureHandlerRootView>
  )
}
