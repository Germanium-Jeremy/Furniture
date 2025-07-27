import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserContextProvider } from "@/context/AuthContext";

// This is the prefix for your deep links
const prefix = Linking.createURL("/");

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    // Handle deep links when the app is opened from a link
    const handleDeepLink = (event: { url: string }) => {
      const { path, queryParams } = Linking.parse(event.url);
      
      // Handle password reset deep link
      if (path === '/(auth)/reset' && queryParams?.token) {
        // Navigate to your reset password screen with the token
        router.push({
          pathname: "/(auth)/reset",
          params: { token: queryParams.token }
        });
      }
    };

    // Add event listener for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle the case where the app is opened from a deep link when it's already running
    const getInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const { path, queryParams } = Linking.parse(initialUrl);
        if (path === '/(auth)/reset' && queryParams?.token) {
          router.push({
            pathname: "/(auth)/reset",
            params: { token: queryParams.token }
          });
        }
      }
    };

    getInitialURL();

    // Clean up the event listener
    return () => {
      subscription.remove();
    };
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <UserContextProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(furniture)" options={{ headerShown: false }} />
          <Stack.Screen name="(others)" options={{ headerShown: false }} />
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="(auth)/reset" 
            options={{ 
              title: "Reset Password",
              presentation: "modal" // Optional: shows as a modal
            }} 
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </UserContextProvider>
    </ThemeProvider>
  );
}