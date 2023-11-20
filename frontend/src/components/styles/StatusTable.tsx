/* eslint-disable @typescript-eslint/no-explicit-any */

// import moment from "moment";
import { GrFormView } from "react-icons/gr";
import PpStrikeOffModal from "./PpStrikeOffModal";
import { useState } from "react";
import BulkProductionModal from "./BulkProductionModal";
import LdCpAopModal from "./LdCpAopModal";

export default function StatusTable({ rowData }: any) {
  // pp strike
  const [ppStrickOpen, setPpStrickOpen] = useState(false);
  const [ppStatusComment, setPpStatusComment] = useState(null);
  const ppHandleOpen = () => setPpStrickOpen(true);
  const ppHandleClose = () => setPpStrickOpen(false);
  const ppAllComments = (PPStrikeOffStatus: []) => {
    setPpStatusComment(PPStrikeOffStatus as any);
    ppHandleOpen();
  };

  // bulk production
  const [bulkProductionComment, setBulkProductionComment] = useState(null);
  const [bulkProductionOpen, setBulkProductionOpen] = useState(false);
  const handleBulkProductionOpen = () => setBulkProductionOpen(true);
  const handleBulkProductionClose = () => setBulkProductionOpen(false);

  const bulkProductionAllComments = (BulkProductionStatus: []) => {
    setBulkProductionComment(BulkProductionStatus as any);
    handleBulkProductionOpen();
  };

  // LdCpAop Status
  const [LdCpAopComment, setLdCpAopComment] = useState(null);
  const [LdCpAopCommentOpen, setLdCpAopCommentOpen] = useState(false);
  const handleLdCpAopOpen = () => setLdCpAopCommentOpen(true);
  const handleLdCpAopClose = () => setLdCpAopCommentOpen(false);

  const bulkLdCpAopComments = (ldCpAopStatus: []) => {
    setLdCpAopComment(ldCpAopStatus as any);
    handleLdCpAopOpen();
  };

  return (
    <>
      <PpStrikeOffModal
        ppStatusComment={ppStatusComment}
        open={ppStrickOpen}
        handleClose={ppHandleClose}
      />
      <BulkProductionModal
        bulkProductionComment={bulkProductionComment}
        open={bulkProductionOpen}
        handleClose={handleBulkProductionClose}
      />
      <LdCpAopModal
        LdCpAopComment={LdCpAopComment}
        open={LdCpAopCommentOpen}
        handleClose={handleLdCpAopClose}
      />
      <div className="px-8">
        <div className="mt-1 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-[#F4F6F8]">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-[#637581] sm:pl-6 border-r"
                      >
                        LD/CP/AOP Strike Off Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-[#637581] border-r"
                      >
                        PP Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-[#637581]"
                      >
                        Bulk production Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis py-4 pl-4 pr-3 text-sm text-black font-medium sm:pl-6 border-r">
                        {rowData.ldCpAopStatus.length === 0
                          ? "No Status Yet"
                          : rowData.ldCpAopStatus[0]?.ldCpAopStatusComment}
                        <div className="flex justify-center mt-1 items-center">
                          <GrFormView size={20} />
                          <button
                            className="text-blue-600 hover:underline underline-offset-2"
                            onClick={() =>
                              bulkLdCpAopComments(rowData.ldCpAopStatus)
                            }
                          >
                            View
                          </button>
                        </div>
                      </td>
                      <td className="max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis px-3 py-4 text-sm text-black font-medium border-r">
                        {rowData.PPStrikeOffStatus.length === 0
                          ? "No Status Yet"
                          : rowData.PPStrikeOffStatus[0]?.ppStatusComment}
                        <div className="flex justify-center mt-1 items-center">
                          <GrFormView size={20} />
                          <button
                            className="text-blue-600 hover:underline underline-offset-2"
                            onClick={() =>
                              ppAllComments(rowData.PPStrikeOffStatus)
                            }
                          >
                            View
                          </button>
                        </div>
                      </td>
                      <td className="max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis px-3 py-4 text-sm text-black font-medium ">
                        {rowData.BulkProductionStatus.length === 0
                          ? "No Status Yet"
                          : rowData.BulkProductionStatus[0]
                              ?.bulkProductionComment}
                        <div className="flex justify-center mt-1 items-center">
                          <GrFormView size={20} />
                          <button
                            className="text-blue-600 hover:underline underline-offset-2"
                            onClick={() =>
                              bulkProductionAllComments(
                                rowData.BulkProductionStatus
                              )
                            }
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* <div className="flex justify-center items-center h-20">
                      No Courier send
                    </div> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
