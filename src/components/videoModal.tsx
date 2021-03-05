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

export const VideoModal = () => {
  const { query } = useHighCountVideo();
  const { data: video, status, error } = query;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (video) {
      onOpen();
    }
  }, [video, onOpen]);

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
                  style={{ width: 500, maxWidth: "85%" }}
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
