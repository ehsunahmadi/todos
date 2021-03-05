import axios from "axios";
import { queryClient } from "./queryClient";
import * as api from "./api";

export interface Todo {
  id: string;
  content: string;
}

export interface Video {
  visit_cnt: number;
  preview_src: string;
  title: string;
}

export const fetchTodos = async (id?: string): Promise<Todo[]> => {
  const todos = await api.todosGET(id);
  todos.map((todo: Todo) => queryClient.setQueryData(["todo", id], todo));
  return todos;
};

export const createTodo = async (content: string): Promise<string | Error> => {
  const res = await api.todosPOST(content);
  queryClient.invalidateQueries("todoIds");
  return res;
};

export const deleteTodo = async (id: string): Promise<Error | undefined> => {
  const res = api.todosDELETE(id);
  const cachedIds: string[] | undefined = queryClient.getQueryData("todoIds");
  queryClient.setQueryData(
    "todoIds",
    cachedIds?.filter((todoId) => todoId !== id)
  );
  return res;
};

export const updateTodo = async (id: string, data: { content: string }) => {
  const todo = await api.todosUPDATE(id, data);
  queryClient.setQueryData(["todo", id], { id, data: data.content });
  return todo;
};

export const fetchHighCountVideo = async (): Promise<Video> => {
  const {
    data: { data },
  } = await axios.get(
    "http://api.aparat.com/fa/v1/video/video/mostViewedVideos"
  );
  const highestCountVideo = data.reduce((cur: any, prev: any) =>
    cur.attributes.visit_cnt < prev.attributes.visit_cnt ? cur : prev
  );
  const { visit_cnt, preview_src, title } = highestCountVideo.attributes;
  const video: Video = { visit_cnt, preview_src, title };
  return video;
};
