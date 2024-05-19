import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while fetch resources
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  let [fontsLoaded, fontError] = useFonts({
    "SyneRegular": require("../assets/fonts/Syne-Regular.ttf"),
    "SyneMedium": require("../assets/fonts/Syne-Medium.ttf"),
   "SyneSemiBold": require("../assets/fonts/Syne-SemiBold.ttf"),
    "SyneBold": require("../assets/fonts/Syne-Bold.ttf"),
    "SyneExtraBold": require("../assets/fonts/Syne-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // After fonts are loaded, wait for 1 seconds before setting the app as ready
      setTimeout(() => {
        setAppIsReady(true);
      }, 1000);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (appIsReady) {
      // When the app is ready, hide the splash screen
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Stack />;
};

export default RootLayout;
