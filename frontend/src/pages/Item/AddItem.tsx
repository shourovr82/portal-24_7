/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useCreateNewItemMutation,
  useGetAllItemsQuery,
} from "../../redux/features/items/itemApi";
import moment from "moment";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import noDataAnimation from "../../assets/animation/animation-nodata.json";
import { useEffect } from "react";
import { Button, Form, Input, Loader, Tooltip, Whisper } from "rsuite";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { useDebounced } from "../../redux/hook";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { getUserInfo } from "../../hooks/services/auth.service";
import { IUserDetails } from "../users/addUser.interface";
import { MdModeEdit } from "react-icons/md";

import ItemEditModal from "../../components/items/ItemEditModal";

const AddItem = () => {
  const query: Record<string, any> = {};

  const [searchTerm, setSearchTerm] = useState<string>("");

  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading, isError } = useGetAllItemsQuery({ ...query });
  const { data: allItems } = data || {};

  const [
    createNewItem,
    {
      isLoading: createLoading,
      error: createError,
      isSuccess,
      isError: isCreateError,
      data: createData,
    },
  ] = useCreateNewItemMutation();

  interface IFormInput {
    itemName: string;
  }
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await createNewItem(data);
    } catch (error) {
      //
      toast.error("Something went wrong");
    }
    // Check for success after the mutation has completed
  };

  useEffect(() => {
    if (isSuccess && !isCreateError && !createLoading) {
      toast.success(
        createData?.message || "Successfully Created new Item",
        toastMessageSuccess
      );

      reset();
    }
    if (!isSuccess && isCreateError && !createLoading) {
      toast.error(
        // @ts-ignore
        createError?.message || "Something went wrong",
        toastMessageError
      );
    }
  }, [createData, createError, createLoading, isCreateError, isSuccess, reset]);

  const { role } = getUserInfo() as IUserDetails;

  const [itemEditOpen, setItemEditOpen] = useState<boolean>(false);
  const [itemEditData, setItemEditData] = useState<any>(null);

  const handleItemEditModalOpen = (data: any) => {
    setItemEditOpen(true);
    setItemEditData(data);
  };

  const handleEditModalClose = () => {
    setItemEditOpen(false);
    setItemEditData(null);
  };

  return (
    <>
      <div className="p-4 ">
        <div className="">
          <div>
            <h2 className="text-2xl text-[#212B36] font-semibold">
              Create a new Item
            </h2>
          </div>
        </div>

        {/* form */}
        <section className="mt-5 bg-white border rounded-lg p-5 mb-5">
          <div className="mb-6">
            <p className="text-lg font-semibold">Item Details</p>
            <p>Please provide details of item.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 1st section */}
            <div className=" gap-[24px] mb-5">
              {/* First Name */}
              <div className=" w-full flex gap-5  items-end">
                <div className="flex flex-col gap-3 w-[50%] ">
                  <div>
                    <Whisper speaker={<Tooltip>Item Name </Tooltip>}>
                      <label htmlFor="itemName" className="text-sm font-medium">
                        Item Name <InfoOutlineIcon />
                      </label>
                    </Whisper>
                  </div>

                  <Controller
                    name="itemName"
                    defaultValue=""
                    control={control}
                    rules={{ required: "Item Name is Required" }}
                    render={({ field }: any) => (
                      <div className="rs-form-control-wrapper ">
                        <Input
                          size="lg"
                          {...field}
                          id="itemName"
                          style={{ width: "100%" }}
                          placeholder="Enter Item Name..."
                          type="text"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.itemName &&
                              !!errors?.itemName?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          {errors?.itemName?.message}
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    loading={createLoading}
                    size="lg"
                    className={`text-white font-medium hover:text-white text-sm h-full bg-[#0284c7] hover:bg-sky-700 focus:bg-[#0284c7] focus:text-white items-center flex px-3 py-[11px]`}
                  >
                    Create New Item
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* list of item section */}
        <div className=" border rounded-lg p-3 bg-white">
          <div className="grid grid-cols-5 justify-between items-center pb-3">
            <div className="col-span-2">
              <h2 className="text-lg font-semibold py-1.5">List Of Items</h2>
            </div>
            <div className="col-span-3">
              <input
                onChange={(e: any) => setSearchTerm(e.target.value)}
                id="searchTerm"
                name="searchTerm"
                type="text"
                placeholder="Search by Item Name...."
                className="border py-2 w-full focus:outline-none px-2 border-[#E4E7EC] rounded-[8px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 items-center justify-between rounded-lg   ">
            {allItems?.length
              ? allItems.map((singleItem: any) => (
                  <div
                    key={Math.random()}
                    className="grid grid-cols-3 py-4 px-5 border items-center"
                  >
                    <p key={Math.random()}>{singleItem?.itemName}</p>
                    <p className="text-xs text-slate-600">
                      {moment(singleItem?.createdAt).format("DD, MMM, YYYY h:mm A")}
                    </p>

                    {role !== "USER" && (
                      <MdModeEdit
                        className="text-xl text-gray-600 cursor-pointer justify-self-end"
                        onClick={() => handleItemEditModalOpen(singleItem)}
                      />
                    )}
                  </div>
                ))
              : ""}

            {!isLoading && !isError && !allItems?.length && (
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
        </div>
        {/* Item Edit Modal */}
        <ItemEditModal
          open={itemEditOpen}
          itemEditData={itemEditData}
          handleClose={handleEditModalClose}
        />
      </div>
    </>
  );
};

export default AddItem;
