import { Stack } from "expo-router";
import { CounterProvider } from "./context/counter-context";

export default function RootLayout() {
  return ( 
    <CounterProvider>
      <Stack />
    </CounterProvider>
  )
}
