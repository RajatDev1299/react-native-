import { createSettingsStyles } from "@/assets/styles/setting.style";
import useTheme from "@/hooks/useTheme";
import { useTodoStore } from "@/store/useTodosStore";
import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const ProgressStats = () => {
  const { colors } = useTheme();
  const settingStyle = createSettingsStyles(colors);
  const todos = useTodoStore((s) => s.todos);
  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const activeTodo = totalTodos - completedTodos || 0;
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingStyle.section}
    >
      <Text style={settingStyle.sectionTitle}>Progress Stats</Text>
      <View style={settingStyle.statsContainer}>
        {/* total todos */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyle.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={settingStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingStyle.statIcon}
            >
              <Ionicons size={28} colors={"#fff"} name="list" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingStyle.statNumber}>{totalTodos}</Text>
            <Text style={settingStyle.statLabel}>Total todos</Text>
          </View>
        </LinearGradient>

        {/* completed todos */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyle.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={settingStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.success}
              style={settingStyle.statIcon}
            >
              <Ionicons name="checkmark-circle" size={28} colors={"#fff"} />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingStyle.statNumber}>{completedTodos}</Text>
            <Text style={settingStyle.statLabel}>Completed todos</Text>
          </View>
        </LinearGradient>

        {/* active todos */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyle.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={settingStyle.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={settingStyle.statIcon}
            >
              <Ionicons name="time" size={28} colors={"#fff"} />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingStyle.statNumber}>{activeTodo}</Text>
            <Text style={settingStyle.statLabel}>Active todos</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default ProgressStats;
