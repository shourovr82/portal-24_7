/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "rsuite";
import CourierTableV2 from "./CourierTableV2";

const CourierModal = ({ courier, open, handleClose }: any) => {
  return (
    <>
      <Modal size="lg" open={open} backdrop="static" onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className="font-bold text-lg pl-7">Courier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CourierTableV2 courier={courier} />
          {/* <CourierTable /> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CourierModal;
