import { createHomeStyles } from "@/assets/styles/home.style";
import Header from "@/components/header";
import TodoCard from "@/components/todoCard";
import TodoInput from "@/components/todoInput";
import useTheme from "@/hooks/useTheme";
import { useTodoStore } from "@/store/useTodosStore";

import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const { todos, loading, addTodo, hydrate } = useTodoStore();
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput onAddTodo={addTodo} />
        {!loading &&
          todos.map((data) => <TodoCard key={data.id} data={data} />)}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Index;
