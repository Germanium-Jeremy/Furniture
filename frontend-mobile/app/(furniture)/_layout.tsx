import { Stack } from "expo-router";

export default function FurnitureLayout() {
     return (
          <Stack screenOptions={{ headerShown: false }}>
               <Stack.Screen name="index" />
               <Stack.Screen name="furniture" />
               <Stack.Screen name="foldered/*" />
          </Stack>
     )
}