import { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchHighCountVideo, Video } from "../utils/apiProviders";
import { useTodoCount } from "./useTodoCount";

export const useHighCountVideo = () => {
  const { count } = useTodoCount();

  const fetchable = useMemo(() => count !== 0 && count % 5 === 0, [count]);

  return {
    fetchable,
    query: useQuery<Video, Error>("HighCountVideo", fetchHighCountVideo, {
      enabled: fetchable,
      staleTime: 0,
    }),
  };
};
