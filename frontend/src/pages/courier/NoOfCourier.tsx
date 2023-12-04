/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Pagination, Table } from "rsuite";
import { useGetNoCouriersQuery } from "../../redux/features/couriers/courierApi";

const { Column, HeaderCell, Cell } = Table;

import { BiSearchAlt } from "react-icons/bi";

const NoOfCourier = () => {
  const query: Record<string, any> = {};
  const [size, setSize] = useState<number>(30);
  const [page, setPage] = useState<number>(1);
  const [selectedStyleNo, setSelectedStyleNo] = useState<string | null>(null);

  //
  query["limit"] = size;
  query["page"] = page;
  query["searchTerm"] = selectedStyleNo;

  const {
    data: NoOfCourierData,
    isLoading,
    // isError,
    isFetching,
  } = useGetNoCouriersQuery({ ...query });

  return (
    <>
      <section className="p-5">
        <div className="border p-5 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center pb-5">
            <div>
              <h1 className="mb-4 font-semibold">Style Wise No of Courier</h1>
            </div>
            <div className="w-[40%]">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <BiSearchAlt size="1.6em" color="#91a0b0" />
                </div>
                <input
                  onChange={(e) => setSelectedStyleNo(e.target.value)}
                  type="text"
                  id="searchStyleWiseCourier"
                  className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB]   w-full pl-10 p-2.5 py-2 rounded-lg focus:outline-none"
                  placeholder="Search with Style No..."
                  required
                />
              </div>
            </div>
          </div>
          {/* courier table */}
          <div>
            <Table
              // rowHeight={(rowData) => rowData?.action * 38}
              rowHeight={55}
              headerHeight={48}
              autoHeight={true}
              loading={isLoading || isFetching}
              data={NoOfCourierData?.data}
              bordered
              cellBordered
              id="table"
            >
              {/* SL*/}
              <Column align="center" flexGrow={1}>
                <HeaderCell
                  verticalAlign="middle"
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
                  SL
                </HeaderCell>
                <Cell
                  verticalAlign="middle"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    padding: 10,
                  }}
                >
                  {(rowData, rowIndex) => (
                    <p
                      className={`${
                        rowData?._count?.couriers > 5 && "text-red-600"
                      }`}
                    >
                      {rowIndex! + 1}{" "}
                    </p>
                  )}
                </Cell>
              </Column>

              {/* Style No*/}
              <Column align="center" flexGrow={1}>
                <HeaderCell
                  verticalAlign="middle"
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
                  Style No
                </HeaderCell>
                <Cell
                  dataKey="styleNo"
                  verticalAlign="middle"
                  style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                >
                  {(rowData) => (
                    <p
                      className={`${
                        rowData?._count?.couriers > 5 && "text-red-600"
                      }`}
                    >
                      {rowData?.styleNo}{" "}
                    </p>
                  )}
                </Cell>
              </Column>

              {/* Courier Quantity*/}
              <Column align="center" flexGrow={1}>
                <HeaderCell
                  verticalAlign="middle"
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
                  Courier Quantity
                </HeaderCell>
                <Cell
                  dataKey="_count.couriers"
                  verticalAlign="middle"
                  style={{ padding: 10, fontSize: 14, fontWeight: 500 }}
                >
                  {(rowData) => (
                    <p
                      className={`${
                        rowData?._count?.couriers > 5 && "text-red-600"
                      }`}
                    >
                      {rowData?._count?.couriers}{" "}
                    </p>
                  )}
                </Cell>
              </Column>
            </Table>
            <div className="py-5">
              <Pagination
                total={NoOfCourierData?.meta?.total}
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="md"
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
      </section>
    </>
  );
};

export default NoOfCourier;
