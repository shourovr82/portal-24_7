/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { Modal, Tooltip, Whisper } from "rsuite";

const LdCpAopModal = ({ LdCpAopComment, open, handleClose }: any) => {
  return (
    <>
      <Modal
        overflow={true}
        backdrop="static"
        size="md"
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="font-bold text-lg">
            LD/CP/AOP Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-3 pr-4">
          {LdCpAopComment?.length > 0 ? (
            LdCpAopComment?.map((ld: any) => (
              <div
                key={ld.ldCpAopStatusId}
                className="border rounded-lg shadow-sm p-4 bg-slate-50"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-xs border px-2 rounded font-semibold">{`${ld?.profile?.firstName} ${ld?.profile?.lastName}`}</p>
                    <span className="w-1 mt-0.5 h-1 bg-slate-500 rounded-full "></span>
                    <Whisper
                      placement="top"
                      controlId="control-id-hover"
                      trigger="hover"
                      speaker={
                        <Tooltip>{moment(ld?.createdAt).format("LLL")}</Tooltip>
                      }
                    >
                      <p className="text-[12px] cursor-help">
                        {moment(ld?.createdAt).fromNow()}
                      </p>
                    </Whisper>
                  </div>
                  <p className=" text-md  font-medium">
                    {ld?.ldCpAopStatusComment}
                  </p>
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

export default LdCpAopModal;
