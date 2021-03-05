import { ChakraProvider, Container, theme } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { TodoForm } from "./components/todoForm";
import { TodoList } from "./components/todoList";
import { VideoModal } from "./components/videoModal";
import { CountProvider } from "./utils/countContext";
import { queryClient } from "./utils/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CountProvider>
          <Container pt={4}>
            <VideoModal />
            <TodoForm />
            <TodoList />
          </Container>
        </CountProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
