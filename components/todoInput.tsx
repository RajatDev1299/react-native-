import { createHomeStyles } from "@/assets/styles/home.style";
import useTheme from "@/hooks/useTheme";
import { useTodoStore } from "@/store/useTodosStore";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface TodoInputProps {
  onAddTodo: (title: string) => void;
}

const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  const { colors } = useTheme();
  const { startLoading, stopLoading, isEdit, editTodo, setTodoItem } =
    useTodoStore();
  const homeStyle = createHomeStyles(colors);
  const [data, setData] = useState<string>("");

  const handleTodo = async () => {
    if (!data.trim()) return;

    try {
      startLoading();

      if (isEdit) {
        await editTodo(isEdit.id, data.trim());
        setTodoItem(null); // exit edit mode
      } else {
        await onAddTodo(data.trim());
      }

      setData("");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (isEdit) {
      setData(isEdit.title);
    } else {
      setData("");
    }
  }, [isEdit]);

  return (
    <View style={homeStyle.inputSection}>
      <View style={homeStyle.inputWrapper}>
        <TextInput
          value={data}
          onChangeText={setData}
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={handleTodo}
          style={homeStyle.input}
          placeholder="What need to be done"
        />
        <TouchableOpacity
          onPress={handleTodo}
          disabled={!data.trim()}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              !data.trim() ? colors.gradients.primary : colors.gradients.muted
            }
            style={[
              homeStyle.addButton,
              !data.trim() && homeStyle.addButtonDisabled,
            ]}
          >
            <FontAwesome name="plus" size={28} color={"#ffffff"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
