/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { Modal, Tooltip, Whisper } from "rsuite";
// interface BulkProductionModalProps {
//   bulkProductionComment: any[];
//   open: boolean;
//   handleClose: () => void;
// }
const BulkProductionModal = ({
  bulkProductionComment,
  open,
  handleClose,
}: any) => {
  return (
    <>
      <Modal overflow={true} size="md" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className="font-bold text-lg">
            Bulk production Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-3 pr-4">
          {bulkProductionComment?.length > 0 ? (
            bulkProductionComment?.map((bulk: any) => (
              <div
                key={bulk.bulkProductionId}
                className="border rounded-lg shadow-sm p-4 bg-slate-50"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-xs border px-2 rounded font-semibold">{`${bulk?.profile?.firstName} ${bulk?.profile?.lastName}`}</p>
                    <span className="w-1 mt-0.5 h-1 bg-slate-500 rounded-full "></span>

                    <Whisper
                      placement="top"
                      controlId="control-id-hover"
                      trigger="hover"
                      speaker={
                        <Tooltip>
                          {moment(bulk?.createdAt).format("LLL")}
                        </Tooltip>
                      }
                    >
                      <p className="text-[12px] cursor-help">
                        {moment(bulk?.createdAt).fromNow()}
                      </p>
                    </Whisper>
                  </div>
                  <p className=" font-medium">{bulk?.bulkProductionComment}</p>
                </div>
              </div>
            ))
          ) : (
            <div> No Comment Found !!! </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BulkProductionModal;
