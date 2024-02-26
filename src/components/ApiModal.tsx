import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import ApiForm from "./ApiForm";

export default function ApiModal({ open, setOpen, formData, isEdit }) {
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
                <ApiForm
                  isEdit={isEdit}
                  formData={formData}
                  onCancel={setOpen}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
