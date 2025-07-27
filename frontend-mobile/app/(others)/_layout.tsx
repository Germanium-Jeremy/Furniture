import { Stack } from "expo-router";

export default function OtherPagesFunctions() {
     return (
          <Stack screenOptions={{  headerShown: false }}>
               <Stack.Screen name="special" />
               <Stack.Screen name="contact" />
          </Stack>
     )
}