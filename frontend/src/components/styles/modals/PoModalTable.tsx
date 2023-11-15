/* eslint-disable @typescript-eslint/no-explicit-any */

import { Modal } from "rsuite";
import PoTableForStyle from "../PoTableForStyle";

const PoModalTable = ({ orders, open, handleClose }: any) => {
  return (
    <>
      <Modal
        size={orders?.length > 0 ? "full" : "sm"}
        open={open}
        onClose={handleClose}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title className="font-bold text-lg">PO NO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orders?.length > 0 ? (
            <PoTableForStyle orders={orders} />
          ) : (
            <div className="flex items-center justify-center">
              No Orders are added
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PoModalTable;
