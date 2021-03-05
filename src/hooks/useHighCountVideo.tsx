import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { fetchHighCountVideo, Video } from "../utils/apiProviders";
import { queryClient } from "../utils/queryClient";
import { useTodoCount } from "./useTodoCount";

export const useHighCountVideo = () => {
  const { count } = useTodoCount();
  const hasCount = count !== 0;

  const queryKey: "HighCountVideo" = "HighCountVideo";

  const fetchable = useMemo(() => hasCount && count % 5 === 0, [
    count,
    hasCount,
  ]);
  const prefetchable = useMemo(
    () => hasCount && count % 4 === 0 && !fetchable,
    [count, fetchable, hasCount]
  );

  const prefetch = useCallback(() => {
    if (prefetchable) {
      queryClient.prefetchQuery(queryKey, { staleTime: 30 * 1000 });
    }
  }, [prefetchable]);

  return {
    prefetch,
    query: useQuery<Video, Error>(queryKey, fetchHighCountVideo, {
      enabled: fetchable,
    }),
  };
};
