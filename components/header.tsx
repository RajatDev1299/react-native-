import { createHomeStyles } from "@/assets/styles/home.style";
import useTheme from "@/hooks/useTheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  const { colors } = useTheme();
  const homeStyle = createHomeStyles(colors);

  return (
    <View style={homeStyle.header}>
      <View style={homeStyle.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyle.iconContainer}
        >
          <FontAwesome name="flash" size={28} color={"#fff"} />
        </LinearGradient>
        <View style={homeStyle.titleTextContainer}>
          <Text style={homeStyle.title}>Todos Task 👀</Text>
          <Text style={homeStyle.subtitle}>0 of 5 Completed </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
