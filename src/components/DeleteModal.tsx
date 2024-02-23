import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function DeleteModal({ render, func, onConfirm }) {
  return (
    <>
      <Modal size={"md"} isOpen={render} onClose={() => func(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you Sure ?
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this API? This action cannot
                  be undone and may affect any applications relying on it.
                  Proceed with caution.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={onConfirm}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
