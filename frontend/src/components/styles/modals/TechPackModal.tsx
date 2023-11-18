/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { FaRegFilePdf } from "react-icons/fa6";
import { Button, Modal, Tooltip, Whisper } from "rsuite";
import { imageUrlKey } from "../../../config/envConfig";

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
          {tackPacks?.length ? (
            tackPacks?.map((tackPack: any) => (
              <div
                key={tackPack?.tackpackId}
                className="border rounded-lg shadow-sm px-4 py-2 bg-slate-50"
              >
                <div className="flex flex-col ">
                  <div className="flex items-center  justify-between ">
                    <div className="flex gap-2 items-center">
                      <p className="text-xs border px-2 rounded font-semibold">
                        {tackPack?.profile?.firstName}{" "}
                        {tackPack?.profile?.lastName}
                      </p>
                      <span className="w-1 mt-0.5 h-1 bg-slate-500 rounded-full "></span>
                      <Whisper
                        placement="top"
                        controlId="control-id-hover"
                        trigger="hover"
                        speaker={
                          <Tooltip>
                            {moment(tackPack?.createdAt).format("LLL")}
                          </Tooltip>
                        }
                      >
                        <p className="text-[12px] cursor-help">
                          {moment(tackPack?.createdAt).fromNow()}
                        </p>
                      </Whisper>
                    </div>
                    <div>
                      <Button
                        onClick={() =>
                          window.open(`${imageUrlKey()}/${tackPack?.tackFile}`)
                        }
                        className="flex border hover:text-[#0284c7] border-transparent hover:border-gray-200 hover:border px-2 py-2 rounded-lg gap-2 items-center text-[#0284c7] font-bold text-sm"
                      >
                        <FaRegFilePdf size={20} className="text-[#0284c7]" />{" "}
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center  justify-between gap-3">
                    <p className=" text-md  font-medium  overflow-hidden text-ellipsis">
                      {tackPack?.tackPackComment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center font-semibold">No Tack Pack Added...</h2>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TechPackModal;
