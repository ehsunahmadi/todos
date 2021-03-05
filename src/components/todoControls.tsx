import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";

const TodoControls = ({
  isEditing,
  onSubmit,
  onCancel,
  onEdit,
  onDelete,
}: any) => {
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

export default TodoControls;
