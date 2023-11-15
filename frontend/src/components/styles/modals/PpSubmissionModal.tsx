/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { Modal } from "rsuite";

const PpSubmissionModal = ({ ppSubmissionData, open, handleClose }: any) => {
  return (
    <>
      <Modal size="md" open={open} backdrop="static" onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className="font-bold text-lg text-left ">
            PP Submission of {ppSubmissionData?.styleNo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-[#F4F6F8]">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#637581] sm:pl-6 border-r"
                >
                  Factory Submission Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                >
                  Factory Submitted
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                >
                  Delay Days
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="border">
                <td
                  className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 border-r ${
                    ppSubmissionData?.delayDays > 0
                      ? "text-red-600"
                      : "text-black "
                  } `}
                >
                  {ppSubmissionData?.factorySubmissionDate
                    ? moment(ppSubmissionData?.factorySubmissionDate).format(
                        "LL"
                      )
                    : "---"}
                </td>
                <td
                  className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 border-r ${
                    ppSubmissionData?.delayDays > 0
                      ? "text-red-600"
                      : "text-black "
                  } `}
                >
                  {ppSubmissionData?.factorySubmittedDate
                    ? moment(ppSubmissionData?.factorySubmittedDate).format(
                        "LL"
                      )
                    : "---"}
                </td>
                <td
                  className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 border-r ${
                    ppSubmissionData?.delayDays > 0
                      ? "text-red-600"
                      : "text-black "
                  } `}
                >
                  {ppSubmissionData?.delayDays ?? "--"}
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PpSubmissionModal;
