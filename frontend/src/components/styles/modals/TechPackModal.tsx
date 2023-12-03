/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { FaRegFilePdf } from "react-icons/fa6";
import { Button, Modal, Tooltip, Whisper } from "rsuite";
import { fileUrlKey } from "../../../config/envConfig";

const TechPackModal = ({ tackPacks, open, handleClose }: any) => {
  return (
    <>
      <Modal size="md" open={open} backdrop="static" onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className="font-bold text-lg pl-3">
            Tack Pack
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-2 pr-3">
          {tackPacks ? (
            <div className="border rounded-lg shadow-sm px-4 py-2 bg-slate-50">
              <div className="flex flex-col ">
                <div className="flex items-center  justify-between ">
                  <div className="flex gap-2 items-center">
                    <p className="text-xs border px-2 rounded font-semibold">
                      {tackPacks?.profile?.firstName}{" "}
                      {tackPacks?.profile?.lastName}
                    </p>
                    <span className="w-1 mt-0.5 h-1 bg-slate-500 rounded-full "></span>
                    <Whisper
                      placement="top"
                      controlId="control-id-hover"
                      trigger="hover"
                      speaker={
                        <Tooltip>
                          {moment(tackPacks?.updatedAt).format("LLL")}
                        </Tooltip>
                      }
                    >
                      <p className="text-[12px] cursor-help">
                        {moment(tackPacks?.updatedAt).fromNow()}
                      </p>
                    </Whisper>
                  </div>
                  <div>
                    <Button
                      onClick={() =>
                        window.open(`${fileUrlKey()}/${tackPacks?.tackFile}`)
                      }
                      className="flex border hover:text-[#0284c7] border-transparent hover:border-gray-200 hover:border px-2 py-2 rounded-lg gap-2 items-center text-[#0284c7] font-bold text-sm"
                    >
                      <FaRegFilePdf size={20} className="text-[#0284c7]" /> View
                      PDF
                    </Button>
                  </div>
                </div>
                <div className="flex items-center  justify-between gap-3">
                  <p className=" text-md  font-medium  overflow-hidden text-ellipsis">
                    {tackPacks?.tackPackComment}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h2 className="text-center font-semibold">No Tack Pack Added...</h2>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TechPackModal;
