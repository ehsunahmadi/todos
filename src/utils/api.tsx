import * as localForage from "localforage";
import { Todo } from "./apiProviders";
import { v4 as uuidv4 } from "uuid";

export const todosPOST = async (content: string): Promise<string | Error> => {
  const id = uuidv4();
  const createdTodo: Todo = { content, id };
  const oldTodos = await todosGET();
  if (Array.isArray(oldTodos)) {
    localForage.setItem("todos", [...oldTodos, createdTodo]);
    return id;
  }
  return oldTodos as Error;
};

export const todosDELETE = async (id: string): Promise<Error | undefined> => {
  const oldTodos = await todosGET();
  if (Array.isArray(oldTodos)) {
    localForage.setItem(
      "todos",
      oldTodos.filter((todo: Todo) => todo.id !== id)
    );
    return;
  }
  return oldTodos as Error;
};

export const todosUPDATE = async (id: string, data: { content: string }) => {
  const oldTodos = await todosGET();
  if (Array.isArray(oldTodos)) {
    localForage.setItem(
      "todos",
      oldTodos.map((todo: Todo) =>
        todo.id === id ? { ...todo, ...data } : todo
      )
    );
    return;
  }
  return oldTodos as Error;
};

export const todosGET = async (id?: string): Promise<Todo[]> => {
  const todos: Todo[] | null = await localForage.getItem("todos");
  if (id) {
    return todos?.filter((todo: Todo) => todo.id === id) ?? [];
  }
  return todos ?? [];
};
