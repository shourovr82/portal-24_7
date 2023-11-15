/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Popover, Whisper } from "rsuite";
import { useState } from "react";
import PoModalTable from "./modals/PoModalTable";
import { useGetRecentCommentsOnStylesQuery } from "../../redux/features/styles/styleApi";
import moment from "moment";
const { Column, HeaderCell, Cell } = Table;

const ImageCell = ({ rowData, dataKey, ...props }: any) => {
  const speaker = (
    <Popover>
      <div>
        <img src={rowData?.image} alt="" className="h-48 w-48 object-cover" />
      </div>
    </Popover>
  );
  return (
    <Cell align="center" verticalAlign="middle" {...props}>
      <Whisper placement="top" speaker={speaker}>
        <div>
          <img
            src={rowData?.image}
            className="h-10 w-10 object-cover rounded-full"
          />
        </div>
      </Whisper>
    </Cell>
  );
};

const TopTenStyleTable = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const { data: commentsRes, isLoading } =
    useGetRecentCommentsOnStylesQuery(null);
  const { data } = commentsRes || {};
  console.log(data?.data);
  return (
    <>
      <PoModalTable open={open} handleClose={handleClose} />

      <Table
        wordWrap="break-all"
        // rowHeight={(rowData) => rowData?.action * 38}
        rowHeight={55}
        headerHeight={78}
        autoHeight={true}
        data={data}
        bordered={true}
        loading={isLoading}
        cellBordered={true}
        id="table"
      >
        {/* Product img */}
        <Column width={70}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Image
          </HeaderCell>
          <ImageCell dataKey="image" />
        </Column>

        {/* Style NO */}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Style No
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ fontSize: 14, fontWeight: 500, padding: 10 }}
          >
            {(rowData) => `${rowData?.styleNo}`}
          </Cell>
        </Column>
        {/* Category*/}

        {/* Item Name*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Item Name
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {(rowData) => `${rowData?.item?.itemName}`}
          </Cell>
        </Column>

        {/*LD/CP/AOP Strike Off Status*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            LD/CP/AOP Strike Off Status
          </HeaderCell>
          <Cell
            align="left"
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {(rowData) =>
              `${
                rowData?.ldCpAopStatus?.length
                  ? rowData?.ldCpAopStatus[0]?.ldCpAopStatusComment?.slice(
                      0,
                      50
                    )
                  : "--"
              }`
            }
          </Cell>
        </Column>
        {/* PP/Strike off status*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            PP Strike Off Status
          </HeaderCell>
          <Cell
            align="left"
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {(rowData) =>
              `${
                rowData?.PPStrikeOffStatus?.length
                  ? rowData?.PPStrikeOffStatus[0]?.ppStatusComment?.slice(0, 50)
                  : "--"
              }`
            }
          </Cell>
        </Column>
        {/* Bulk production Status*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Bulk Production Status
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {(rowData) =>
              `${
                rowData?.BulkProductionStatus?.length
                  ? rowData?.BulkProductionStatus[0]?.bulkProductionComment?.slice(
                      0,
                      50
                    )
                  : "--"
              }`
            }
          </Cell>
        </Column>

        {/* Factory*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Factory
          </HeaderCell>
          <Cell verticalAlign="middle" style={{ padding: 10, fontWeight: 500 }}>
            {(rowData) => (
              <p className="text-xs">{rowData?.factory?.factoryName ?? "--"}</p>
            )}
          </Cell>
        </Column>
        {/* User Name	*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            User Name
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {(rowData) => {
              // Create an array of objects containing createdAt and profileId
              const statusData = [
                ...rowData.BulkProductionStatus.map((status: any) => ({
                  createdAt: new Date(status.createdAt),
                  profile: status?.profile,
                })),
                ...rowData.ldCpAopStatus.map((status: any) => ({
                  createdAt: new Date(status.createdAt),
                  profile: status?.profile,
                })),
                ...rowData.PPStrikeOffStatus.map((status: any) => ({
                  createdAt: new Date(status.createdAt),
                  profile: status?.profile,
                })),
              ];

              // Check if the statusData array is not empty
              if (statusData?.length === 0) {
                return "--";
              }

              // Find the object with the maximum (latest) createdAt date
              const latestStatus = statusData.reduce((max, status) =>
                max.createdAt > status.createdAt ? max : status
              );

              // Display the profileId associated with the latest createdAt date
              return (
                <p className="text-xs">
                  {latestStatus?.profile?.firstName}
                  {latestStatus?.profile?.lastName}
                </p>
              );
            }}
          </Cell>
        </Column>
        {/* Time	*/}
        <Column flexGrow={1}>
          <HeaderCell
            style={{
              backgroundColor: "#F4F6F8",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#637381",
              fontWeight: "500",
            }}
          >
            Time
          </HeaderCell>
          <Cell
            verticalAlign="middle"
            style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
          >
            {(rowData) => {
              // Create an array of objects containing createdAt and profileId
              const statusData = [
                ...rowData.BulkProductionStatus.map((status: any) => ({
                  createdAt: new Date(status.createdAt),
                })),
                ...rowData.ldCpAopStatus.map((status: any) => ({
                  createdAt: new Date(status.createdAt),
                })),
                ...rowData.PPStrikeOffStatus.map((status: any) => ({
                  createdAt: new Date(status.createdAt),
                })),
              ];

              // Check if the statusData array is not empty
              if (statusData.length === 0) {
                return "--";
              }

              // Find the object with the maximum (latest) createdAt date
              const latestStatus = statusData.reduce((max, status) =>
                max?.createdAt > status?.createdAt ? max : status
              );

              return (
                <p className="text-xs">
                  {moment(latestStatus.createdAt)
                    .startOf("millisecond")
                    .fromNow()}
                </p>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </>
  );
};

export default TopTenStyleTable;
