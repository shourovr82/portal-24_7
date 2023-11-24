/* eslint-disable @typescript-eslint/no-explicit-any */

import { IconButton, Modal } from "rsuite";
import moment from "moment";
import { FaFileDownload } from "react-icons/fa";
import { fileUrlKey } from "../../../config/envConfig";

const PoModalTable = ({ orders, open, handleClose }: any) => {
  return (
    <>
      <Modal
        className="font-Inter"
        size={orders?.length > 0 ? "lg" : "sm"}
        open={open}
        onClose={handleClose}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title className="font-bold text-lg">PO NO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orders?.length > 0 ? (
            <div className="">
              <div className="mt-1 flex flex-col">
                <div className="-my-2  overflow-x-auto ">
                  <div className="inline-block min-w-full py-2 align-middle md:px-0.5 ">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      {orders?.length && (
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-[#F4F6F8]">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-2 pr-3 text-left text-sm font-semibold text-[#637581] sm:pl-3 border-r"
                              >
                                Style No
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                              >
                                PO NO
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                              >
                                No of Pack
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                              >
                                Total Pack
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                              >
                                Total PC
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                              >
                                FRI Date
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                              >
                                Buyer ETD
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                              >
                                Factory ETD
                              </th>

                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                              >
                                Port Name
                              </th>
                              <th
                                scope="col"
                                className="px-3  py-3.5 text-center text-sm font-semibold text-[#637581] border-r"
                              >
                                File
                              </th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-gray-200 bg-white">
                            {orders?.map((order: any) => (
                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-black font-medium sm:pl-6 border-r">
                                  {order.styleNo}
                                </td>
                                <td className="whitespace-nowrap px-2 py-4 text-sm text-black font-medium border-r">
                                  {order.orderNo}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                  {order.noOfPack}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                  {order.totalPack?.toLocaleString()}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                  {order.totalPc?.toLocaleString()}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                  {moment(order?.friDate).format("DD-MM-YYYY")}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                  {moment(order?.buyerEtd).format("DD-MM-YYYY")}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                  {moment(order?.factoryEtd).format(
                                    "DD-MM-YYYY"
                                  )}
                                </td>

                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                  {order?.Port?.portName ?? "--"}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black flex justify-center font-medium">
                                  {order?.orderFile ? (
                                    <IconButton
                                      onClick={() =>
                                        window.open(
                                          `${fileUrlKey()}/${order?.orderFile}`
                                        )
                                      }
                                      icon={
                                        <FaFileDownload
                                          className="font-bold text-[#5a5a5ab6]"
                                          size={20}
                                        />
                                      }
                                      color="blue"
                                      appearance="default"
                                      circle
                                    />
                                  ) : (
                                    "-"
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
