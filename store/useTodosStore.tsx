import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "ZUSTAND_TODOS";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  loading: boolean;

  hydrate: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  editTodo: (id: string, title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: true,

  // 🔹 Load from storage
  hydrate: async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    set({
      todos: data ? JSON.parse(data) : [],
      loading: false,
    });
  },

  // 🔹 CREATE
  addTodo: async (title) => {
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
    };

    const updated = [newTodo, ...get().todos];
    set({ todos: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  // 🔹 TOGGLE STATUS
  toggleTodo: async (id) => {
    const updated = get().todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    set({ todos: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  // 🔹 EDIT TITLE (NEW)
  editTodo: async (id, title) => {
    if (!title.trim()) return;

    const updated = get().todos.map((todo) =>
      todo.id === id ? { ...todo, title: title.trim() } : todo,
    );

    set({ todos: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  // 🔹 DELETE
  deleteTodo: async (id) => {
    const updated = get().todos.filter((todo) => todo.id !== id);
    set({ todos: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
}));
