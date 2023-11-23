/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-boolean-cast */
import { useGetAllUsersQuery } from "../../redux/features/users/userApi";
import { useDebounced } from "../../redux/hook";
import { useState } from "react";
import { IconButton, Popover, SelectPicker, Whisper } from "rsuite";
import { HiOutlineEye } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import UserDetailsModal from "../../components/users/UserDetailsModal";
import UserEditModal from "./UserEditModal";
import { fileUrlKey } from "../../config/envConfig";

const UserLists = () => {
  const query: Record<string, any> = {};
  // const [page, setPage] = useState<number>(1);
  // const [size, setSize] = useState<number>(30);
  // const [sortBy, setSortBy] = useState<string>("");
  // const [sortOrder, setSortOrder] = useState<SortType>("desc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );

  //
  // query["limit"] = size;
  // query["page"] = page;
  // query["sortBy"] = sortBy;
  // query["sortOrder"] = sortOrder;
  query["role"] = selectedRole;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const {
    data: allUsersRes,
    isLoading,
    isError,
  } = useGetAllUsersQuery({ ...query });
  const [userDetails, setUserDetails] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const { data: allUsers } = allUsersRes || {};

  return (
    <>
      <div className="  bg-white  shadow-md  m-5 pb-10 rounded-2xl">
        <header className="px-8 text-2xl font-semibold p-3">Users List</header>

        <div className="mx-8 mb-5">
          <div className="grid grid-cols-5 gap-4">
            <div className="w-full col-span-3">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <BiSearchAlt size="1.6em" color="#91a0b0" />
                </div>
                <input
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  type="text"
                  id="voice-search"
                  className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB]   w-full pl-10 p-2.5 py-2 rounded-lg focus:outline-none"
                  placeholder="Search ..."
                  required
                />
              </div>
            </div>

            <div className=" w-full col-span-1">
              <SelectPicker
                size="lg"
                data={[
                  {
                    label: "Active",
                    value: "Active",
                  },
                  {
                    label: "Paused",
                    value: "Paused",
                  },
                  {
                    label: "Suspended",
                    value: "Suspended",
                  },
                ]}
                onChange={(value: string | null): void =>
                  setSelectedRole(value as string)
                }
                onClean={() => setSelectedRole(undefined)}
                style={{ width: "100%" }}
                searchable={false}
                placeholder="Filter By Role"
              />
            </div>

            <div className=" w-full col-span-1">
              <SelectPicker
                size="lg"
                data={[
                  {
                    label: "USER",
                    value: "USER",
                  },
                  {
                    label: "ADMIN",
                    value: "ADMIN",
                  },
                  {
                    label: "SUPER_ADMIN",
                    value: "SUPER_ADMIN",
                  },
                ]}
                onChange={(value: string | null): void =>
                  setSelectedRole(value as string)
                }
                onClean={() => setSelectedRole(undefined)}
                style={{ width: "100%" }}
                searchable={false}
                placeholder="Filter By Role"
              />
            </div>
          </div>
        </div>

        <div className="px-8">
          <div className="mt-1 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden  md:rounded-lg">
                  <table className="min-w-full ">
                    <thead className="bg-[#f4f4f5] ">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#637581] sm:pl-6 "
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] "
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] "
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-[#637581] "
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" bg-white">
                      {!!allUsers?.data?.length &&
                        allUsers?.data?.map((singleUser: any) => (
                          <tr key={Math.random()}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-black font-medium sm:pl-6 ">
                              <div className="flex  gap-2">
                                <div>
                                  <img
                                    src={`${fileUrlKey()}/${
                                      singleUser?.profile?.profileImage
                                    }`}
                                    className="w-12 h-12 object-cover  rounded-xl"
                                  />
                                </div>
                                <div className="flex flex-col  ">
                                  <h2 className="text-lg">
                                    {singleUser?.profile?.firstName}{" "}
                                    {singleUser?.profile?.lastName}
                                  </h2>
                                  <p className="text-[#bbbbc1] text-sm">
                                    {singleUser?.email}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium ">
                              <div className="flex flex-col ">
                                <span>{singleUser?.profile?.role}</span>

                                <span className="text-[#afafb7]">
                                  Management
                                </span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap py-4  pr-3 text-sm text-black font-medium sm:pl-2 ">
                              <span
                                className={`${
                                  singleUser?.userStatus === "Active" &&
                                  "bg-[#198f51] text-white"
                                }  
                                ${
                                  singleUser?.userStatus === "Paused" &&
                                  "bg-[#ffec43] text-yellow-800"
                                }
                                ${
                                  singleUser?.userStatus === "Suspended" &&
                                  "bg-red-800 text-white"
                                }
                                px-3 py-1.5 rounded-full
                                `}
                              >
                                {singleUser?.userStatus}
                              </span>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-medium ">
                              <div>
                                <Whisper
                                  placement="topEnd"
                                  speaker={
                                    <Popover
                                      className="border bg-[#237de1] text-white rounded-full py-1.5  px-5"
                                      arrow={false}
                                    >
                                      Details
                                    </Popover>
                                  }
                                >
                                  <IconButton
                                    onClick={() => {
                                      setOpenDetails(true);
                                      setUserDetails(singleUser);
                                    }}
                                    circle
                                    icon={<HiOutlineEye size={20} />}
                                  />
                                </Whisper>
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
                                    onClick={() => {
                                      setEditUser(singleUser);
                                      setOpenEdit(true);
                                    }}
                                    circle
                                    icon={<RiEdit2Line size={20} />}
                                  />
                                </Whisper>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {!isLoading && !isError && !allUsers?.data?.length && (
                    <div className="mt-5 flex py-10 justify-center ">
                      <p className="font-medium text-slate-500">
                        No Users Found !!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <>
        <UserDetailsModal
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
          userDetails={userDetails}
        />
      </>
      {/* edit user */}
      <UserEditModal
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        editUser={editUser}
      />
    </>
  );
};

export default UserLists;
