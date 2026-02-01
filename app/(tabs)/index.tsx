import { createHomeStyles } from "@/assets/styles/home.style";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { Pressable, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Index = () => {
  const { colors, toggleDarkMode } = useTheme();
  const homeStyles = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Text>Home</Text>
        <Pressable onPress={toggleDarkMode}>
          <Text>switch to dark</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Index;
