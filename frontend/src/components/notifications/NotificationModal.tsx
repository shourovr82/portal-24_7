/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Modal, Table } from "rsuite";
import { useGetAllNotificationQuery } from "../../redux/features/notifications/notificationApi";
import { cellCss } from "../styles/CommonCss";
const { Column, HeaderCell, Cell } = Table;

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

  const renderImageView = (rowData: any) => (
    <img src={rowData.Styles.image} alt="Image" style={{ maxWidth: "30%" }} />
  );

  const renderFactoryName = (rowData: any) => (
    <p>
      {" "}
      {rowData && rowData?.Styles && rowData?.Styles?.factory
        ? rowData?.Styles?.factory?.factoryName
        : "No Factory Assigned"}{" "}
    </p>
  );

  return (
    <Modal open={open} onClose={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>
          PP Submission List{" "}
          <span className="text-red-600">(Within 2 Days)</span>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {modalData && modalData?.length > 0 ? (
            <Table
              height={420}
              data={modalData}
              rowHeight={80}
              autoHeight={true}
            >
              <Column flexGrow={1}>
                <HeaderCell>Image</HeaderCell>
                <Cell style={cellCss} dataKey="Styles.image">
                  {renderImageView}
                </Cell>
              </Column>

              <Column flexGrow={2} align="center">
                <HeaderCell>Style Name</HeaderCell>
                <Cell style={cellCss} dataKey="styleNo" />
              </Column>

              <Column flexGrow={2} align="center">
                <HeaderCell>Factory Name</HeaderCell>
                <Cell style={cellCss} dataKey="Styles.factory">
                  {(rowData) => renderFactoryName(rowData)}
                </Cell>
              </Column>

              <Column flexGrow={2}>
                <HeaderCell>Submission Date</HeaderCell>
                <Cell style={cellCss} dataKey="factorySubmissionDate">
                  {(rowData) => (
                    <span>
                      {rowData.factorySubmissionDate
                        ? new Date(
                            rowData.factorySubmissionDate
                          ).toLocaleDateString("en-GB")
                        : ""}
                    </span>
                  )}
                </Cell>
              </Column>
            </Table>
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NotificationModal;
