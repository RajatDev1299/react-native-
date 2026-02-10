import { createHomeStyles } from "@/assets/styles/home.style";
import EmptyState from "@/components/emptyState";
import Header from "@/components/header";
import LoadingSpinner from "@/components/loadingSpinner";
import TodoItem from "@/components/todoCard";
import TodoInput from "@/components/todoInput";
import useTheme from "@/hooks/useTheme";
import { Todo, useTodoStore } from "@/store/useTodosStore";

import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect } from "react";
import { Alert, FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useTodoStore((s) => s.todos);
  const loading = useTodoStore((s) => s.loading);
  const addTodo = useTodoStore((s) => s.addTodo);
  const hydrate = useTodoStore((s) => s.hydrate);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const setTodoItem = useTodoStore((s) => s.setTodoItem);
  const isEdit = useTodoStore((s) => s.isEdit);

  const handleDeleteTodo = async (id: string) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTodo(id) },
    ]);
  };

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => (
      <TodoItem
        item={item}
        onToggle={toggleTodo}
        onDelete={handleDeleteTodo}
        onEdit={setTodoItem}
      />
    ),
    [toggleTodo, deleteTodo],
  );
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput onAddTodo={addTodo} />
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={todos}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Index;
