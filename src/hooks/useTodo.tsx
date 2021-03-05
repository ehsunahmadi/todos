import { useQuery } from "react-query";
import { fetchTodos, Todo } from "../utils//apiProviders";

export const useTodo = (id: string, options?: {}) => {
  return useQuery<Todo, Error>(
    ["todo", id],
    async () => {
      try {
        const todos = fetchTodos(id);
        return Array.isArray(todos) ? todos[0] : null;
      } catch (error) {
        throw Error;
      }
    },
    options
  );
};
