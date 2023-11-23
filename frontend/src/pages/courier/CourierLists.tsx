/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  DateRangePicker,
  Dropdown,
  IconButton,
  Pagination,
  Popover,
  SelectPicker,
  Whisper,
} from "rsuite";
import moment from "moment";
import { Table } from "rsuite";
import { useGetCouriersQuery } from "../../redux/features/couriers/courierApi";
import { useState } from "react";
import { cellCss, headerCss } from "../../components/styles/CommonCss";
import { useGetStyleNoQuery } from "../../redux/features/styles/styleApi";
import { renderLoading } from "../../components/renderLoading/RenderLoading";
import { predefinedRanges } from "../../constants";
import { SortType } from "rsuite/esm/Table";
import { useDebounced } from "../../redux/hook";
import { getUserInfo } from "../../hooks/services/auth.service";
import { RiEdit2Line } from "react-icons/ri";
import CourierEditModal from "../../components/courier/CourierEditModal";
import DocPassIcon from "@rsuite/icons/DocPass";
import Excel from "exceljs";
import { saveAs } from "file-saver";

const { Column, HeaderCell, Cell } = Table;

const CourierLists = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(30);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortType>("desc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStyleNo, setSelectedStyleNo] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  //
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;
  query["styleNo"] = selectedStyleNo;
  query["startDate"] = selectedDate.startDate;
  query["endDate"] = selectedDate.endDate;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data: allStylesNameResponse, isLoading: isLoadingAllStyleNames } =
    useGetStyleNoQuery(null);

  const {
    data: couriersData,
    isLoading: isLoadingCouriersData,
    // isError: isErrorCourierError,
    isFetching: isFetchingCourierData,
  } = useGetCouriersQuery({ ...query });

  const handleFilterDate = (date: Date[] | null) => {
    if (!date?.length) {
      setSelectedDate({
        startDate: "",
        endDate: "",
      });
    }

    if (date) {
      const startDate = new Date(date[0]);
      const endDate = new Date(date[1]);

      // Set the start time to 00:00:00 (12:00 AM)
      startDate.setHours(0, 0, 0, 0);

      // Set the end time to 23:59:59 (11:59 PM)
      endDate.setHours(23, 59, 59, 999);

      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      if (startDate !== null && endDate !== null) {
        setSelectedDate({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      }
    }
  };
  let timer: NodeJS.Timeout | null = null;

  const handleSortColumn = (sortColumn: any, sortType: any): void => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setSortBy(sortColumn);
      setSortOrder(sortType);
      timer = null; // Reset the timer
    }, 300);
  };

  const { role } = getUserInfo() as any;

  const [courierEditModalOpen, setCourierEditModalOpen] =
    useState<boolean>(false);
  const [courierEditData, setCourierEditData] = useState<any | null>(null);

  const handleCloseEditModal = () => {
    setCourierEditModalOpen(false);
    setCourierEditData(null);
  };

  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = () => {
      onClose();
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item
            disabled={!isLoadingCouriersData && !couriersData?.data?.length}
            onClick={saveExcel}
            eventKey={4}
          >
            Export to Excel
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  // ! export to excel

  const columns = [
    { header: "Courier Date", key: "courierDate" },
    { header: "Style No", key: "styleNo" },
    { header: "Courier Name", key: "courierName" },
    { header: "Air Way Bill", key: "awbNo" },
    { header: "Parcel Detail", key: "courierDetails" },
  ];

  const workbook = new Excel.Workbook();

  const saveExcel = async () => {
    try {
      const fileName = "Courier Report";

      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet("workSheetName");

      // each columns contains header and its mapping key from data
      worksheet.columns = columns;

      // loop through all of the columns and set the alignment with width.
      worksheet.columns?.forEach((column: any) => {
        column.width = column?.header?.length + 5;
        column.alignment = { horizontal: "center" };
      });

      // const rowIndexStart = 2;

      // let rowIndex = rowIndexStart;

      couriersData?.data?.forEach((singleData: any) => {
        const customRows = {
          styleNo: singleData.styleNo,
          awbNo: singleData.awbNo,
          courierDetails: singleData.courierDetails,
          courierName: singleData.courierName,
          courierDate: moment(singleData?.courierDate).format("DD-MM-YYYY"),
        };
        worksheet.addRow(customRows);
      });

      // Add style
      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true }; // Font styling
      headerRow.height = 30;
      headerRow.alignment = { vertical: "middle", horizontal: "center" };
      // loop through all of the rows and set the outline style.
      worksheet.eachRow({ includeEmpty: false }, (row) => {
        // store each cell to currentCell
        // @ts-ignore
        const currentCell = row?._cells;

        // loop through currentCell to apply border only for the non-empty cell of excel
        currentCell.forEach((singleCell: any) => {
          // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
          const cellAddress = singleCell._address;

          // apply border
          worksheet.getCell(cellAddress).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });

      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();

      // download the processed file
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      console.error("<<<ERROR>>>", error);
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet("workSheetName");
    }
  };

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[24px] font-semibold text-[#212B36]">
              Courier Lists
            </h2>
          </div>
          {/* add */}
          <div className="flex gap-4 ">
            <ButtonToolbar>
              <Whisper
                placement="bottomEnd"
                speaker={renderMenu}
                trigger={["click"]}
              >
                <Button
                  appearance="default"
                  className="!bg-[#0284c7] text-white hover:text-white/80 focus-within:text-white focus-within:bg-[#0284c7] font-semibold
                    "
                  color="blue"
                  startIcon={<DocPassIcon className="text-xl" />}
                >
                  Generate Report
                </Button>
              </Whisper>
            </ButtonToolbar>

            <Link to="/courier/addcourier">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-[4px] text-white  bg-[#0284c7]"
                type="button"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="#fff"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
                <span className="text-sm font-semibold">Add Courier</span>
              </button>
            </Link>
          </div>
        </div>
        {/* inquiry tab */}

        <div className=" mt-6 shadow-lg mb-20 pb-5  shadow-[#eff1f3] border rounded-lg">
          <div className="p-5 ">
            <div>
              <div className="flex justify-between gap-3">
                <div className="w-[50%]">
                  <label htmlFor="voice-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="#919eab"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </div>
                    <input
                      onChange={(e) => setSearchTerm(e?.target?.value)}
                      type="text"
                      id="voice-search"
                      className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB]   w-full pl-10 py-2 rounded-lg focus:outline-none"
                      placeholder="Search with Style No, AWB or Courier Name..."
                      required
                    />
                  </div>
                </div>
                <SelectPicker
                  onChange={(value: string | null): void =>
                    setSelectedStyleNo(value as string)
                  }
                  onClean={() => setSelectedStyleNo(null)}
                  size="lg"
                  data={
                    allStylesNameResponse?.data?.map((style: any) => ({
                      label: style?.styleNo,
                      value: style?.styleNo,
                    })) || []
                  }
                  style={{ width: "25%" }}
                  // searchable={false}
                  placeholder="Filter By Style No"
                  renderMenu={(menu) =>
                    renderLoading(menu, isLoadingAllStyleNames)
                  }
                />

                <DateRangePicker
                  // @ts-ignore
                  ranges={predefinedRanges}
                  placement="auto"
                  onChange={(value: Date[] | null): void => {
                    handleFilterDate(value);
                  }}
                  size="lg"
                  style={{ width: "25%" }}
                  placeholder="Filter By Date"
                />
              </div>
            </div>
          </div>

          {/* main section for table */}
          <div className="">
            <>
              <Table
                rowHeight={60}
                headerHeight={48}
                autoHeight={true}
                data={couriersData?.data}
                loading={isLoadingCouriersData || isFetchingCourierData}
                bordered={true}
                cellBordered={true}
                onSortColumn={handleSortColumn}
                sortType={sortOrder}
                sortColumn={sortBy}
                id="table"
              >
                {/* Date*/}
                <Column flexGrow={1} sortable>
                  <HeaderCell style={headerCss}> Courier Date</HeaderCell>
                  <Cell
                    dataKey="courierDate"
                    verticalAlign="middle"
                    style={{ fontSize: 14, fontWeight: 500, padding: 10 }}
                  >
                    {(rowData) =>
                      `${moment(rowData?.courierDate).format("ll")}`
                    }
                  </Cell>
                </Column>

                {/* Style No*/}
                <Column flexGrow={1}>
                  <HeaderCell style={headerCss}>Style No</HeaderCell>
                  <Cell
                    dataKey="styleNo"
                    verticalAlign="middle"
                    style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                  >
                    {/* {(rowData) => `${rowData.variants}`} */}
                  </Cell>
                </Column>

                {/* Courier Name*/}
                <Column flexGrow={1}>
                  <HeaderCell style={headerCss}>Courier Name</HeaderCell>
                  <Cell
                    dataKey="courierName"
                    verticalAlign="middle"
                    style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                  ></Cell>
                </Column>
                {/* AWB No*/}
                <Column flexGrow={1}>
                  <HeaderCell style={headerCss}>Air Way Bill No</HeaderCell>
                  <Cell
                    dataKey="awbNo"
                    verticalAlign="middle"
                    style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                  ></Cell>
                </Column>

                {/* Details*/}
                <Column flexGrow={1}>
                  <HeaderCell style={headerCss}>Parcel Details</HeaderCell>
                  <Cell
                    dataKey="courierDetails"
                    verticalAlign="middle"
                    style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                  ></Cell>
                </Column>

                {role !== "USER" && (
                  <Column width={70}>
                    <HeaderCell style={headerCss}>Action</HeaderCell>
                    <Cell style={cellCss} verticalAlign="middle" align="center">
                      {(rowData: any) => (
                        <IconButton
                          onClick={() => {
                            setCourierEditModalOpen(true);
                            setCourierEditData(rowData);
                          }}
                          circle
                          icon={<RiEdit2Line size={20} />}
                        />
                      )}
                    </Cell>
                  </Column>
                )}
              </Table>
            </>

            <div style={{ padding: "20px 10px 0px 10px" }}>
              <Pagination
                total={couriersData?.meta?.total}
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="lg"
                layout={["total", "-", "limit", "|", "pager", "skip"]}
                limitOptions={[10, 20, 30, 50]}
                limit={size}
                onChangeLimit={(limitChange) => setSize(limitChange)}
                activePage={page}
                onChangePage={setPage}
              />
            </div>
          </div>
        </div>
      </div>
      <CourierEditModal
        courierEditData={courierEditData}
        open={courierEditModalOpen}
        handleClose={handleCloseEditModal}
      />
    </>
  );
};

export default CourierLists;
