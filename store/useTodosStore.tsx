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

  startLoading: () => void;
  stopLoading: () => void;
  hydrate: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  editTodo: (id: string, title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearTodos: () => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  hydrate: async () => {
    get().startLoading();

    const data = await AsyncStorage.getItem(STORAGE_KEY);
    set({ todos: data ? JSON.parse(data) : [] });

    get().stopLoading();
  },

  startLoading: () => set({ loading: true }),
  stopLoading: () => set({ loading: false }),

  addTodo: async (title) => {
    if (!title.trim()) return;

    const updated = [
      {
        id: Date.now().toString(),
        title: title.trim(),
        completed: false,
      },
      ...get().todos,
    ];

    set({ todos: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  toggleTodo: async (id) => {
    const updated = get().todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );

    set({ todos: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  editTodo: async (id, title) => {
    if (!title.trim()) return;

    const updated = get().todos.map((t) =>
      t.id === id ? { ...t, title: title.trim() } : t,
    );

    set({ todos: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  deleteTodo: async (id) => {
    const updated = get().todos.filter((t) => t.id !== id);

    set({ todos: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  clearTodos: async () => {
    set({ todos: [] });
    await AsyncStorage.removeItem(STORAGE_KEY);
  },
}));
