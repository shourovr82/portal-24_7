/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from "moment";
export default function CourierTableV2({ courier }: any) {
  return (
    <div className="px-8">
      <div className="mt-1 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-[#F4F6F8]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#637581] sm:pl-6 border-r"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                    >
                      Stye No
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                    >
                      Courier Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] border-r"
                    >
                      Air Way Bill No
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581]"
                    >
                      Parcel Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {courier?.length > 0 ? (
                    courier?.map((singleCourier: any) => (
                      <tr key={singleCourier.courierId}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-black font-medium sm:pl-6 border-r">
                          {moment(singleCourier.courierDate).format("ll")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                          {singleCourier.styleNo}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                          {singleCourier.courierName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium border-r">
                          {singleCourier.awbNo}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium">
                          {singleCourier.courierDetails}
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
  );
}
