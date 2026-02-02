
import { Todo } from "@/store/useTodosStore";
import React from "react";
import { Text, View } from "react-native";

const TodoCard = ({ data }: { data: Todo }) => {
  return (
    <View>
      <Text>{data.title}</Text>
    </View>
  );
};

export default TodoCard;
