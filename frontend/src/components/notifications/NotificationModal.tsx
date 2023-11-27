/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { useGetAllNotificationQuery } from "../../redux/features/notifications/notificationApi";
import { fileUrlKey } from "../../config/envConfig";
// import { cellCss, headerCss } from "../styles/CommonCss";
// import { fileUrlKey } from "../../config/envConfig";
// const { Column, HeaderCell, Cell } = Table;

const NotificationModal = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<any | null>(null);
  const { data } = useGetAllNotificationQuery(null);

  useEffect(() => {
    if (data && data.data && data.data.length > 0) {
      const currentDate = new Date();
      const dataToShow = data.data.filter((item: any) => {
        if (item.factorySubmissionDate) {
          const factorySubmissionDate = new Date(item.factorySubmissionDate);
          const timeDiff =
            factorySubmissionDate.getTime() - currentDate.getTime();
          const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
          return hoursDiff <= 48;
        }
        return false;
      });

      if (dataToShow.length > 0) {
        setOpen(true);
        setModalData(dataToShow);
      }
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setModalData(null);
  };

  // const renderImageView = (rowData: any) => (
  //   <img
  //     src={`${fileUrlKey()}/${rowData.Styles?.image}`}
  //     alt="Style Image"
  //     style={{ maxWidth: "50%" }}
  //   />
  // );

  // const renderFactoryName = (rowData: any) => (
  //   <p>
  //     {rowData && rowData?.Styles && rowData?.Styles?.factory
  //       ? rowData?.Styles?.factory?.factoryName
  //       : "No Factory Assigned"}{" "}
  //   </p>
  // );

  return (
    <Modal open={open} onClose={handleClose} backdrop="static" size="lg">
      <Modal.Header>
        <Modal.Title className="ml-2">
          PP Submission List
          <span className="text-red-600"> (Within 2 Days)</span>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {modalData && modalData?.length > 0 ? (
            <div>
              <div className="mt-1 flex flex-col">
                <div className="-my-2 overflow-x-auto">
                  <div className="inline-block min-w-full py-2 align-middle px-2">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-[#F4F6F8]">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#637581] sm:pl-6 border-r"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                            >
                              Stye Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                            >
                              Factory Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                            >
                              Submission Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {modalData?.length > 0 ? (
                            modalData?.map((data: any) => (
                              <tr key={data.styleNo}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm border-r">
                                  <img
                                    className="w-10 h-10 rounded-full"
                                    src={`${fileUrlKey()}/${
                                      data?.Styles?.image
                                    }`}
                                    alt={data.Styles.image}
                                  />
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                  {data.styleNo}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                  {data?.Styles && data?.Styles?.factory
                                    ? data?.Styles?.factory?.factoryName
                                    : "No Factory Assigned"}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                  {data.factorySubmissionDate
                                    ? new Date(
                                        data.factorySubmissionDate
                                      ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      })
                                    : ""}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <div className="flex justify-center items-center h-20">
                              No Courier send
                            </div>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : // <Table
          //   height={420}
          //   data={modalData}
          //   className="w-full min-w-full"
          //   rowHeight={80}
          //   loadAnimation={true}
          //   autoHeight={true}
          // >
          //   <Column flexGrow={1} verticalAlign="middle" align="left">
          //     <HeaderCell style={headerCss}>Image</HeaderCell>
          //     <Cell style={cellCss}>{renderImageView}</Cell>
          //   </Column>

          //   <Column flexGrow={2} verticalAlign="middle" align="left">
          //     <HeaderCell style={headerCss}>Style Name</HeaderCell>
          //     <Cell style={cellCss} dataKey="styleNo" />
          //   </Column>

          //   <Column flexGrow={2} verticalAlign="middle" align="left">
          //     <HeaderCell style={headerCss}>Factory Name</HeaderCell>
          //     <Cell style={cellCss} dataKey="Styles.factory">
          //       {(rowData) => renderFactoryName(rowData)}
          //     </Cell>
          //   </Column>

          //   <Column flexGrow={2} verticalAlign="middle">
          //     <HeaderCell style={headerCss}>Submission Date</HeaderCell>
          //     <Cell
          //       align="left"
          //       style={cellCss}
          //       dataKey="factorySubmissionDate"
          //     >
          //       {(rowData) => (
          //         <span>
          //           {rowData.factorySubmissionDate
          //             ? new Date(
          //                 rowData.factorySubmissionDate
          //               ).toLocaleDateString("en-GB")
          //             : ""}
          //         </span>
          //       )}
          //     </Cell>
          //   </Column>
          // </Table>
          null}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NotificationModal;
