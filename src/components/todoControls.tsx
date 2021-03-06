import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton, UseEditableReturn } from "@chakra-ui/react";
import React from "react";

interface TodoControlsProps extends UseEditableReturn {
  onDelete: () => void;
}

export const TodoControls = ({
  isEditing,
  onSubmit,
  onCancel,
  onEdit,
  onDelete,
}: TodoControlsProps) => {
  return (
    <ButtonGroup justifyContent="center" size="sm">
      {isEditing ? (
        <>
          <IconButton
            aria-label="submit"
            icon={<CheckIcon />}
            onClick={onSubmit}
          />
          <IconButton
            aria-label="cancel"
            icon={<CloseIcon />}
            onClick={onCancel}
          />
        </>
      ) : (
        <>
          <IconButton
            aria-label="edit"
            size="sm"
            icon={<EditIcon />}
            onClick={onEdit}
          />
          <IconButton
            aria-label="delete-button"
            size="sm"
            icon={<DeleteIcon />}
            onClick={onDelete}
          />
        </>
      )}
    </ButtonGroup>
  );
};
