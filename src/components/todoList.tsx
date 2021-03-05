import { List } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useTodoCount } from "../hooks/useTodoCount";
import { fetchTodos, Todo } from "../utils/apiProviders";
import { LoadingSpinner, Message } from "./lib";
import { TodoTab } from "./todoTab";

export const TodoList = () => {
  const { data: todoList, status, error } = useQuery<string[], Error>(
    "todoIds",
    async () => {
      try {
        const todos = (await fetchTodos()) || [];
        return Array.isArray(todos) ? todos.map((todo: Todo) => todo?.id) : [];
      } catch (error) {
        throw error;
      }
    }
  );
  const { setCount } = useTodoCount();

  useEffect(() => {
    if (todoList) {
      setCount(todoList.length);
    }
  }, [todoList, setCount]);

  switch (status) {
    case "success":
      return todoList?.length ? (
        <List>
          {todoList.map((id) => (
            <TodoTab id={id} key={id} />
          ))}
        </List>
      ) : (
        <Message
          title="Do something!"
          description="Your todoList is empty."
          status="info"
        />
      );

    case "loading":
      return <LoadingSpinner />;
    case "error":
      return (
        <Message
          title="something went wrong!"
          description={error?.message}
          status="error"
        />
      );
    default:
      return null;
  }
};
