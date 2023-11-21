/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import { IconButton, Popover, Table, Whisper } from "rsuite";

// import { data } from "./mock";
import { useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { getUserInfo } from "../../hooks/services/auth.service";
import CourierModal from "../courier/CourierModal";
import { cellCss, headerCss } from "./CommonCss";
import StatusTable from "./StatusTable";
import StyleEditModal from "./StyleEditModal";
import PoModalTable from "./modals/PoModalTable";
import PpSubmissionModal from "./modals/PpSubmissionModal";
import TechPackModal from "./modals/TechPackModal";
import { imageUrlKey } from "../../config/envConfig";
const { Column, HeaderCell, Cell } = Table;

const rowKey = "styleNo";

const ExpandCell = ({
  rowData,
  dataKey,
  expandedRowKeys,
  onChange,
  ...props
}: any) => (
  <Cell {...props}>
    View
    <IconButton
      appearance="subtle"
      circle
      onClick={() => {
        onChange(rowData);
      }}
      icon={
        expandedRowKeys.some((key: any) => key === rowData[rowKey]) ? (
          <CollaspedOutlineIcon />
        ) : (
          <ExpandOutlineIcon />
        )
      }
    />
  </Cell>
);

const renderRowExpanded = (rowData: any) => {
  return <StatusTable rowData={rowData} />;
};

const StyleListsTable = ({
  allStylesList,
  isLoading,
  isFetching,
  sortOrder,
  setSortOrder,
  sortBy,
  setSortBy,
}: any) => {
  const { data } = allStylesList || [];
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const handleExpanded = (rowData: any, _dataKey: any) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }

    setExpandedRowKeys(nextExpandedRowKeys as any);
  };

  // PO
  const [poModalOpen, setPoModalOpen] = useState(false);
  const handlePoModalOpen = () => setPoModalOpen(true);
  const handlePoModalClose = () => setPoModalOpen(false);
  const [orders, setOrders] = useState([]);
  const allOrdersList = (orders: []) => {
    setOrders(orders);
    handlePoModalOpen();
  };

  // Courier
  const [courierModalOpen, setCourierModalOpen] = useState(false);
  const handleCourierModalOpen = () => setCourierModalOpen(true);
  const handleCourierModalClose = () => setCourierModalOpen(false);
  const [techPackOpen, setTechPackOpen] = useState(false);
  const handleTechPackModalOpen = () => setTechPackOpen(true);
  const handleTechPackModalClose = () => setTechPackOpen(false);

  const [couriers, setCouriers] = useState([]);
  const [tackPacks, setTackPacks] = useState([]);

  const allCouriersList = (couriers: []) => {
    setCouriers(couriers);
    handleCourierModalOpen();
  };
  const allTackPckList = (tackPacks: []) => {
    setTackPacks(tackPacks);
    handleTechPackModalOpen();
  };

  // pp submission modal
  const [ppSubmissionOpen, setPpSubmissionOpen] = useState(false);
  const [ppSubmissionData, setPpSubmissionData] = useState<any>(null);
  const handlePpSubmissionModalOpen = (submissionData: any) => {
    setPpSubmissionOpen(true);
    setPpSubmissionData(submissionData);
  };
  const handlePpSubmissionModalClose = () => setPpSubmissionOpen(false);

  // tech pack modal

  const handleSortColumn = (sortColumn: any, sortType: any): void => {
    setTimeout(() => {
      setSortBy(sortColumn);
      setSortOrder(sortType);
    }, 500);
  };

  // Style Edit modal
  const [styleEditOpen, setStyleEditOpen] = useState(false);
  const [styleEditData, setStyleEditData] = useState<any>(null);

  const handleStyleEditModalOpen = (data: any) => {
    setStyleEditOpen(true);
    setStyleEditData(data);
  };
  const handleStyleEditModalClose = () => {
    setStyleEditOpen(false);
    setStyleEditData(null);
  };

  const { role } = getUserInfo() as any;

  return (
    <>
      <TechPackModal
        tackPacks={tackPacks}
        open={techPackOpen}
        handleClose={handleTechPackModalClose}
      />
      <PoModalTable
        orders={orders}
        open={poModalOpen}
        handleClose={handlePoModalClose}
      />
      <CourierModal
        courier={couriers}
        open={courierModalOpen}
        handleClose={handleCourierModalClose}
      />
      <PpSubmissionModal
        ppSubmissionData={ppSubmissionData}
        open={ppSubmissionOpen}
        handleClose={handlePpSubmissionModalClose}
      />
      <StyleEditModal
        styleEditData={styleEditData}
        open={styleEditOpen}
        handleClose={handleStyleEditModalClose}
      />
      <Table
        // bordered={true}
        // cellBordered={true}
        // wordWrap="break-all"
        wordWrap="break-word"
        onSortColumn={handleSortColumn}
        sortType={sortOrder}
        sortColumn={sortBy}
        loading={isLoading || isFetching}
        rowHeight={70}
        headerHeight={80}
        rowExpandedHeight={160}
        shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table content area height changes.
        // height={500}
        autoHeight={true}
        data={data}
        rowKey={rowKey}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={renderRowExpanded}
      >
        {/*img*/}
        <Column width={60}>
          <HeaderCell style={headerCss}>Image</HeaderCell>
          <Cell style={cellCss} verticalAlign="middle">
            {(rowData) => (
              <Whisper
                placement="top"
                speaker={
                  <Popover>
                    <div>
                      <img
                        src={`${imageUrlKey()}/${rowData.image}`}
                        alt={rowData.image}
                        className="h-52 w-52  object-cover"
                      />
                    </div>
                  </Popover>
                }
              >
                <div>
                  <img
                    src={`${imageUrlKey()}/${rowData.image}`}
                    className="h-10 w-10 object-cover rounded-full"
                  />
                </div>
              </Whisper>
            )}
          </Cell>
        </Column>
        {/* style no */}
        <Column flexGrow={1} sortable>
          <HeaderCell style={headerCss}>Style No</HeaderCell>
          <Cell style={cellCss} verticalAlign="middle" dataKey="styleNo" />
        </Column>

        {/* Tech Pack */}
        <Column flexGrow={1}>
          <HeaderCell style={headerCss}>Tach Pack</HeaderCell>
          <Cell
            style={cellCss}
            verticalAlign="middle"
            className="text-blue-500"
          >
            {(rowData) => (
              <div className="flex items-center gap-1 justify-center">
                <button onClick={() => allTackPckList(rowData.tackPack)}>
                  View
                </button>
              </div>
            )}
          </Cell>
        </Column>
        {/* Status */}
        <Column flexGrow={1}>
          <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
            Status
          </HeaderCell>
          <ExpandCell
            style={{ padding: 5 }}
            verticalAlign="middle"
            dataKey="styleNo"
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpanded}
          />
        </Column>
        {/* Item Description */}
        <Column flexGrow={1} minWidth={105}>
          <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>
            Item Description
          </HeaderCell>
          <Cell
            style={cellCss}
            verticalAlign="middle"
            dataKey="item.itemName"
          />
        </Column>
        {/* Fabric */}
        <Column flexGrow={1}>
          <HeaderCell style={headerCss}>Fabric</HeaderCell>
          <Cell style={cellCss} verticalAlign="middle" dataKey="fabric" />
        </Column>
        {/* Factory Name	 */}
        <Column flexGrow={1} minWidth={110}>
          <HeaderCell style={headerCss}>Factory Name</HeaderCell>
          <Cell
            style={{ whiteSpace: "break-spaces", ...cellCss }}
            verticalAlign="middle"
            className="whitespace-nowrap"
            dataKey="factory.factoryName"
          ></Cell>
        </Column>
        {/* PO NO		 */}
        <Column flexGrow={1}>
          <HeaderCell style={headerCss}>PO NO</HeaderCell>
          <Cell style={cellCss} verticalAlign="middle" align="center">
            {(rowData) => (
              <button
                // onClick={() => setPoModalOpen(true)}
                onClick={() => allOrdersList(rowData.orders)}
                className="py-0.5 px-2 text-xs bg-sky-600 text-white rounded-md"
              >
                View PO
              </button>
            )}
          </Cell>
        </Column>
        {/* PP Submission Date		 */}
        <Column flexGrow={1} minWidth={105}>
          <HeaderCell style={{ whiteSpace: "break-spaces", ...headerCss }}>
            PP Submission Date
          </HeaderCell>
          <Cell style={cellCss} verticalAlign="middle" align="center">
            {(rowData: any) => (
              <button
                onClick={() =>
                  handlePpSubmissionModalOpen(rowData?.PPSubmission)
                }
                className="py-0.5 px-2 text-xs bg-sky-600 text-white rounded-md"
              >
                View
              </button>
            )}
          </Cell>
        </Column>
        {/* Courier			 */}
        <Column flexGrow={1}>
          <HeaderCell style={headerCss}>Courier</HeaderCell>
          <Cell style={cellCss} verticalAlign="middle" align="center">
            {(rowData) => (
              <button
                onClick={() => allCouriersList(rowData?.couriers)}
                className="py-0.5 px-2 text-xs bg-sky-600 text-white rounded-md"
              >
                View
              </button>
            )}
          </Cell>
        </Column>
        {/* Action */}

        {role !== "USER" && (
          <Column width={70}>
            <HeaderCell style={headerCss}>Action</HeaderCell>
            <Cell style={cellCss} verticalAlign="middle" align="center">
              {(rowData: any) => (
                <Whisper
                  placement="topEnd"
                  speaker={
                    <Popover
                      className="border bg-[#2baa56] text-white rounded-full py-1.5 px-5"
                      arrow={false}
                    >
                      Edit
                    </Popover>
                  }
                >
                  <IconButton
                    onClick={() => handleStyleEditModalOpen(rowData)}
                    circle
                    icon={<RiEdit2Line size={20} />}
                  />
                </Whisper>
              )}
            </Cell>
          </Column>
        )}
      </Table>
    </>
  );
};

export default StyleListsTable;
