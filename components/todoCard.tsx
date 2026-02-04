import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Todo } from "@/store/useTodosStore";

interface TodoItemProps {
  item: Todo;
  styles: any;
  colors: any;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  styles,
  colors,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <View style={styles.todoItemWrapper}>
      <LinearGradient colors={colors.gradients.surface} style={styles.todoItem}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => onToggle(item.id)}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={
              item.completed ? colors.gradients.success : colors.gradients.muted
            }
            style={[
              styles.checkboxInner,
              {
                borderColor: item.completed ? "transparent" : colors.border,
              },
            ]}
          >
            {item.completed && (
              <FontAwesome name="check" size={18} color="#fff" />
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.todoTextContainer}>
          <Text
            style={[
              styles.todoText,
              item.completed && {
                textDecorationLine: "line-through",
                color: colors.textMuted,
                opacity: 0.6,
              },
            ]}
          >
            {item.title}
          </Text>
          <View style={styles.todoActions}>
            <TouchableOpacity onPress={() => onEdit(item)} activeOpacity={0.8}>
              <LinearGradient
                colors={colors.gradients.warning}
                style={styles.actionButton}
              >
                <FontAwesome name="pencil" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={colors.gradients.danger}
                style={styles.actionButton}
              >
                <FontAwesome name="trash" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TodoItem;
