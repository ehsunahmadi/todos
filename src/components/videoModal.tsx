import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHighCountVideo } from "../hooks/useHighCountVideo";
import { LoadingSpinner, Message } from "./lib";

const videoStyle = { width: 500, maxWidth: "85%" };

export const VideoModal = () => {
  const { query, fetchable } = useHighCountVideo();
  const { data: video, status, error } = query;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (fetchable) {
      onOpen();
    }
  }, [fetchable, onOpen]);

  switch (status) {
    case "success":
      return !!video ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{video.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <video
                  style={videoStyle}
                  src={video.preview_src}
                  controls
                  autoPlay
                />
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Message
          title="sorry!"
          description="We tried to fetch some video for you but the external api didn't return anything."
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
