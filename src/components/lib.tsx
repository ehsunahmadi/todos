import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertStatus,
  AlertTitle,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";

interface MessageProps {
  title: string;
  description?: string;
  status: AlertStatus;
}

export const Message = ({ title, description, status }: MessageProps) => {
  return (
    <Box my={2}>
      <Alert status={status} borderRadius={10}>
        <AlertIcon />
        <AlertTitle mr={2}>{title}</AlertTitle>
        {!!description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    </Box>
  );
};

export const LoadingSpinner = () => {
  return (
    <Center my={2}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.400"
        size="xl"
      />
    </Center>
  );
};
