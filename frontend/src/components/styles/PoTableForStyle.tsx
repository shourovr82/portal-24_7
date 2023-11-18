/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

const PoTableForStyle = ({ orders }: any) => {
  return (
    <>
      <div className="">
        <div className="mt-1 flex flex-col">
          <div className="-my-2  overflow-x-auto ">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                        {/* <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                        >
                          PDF
                        </th> */}
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
                            {order.totalPack}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                            {order.totalPc}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                            {moment(order.buyerEtd).format("L")}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                            {moment(order.factoryEtd).format("L")}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                            backend
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium">
                            View
                          </td> */}
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
    </>
  );
};

export default PoTableForStyle;
