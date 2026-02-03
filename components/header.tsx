import { createHomeStyles } from "@/assets/styles/home.style";
import useTheme from "@/hooks/useTheme";
import { useTodoStore } from "@/store/useTodosStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  const { colors } = useTheme();
  const homeStyle = createHomeStyles(colors);
  const todos = useTodoStore((s) => s.todos);

  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.completed).length;

  const completionPercentage =
    totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

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
          <Text style={homeStyle.subtitle}>
            {completedTodos} of {totalTodos} Completed{" "}
          </Text>
        </View>
      </View>
      <View style={homeStyle.progressContainer}>
        <View style={homeStyle.progressBarContainer}>
          <View style={homeStyle.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[
                homeStyle.progressFill,
                { width: `${completionPercentage}%` },
              ]}
            />
          </View>
          <Text style={homeStyle.progressText}>
            {Math.round(completionPercentage)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
