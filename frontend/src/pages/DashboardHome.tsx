/* eslint-disable @typescript-eslint/no-explicit-any */

import { AiOutlineUnorderedList } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import { MdOutlineFactory } from "react-icons/md";
import DashBoardBarChart from "../components/dashboard/DashBoardBarChart";
import NotificationModal from "../components/notifications/NotificationModal";
import TopTenStyleTable from "../components/styles/TopTenStyleTable";
import { useGetAllFactoriesLengthQuery } from "../redux/features/factories/factoryApi";
import {
  useGetAllOrdersLengthQuery,
  useGetAllOrdersPcQuery,
} from "../redux/features/orders/ordersApi";
import { useGetAllStylesLengthQuery } from "../redux/features/styles/styleApi";

const DashboardHome = () => {
  const query: Record<string, any> = {};

  const { data: allStyles } = useGetAllStylesLengthQuery({ query });

  const { data: allOrders } = useGetAllOrdersLengthQuery(null);

  const { data: allFactories } = useGetAllFactoriesLengthQuery(null);

  const { data: allPc, isLoading } = useGetAllOrdersPcQuery(null);

  return (
    <div>
      <NotificationModal />
      {/* Card list */}
      <ul
        role="list"
        className="p-6 grid gap-5 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3"
      >
        {/* card 1 */}
        <li className="border-[#E4E7EC] border h-[148px] px-4 py-4 rounded-lg bg-white shadow">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 p-[10px] rounded-3xl bg-gray-50">
              <GiClothes size={20} className="text-blue-600" />
            </div>
            <p className="font-medium text-gray-600 text-xl">Total Style</p>
          </div>
          <div className="mt-1">
            <p className="text-4xl font-semibold text-[#262626] ml-[56px]">
              {allStyles?.data ? allStyles?.data?.currentYear : 0}
            </p>
          </div>
          <div className="text-right mt-2.5">
            <p className="font-medium text-sm text-[#667085]">
              <span className="text-green-500 text-sm font-medium">
                {" "}
                {allStyles?.data?.currentYear != null &&
                allStyles?.data?.lastYear != null &&
                allStyles?.data?.lastYear !== 0
                  ? `${(
                      (allStyles?.data?.currentYear /
                        allStyles?.data?.lastYear) *
                      100
                    ).toFixed(2)}`
                  : "0"}
                %
              </span>{" "}
              vs last year
            </p>
          </div>
        </li>
        {/* card 2 */}
        <li className="border-[#E4E7EC] border h-[148px] px-4 py-4 rounded-lg bg-white shadow">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 p-[10px] rounded-3xl bg-gray-50">
              <AiOutlineUnorderedList size={20} className="text-blue-600" />
            </div>
            <p className="font-medium text-gray-600 text-xl">Total PO</p>
          </div>
          <div className="mt-1">
            <p className="text-4xl font-semibold text-[#262626] ml-[56px]">
              {allOrders?.data ? allOrders?.data?.currentYear : 0}
            </p>
          </div>
          <div className="text-right mt-2.5">
            <p className="font-medium text-sm text-[#667085]">
              <span className="text-green-500 text-sm font-medium">
                {" "}
                {allOrders?.data?.currentYear != null &&
                allOrders?.data?.lastYear != null &&
                allOrders?.data?.lastYear !== 0
                  ? `${(
                      (allOrders?.data?.currentYear /
                        allOrders?.data?.lastYear) *
                      100
                    ).toFixed(2)}`
                  : "0"}
                %
              </span>{" "}
              vs last year
            </p>
          </div>
        </li>
        {/* card 3 */}
        <li className="border-[#E4E7EC] border h-[148px] px-4 py-4 rounded-lg bg-white shadow">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 p-[10px] rounded-3xl bg-gray-50">
              <MdOutlineFactory size={20} className="text-blue-600" />
            </div>
            <p className="font-medium text-gray-600 text-xl">Total Factory</p>
          </div>
          <div className="mt-1">
            <p className="text-4xl font-semibold text-[#262626] ml-[56px]">
              {allFactories?.data ? allFactories?.data?.currentYear : 0}
            </p>
          </div>
          <div className="text-right mt-2.5">
            <p className="font-medium text-sm text-[#667085]">
              <span className="text-green-500 text-sm font-medium">
                {" "}
                {allFactories?.data?.currentYear != null &&
                allFactories?.data?.lastYear != null &&
                allFactories?.data?.lastYear !== 0
                  ? `${(
                      (allFactories?.data?.currentYear /
                        allFactories?.data?.lastYear) *
                      100
                    ).toFixed(2)}`
                  : "0"}
                %
              </span>{" "}
              vs last year
            </p>
          </div>
        </li>
      </ul>

      <div className="mx-6 bg-white border rounded-lg shadow-md p-2">
        <h1>
          <span className="bg-gray-100 p-1 rounded-md"> Total Pieces:</span>{" "}
          <span className="text-green-600">(Last 4 Years Comparison)</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 justify-start items-center gap-5">
          {allPc?.data?.length
            ? allPc?.data?.map((pc: any, index: number) => (
                <div
                  className={`text-[#262626] my-8 mx-2 h-72 w-full ${
                    index !== allPc?.data?.length - 1
                      ? "lg:border-r mx-md:border-b"
                      : ""
                  }`}
                  key={pc?.year}
                >
                  <h1 className="text-4xl font-extrabold mb-1">{pc?.year}</h1>
                  <p className="text-rose-700 text-sm font-bold bg-rose-50 rounded-md inline-block p-1 mt-4 mb-2">
                    AW: April - September
                  </p>
                  <p className="font-bold text-lg text-[#262626]">
                    {pc?.aprilToSept?.toLocaleString()}
                  </p>
                  
                    <p className="text-emerald-700 text-sm font-bold inline-block rounded-md  bg-emerald-50 p-1 mt-4 mb-2">
                      SS: October - March
                    </p>{" "}
                    <p className="font-bold text-lg text-[#262626]">
                      {pc?.octToMarch?.toLocaleString()}
                    </p>
                 
                  <p className="text-xl font-bold mt-14 text-[#262626]">
                    Total: <span className="font-semibold">{pc?.total?.toLocaleString()}</span>
                  </p>
                </div>
              ))
            : null}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center gap-10 w-full h-80">
            <div className="border-t-4 border-blue-500 border-solid h-10 w-10 rounded-full animate-spin "></div>
            <p className="text-xl font-bold text-center text-red-400 ">
              Last 4 Years Pc Comparison is calculating...
            </p>
          </div>
        )}
      </div>

      {/* dashboard bar chart */}
      <div className="m-6 bg-white border rounded-lg shadow-md">
        <div className="p-5">
          <div className="flex justify-between mb-8">
            <div className="flex">
              <h1 className="text-[#212B36] text-[18px] font-semibold">
                Season & Month Wise Shipment
              </h1>
            </div>
            <div className="flex gap-10">
              <p className="text-[13px] font-semibold">
                AW :{" "}
                <span className="bg-gray-200 px-3 py-0.5 rounded-md font-medium">
                  April - September
                </span>
              </p>
              <p className="text-[13px] font-semibold">
                SS :{" "}
                <span className="bg-gray-200 px-3 py-0.5 rounded-md font-medium">
                  October - March
                </span>
              </p>
            </div>
          </div>
          {/* <Bar data={userData} /> */}
          <DashBoardBarChart />
        </div>
      </div>

      {/* top Twenty recent style add */}
      <div className="p-5">
        <section className="p-4 border bg-white rounded-md shadow-md">
          {/* header */}
          <p className="text-lg font-semibold pb-5">
            Recent Top Twenty Comment On Style
          </p>
          <TopTenStyleTable />
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
