/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { Modal, Tooltip, Whisper } from "rsuite";

// interface PpStrikeOffModalProps {
//   open: boolean;
//   handleClose: () => void;
// }

const PpStrikeOffModal = ({ ppStatusComment, open, handleClose }: any) => {
  return (
    <>
      <Modal overflow={true} size="md" open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title className="font-bold text-lg">
            PP/Strike off status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-3 pr-4">
          {ppStatusComment?.length > 0 ? (
            ppStatusComment?.map((comment: any) => (
              <div
                key={comment?.ppStatusId}
                className="border rounded-lg shadow-sm p-4 bg-slate-50"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-xs border px-2 rounded font-semibold">{`${comment?.profile?.firstName} ${comment?.profile?.lastName}`}</p>
                    <span className="w-1 mt-0.5 h-1 bg-slate-500 rounded-full "></span>

                    <Whisper
                      placement="top"
                      controlId="control-id-hover"
                      trigger="hover"
                      speaker={
                        <Tooltip>
                          {moment(comment?.createdAt).format("LLL")}
                        </Tooltip>
                      }
                    >
                      <p className="text-[12px] cursor-help">
                        {moment(comment?.createdAt).fromNow()}
                      </p>
                    </Whisper>
                  </div>
                  <p className="font-medium">{comment?.ppStatusComment}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No Comment Found</div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PpStrikeOffModal;
