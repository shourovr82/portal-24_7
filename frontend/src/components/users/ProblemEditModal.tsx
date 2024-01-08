/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "rsuite";

const ProblemEditModal = ({ open, handleClose, modalEditData }: any) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>hello</Modal.Body>
      </Modal>
    </div>
  );
};

export default ProblemEditModal;
