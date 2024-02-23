import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import ApiForm from "./ApiForm";

export default function ApiModal({ open, setOpen }) {
  const isEdit = false;

  return (
    <>
      <Modal isOpen={open} onOpenChange={setOpen} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEdit ? "Edit Api" : "Add Api"}
              </ModalHeader>
              <ModalBody>
                <ApiForm onCancel={setOpen} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
