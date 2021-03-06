import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { createTodo } from "../utils/apiProviders";

export const TodoForm = () => {
  const [content, setContent] = useState("");
  const toast = useToast();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (content.length) {
      try {
        await createTodo(content);
        setContent("");
      } catch (error) {
        toast({
          title: "something went wrong & todo wasn't created.",
          description: error.message,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
    }
  };

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
