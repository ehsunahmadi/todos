import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  ListItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTodo } from "../hooks/useTodo";
import { deleteTodo, updateTodo } from "../utils/apiProviders";
import { LoadingSpinner, Message } from "./lib";
import TodoControls from "./todoControls";

interface TodoTabProps {
  id: string;
}

export const TodoTab = ({ id }: TodoTabProps) => {
  const { data: todo, status, error } = useTodo(id);
  const [content, setContent] = useState(todo?.content);

  const onDelete = async () => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async () => {
    if (!!content && !!content.trim()) {
      try {
        await updateTodo(id, { content });
      } catch (error) {
        console.error(error);
      }
    }
  };
  switch (status) {
    case "success":
      return !!todo ? (
        <ListItem
          backgroundColor="teal.100"
          px={4}
          py={2}
          mb={1}
          borderRadius={10}
        >
          <Editable
            value={content}
            onChange={(nextValue) => setContent(nextValue)}
            textAlign="center"
            defaultValue={todo.content}
            onSubmit={onUpdate}
            fontSize="2xl"
            isPreviewFocusable={false}
            submitOnBlur={false}
          >
            {(props) => (
              <Flex justify="space-between" alignItems="center">
                <Box>
                  <EditablePreview />
                  <EditableInput />
                </Box>
                <TodoControls
                  {...props}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </Flex>
            )}
          </Editable>
        </ListItem>
      ) : null;
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
