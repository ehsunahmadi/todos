import { Box, Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHighCountVideo } from "../hooks/useHighCountVideo";
import { createTodo } from "../utils/apiProviders";

export const TodoForm = () => {
  const { prefetch } = useHighCountVideo();

  const [content, setContent] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (content.length) {
      try {
        await createTodo(content);
        setContent("");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (content.length) {
      prefetch();
    }
  }, [content.length, prefetch]);

  return (
    <Box mb={2}>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={false}>
          <Flex justify="space-between" alignItems="center">
            <Box flex="1">
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name="content"
                id="content"
                placeholder="todo..."
              />
            </Box>
            <Button ml={4} colorScheme="teal" isLoading={false} type="submit">
              Add
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};
