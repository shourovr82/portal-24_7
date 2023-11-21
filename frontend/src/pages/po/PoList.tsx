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
  Loader,
  Pagination,
  Popover,
  Whisper,
} from "rsuite";
import { SelectPicker } from "rsuite";
import { useGetAllFactoryNamesQuery } from "../../redux/features/factories/factoryApi";
import { useGetAllPortNamesQuery } from "../../redux/features/ports/portsApi";
import { renderLoading } from "../../components/renderLoading/RenderLoading";
import { useGetAllOrdersQuery } from "../../redux/features/orders/ordersApi";
import moment from "moment";
import { useState } from "react";
import Lottie from "lottie-react";
import noDataAnimation from "../../assets/animation/animation-nodata.json";
import { dataForSelectPicker } from "../../common/commonData";
import { predefinedRanges } from "../../constants";
import { getUserInfo } from "../../hooks/services/auth.service";
import { RiEdit2Line } from "react-icons/ri";
import EditPoDetails from "./EditPo";
import { useDebounced } from "../../redux/hook";
import DocPassIcon from "@rsuite/icons/DocPass";
import { FaFileDownload } from "react-icons/fa";
import { fileUrlKey } from "../../config/envConfig";

const PoLists = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(30);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFactory, setSelectedFactory] = useState<string | undefined>(
    undefined
  );
  const [selectedPort, setSelectedPort] = useState<string | undefined>(
    undefined
  );
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [selectedFriDate, setSelectedFriDate] = useState({
    startDate: "",
    endDate: "",
  });

  //
  query["limit"] = size;
  query["page"] = page;
  query["factoryId"] = selectedFactory;
  query["portId"] = selectedPort;
  query["startDate"] = selectedDate.startDate;
  query["endDate"] = selectedDate.endDate;
  query["friStartDate"] = selectedFriDate.startDate;
  query["friEndDate"] = selectedFriDate.endDate;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 400,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const {
    data: allOrders,
    isLoading,
    isError,
  } = useGetAllOrdersQuery({ ...query });

  const { data: allFactoryResponse, isLoading: isLoadingFactoryNames } =
    useGetAllFactoryNamesQuery(null);
  const { data: allPortResponse, isLoading: isLoadingPortNames } =
    useGetAllPortNamesQuery(null);

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

  const handleFilterFriDate = (date: Date[] | null) => {
    if (!date?.length) {
      setSelectedFriDate({
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
        setSelectedFriDate({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      }
    }
  };

  const { role } = getUserInfo() as any;

  const [activePoEditModal, setActivePoEditModal] = useState<boolean>(false);
  const [poEditData, setPoEditData] = useState<any | null>(null);

  const handlePoEditModalOpen = (poData: any) => {
    setPoEditData(poData);
    setActivePoEditModal(true);
  };

  const handleClosePoEdit = (): void => {
    setActivePoEditModal(false);
    setPoEditData(null);
  };
  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = (eventKey: any) => {
      onClose();
      console.log(eventKey);
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item eventKey={4}>Export to Excel</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };
  return (
    <>
      <div className="p-5 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[24px] font-semibold text-[#212B36]">PO</h2>
          </div>
          <div className="flex gap-4">
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

            <Link to="/po/addpo">
              <Button
                className="flex items-center gap-2 hover:bg-[#0284c7] hover:text-white/80 px-4 py-2 rounded-[4px] text-white  bg-[#0284c7]"
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
                <span className="text-sm font-semibold">Add New PO</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className=" mt-6 shadow-lg mb-20 shadow-[#eff1f3] pb-5 border rounded-lg">
          <div className="p-5 ">
            {/* search and filter */}

            <div>
              <div className="flex justify-between gap-3">
                <div className="w-[40%]">
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
                      onChange={(e) => setSearchTerm(e.target.value)}
                      type="text"
                      id="searchTerm"
                      className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB]   w-full pl-10 py-2 rounded-lg focus:outline-none"
                      placeholder="Search with Order ID (PO)..."
                      required
                    />
                  </div>
                </div>
                <SelectPicker
                  size="lg"
                  data={dataForSelectPicker.getAllFactoryNames(
                    allFactoryResponse
                  )}
                  onChange={(value: string | null): void =>
                    setSelectedFactory(value as string)
                  }
                  onClean={() => setSelectedFactory(undefined)}
                  style={{ width: "20%" }}
                  searchable={false}
                  placeholder="Filter By Factory"
                  renderMenu={(menu) =>
                    renderLoading(menu, isLoadingFactoryNames)
                  }
                />
                <SelectPicker
                  size="lg"
                  data={dataForSelectPicker.getAllPortNames(allPortResponse)}
                  style={{ width: "20%" }}
                  searchable={false}
                  onChange={(value: string | null): void =>
                    setSelectedPort(value as string)
                  }
                  onClean={() => setSelectedPort(undefined)}
                  placeholder="Filter By Port"
                  renderMenu={(menu) => renderLoading(menu, isLoadingPortNames)}
                />
                <DateRangePicker
                  // @ts-ignore
                  ranges={predefinedRanges}
                  placement="auto"
                  onChange={(value: Date[] | null): void => {
                    handleFilterDate(value);
                  }}
                  onClean={() =>
                    setSelectedDate({
                      startDate: "",
                      endDate: "",
                    })
                  }
                  size="lg"
                  style={{ width: "30%" }}
                  placeholder="Filter By Factory ETD"
                />
                <DateRangePicker
                  // @ts-ignore
                  ranges={predefinedRanges}
                  placement="auto"
                  onChange={(value: Date[] | null): void => {
                    handleFilterFriDate(value);
                  }}
                  onClean={() =>
                    setSelectedFriDate({
                      startDate: "",
                      endDate: "",
                    })
                  }
                  size="lg"
                  style={{ width: "30%" }}
                  placeholder="Filter By Fri Date"
                />
              </div>
            </div>
          </div>

          {/* main section for table */}
          <div className="">
            {/* <PoTable /> */}
            <>
              <div className="px-5">
                <div className="mt-1 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {allOrders?.data?.length > 0 && (
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-[#F4F6F8]">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-2 pr-3 text-center text-sm font-semibold text-[#637581] sm:pl-3 border-r"
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
                                  FRI Date
                                </th>

                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-center text-sm font-semibold text-[#637581] border-r"
                                >
                                  Factory Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                                >
                                  Port Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-center text-sm font-semibold text-[#637581] border-r"
                                >
                                  PO File
                                </th>
                                {role !== "USER" && (
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-center text-sm font-semibold text-[#637581]"
                                  >
                                    Action
                                  </th>
                                )}
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                              {allOrders?.data?.map((order: any) =>
                                order?.orders?.map((po: any, index: number) => (
                                  <tr key={po?.orderNo}>
                                    {index === 0 && (
                                      <td
                                        rowSpan={order.orders.length}
                                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-black font-medium sm:pl-6 border-r"
                                      >
                                        {po?.styleNo}
                                      </td>
                                    )}
                                    <td className="whitespace-nowrap px-2 py-4 text-sm text-black font-medium border-r">
                                      {po?.orderNo}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                      {po?.noOfPack}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                      {po?.totalPack}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                      {po?.totalPc}
                                    </td>{" "}
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                      {moment(po?.buyerEtd).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                      {moment(po?.factoryEtd).format("L")}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black  font-medium border-r">
                                      {moment(po?.friDate).format("L")}
                                    </td>
                                    {index === 0 && (
                                      <td
                                        rowSpan={order.orders.length}
                                        className="whitespace-nowrap text-center px-3 py-4 text-sm text-black font-medium border-r"
                                      >
                                        {order?.factory?.factoryName ?? "-"}
                                      </td>
                                    )}
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                                      {po?.Port?.portName}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r text-center">
                                      {po?.orderFile ? (
                                        <IconButton
                                          onClick={() =>
                                            window.open(
                                              `${fileUrlKey()}/${po?.orderFile}`
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
                                    {(role === "ADMIN" || "SUPERADMIN") && (
                                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-black font-medium">
                                        <IconButton
                                          onClick={() =>
                                            handlePoEditModalOpen(po)
                                          }
                                          circle
                                          icon={<RiEdit2Line size={20} />}
                                        />
                                      </td>
                                    )}
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        )}

                        {!isLoading && !allOrders?.data?.length && (
                          <div className="flex justify-center">
                            <Lottie
                              className="w-[40%] "
                              animationData={noDataAnimation}
                              loop={true}
                            />
                          </div>
                        )}
                        {isLoading && !isError && (
                          <div className="flex justify-center py-20">
                            <Loader
                              size="md"
                              className="font-medium"
                              content="Loading..."
                            />
                          </div>
                        )}
                      </div>
                      <div style={{ padding: 20 }}>
                        <Pagination
                          total={allOrders?.meta?.total}
                          prev
                          next
                          first
                          last
                          ellipsis
                          boundaryLinks
                          maxButtons={5}
                          size="lg"
                          layout={["total", "-", "limit", "|", "pager", "skip"]}
                          limitOptions={[10, 20, 30, 50, 100, 150, 200]}
                          limit={size}
                          onChangeLimit={(limitChange) => setSize(limitChange)}
                          activePage={page}
                          onChangePage={setPage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
      {/* po edit modal */}
      <EditPoDetails
        setActivePoEditModal={setActivePoEditModal}
        activePoEditModal={activePoEditModal}
        poEditData={poEditData}
        handleClosePoEdit={handleClosePoEdit}
      />
    </>
  );
};

export default PoLists;
