/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal, SelectPicker } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import StyleImageUpload from "./uploads/StyleImageUpload";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetAllItemNamesQuery } from "../../redux/features/items/itemApi";
import { renderLoading } from "../renderLoading/RenderLoading";
import { useEditStyleMutation } from "../../redux/features/styles/styleApi";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { useGetAllFactoryNamesQuery } from "../../redux/features/factories/factoryApi";

const StyleEditModal = ({ styleEditData, open, handleClose }: any) => {
  const { data: items, isLoading: isLoadingItemNames } =
    useGetAllItemNamesQuery(null);

  const allItem = items?.data?.map((item: any) => ({
    label: item.itemName,
    value: item.itemId,
  }));

  const { data: factories, isLoading: isLoadingFactoryNames } =
    useGetAllFactoryNamesQuery(null);

  const allFactory = factories?.data?.map((factory: any) => ({
    label: factory.factoryName,
    value: factory.factoryId,
  }));

  const onSelectFactoryChange = (value: string | null): void => {
    setValue("factoryId", value as string);
  };

  interface IFormInput {
    styleNo: string;
    fabric: string;
    factoryId: string | null;
    itemId: string | null;
    file: FileType;
  }

  const [
    updateStyle,
    { isLoading: createLoading, error: createError, isError, isSuccess, reset },
  ] = useEditStyleMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const [file, setFile] = useState<FileType | undefined>(undefined);

  const handleUpdateStyle: SubmitHandler<IFormInput> = async (values) => {
    const obj = { ...values };
    const styleData = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file?.blobFile as Blob);
    formData.append("data", styleData);

    try {
      await updateStyle({ id: styleEditData?.styleNo, data: formData });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleChangeFile = (fileData: FileType | undefined) => {
    setFile(fileData);
  };
  const onSelectItemChange = (value: string | null): void => {
    setValue("itemId", value);
  };

  useEffect(() => {
    if (isError && !createLoading && !isSuccess) {
      toast.error(
        // @ts-ignore
        createError?.message || "Something went wrong",
        toastMessageError
      );
    }

    if (!isError && !createLoading && isSuccess) {
      reset();
      handleClose();
      toast.success("Successfully Updated Style", toastMessageSuccess);
    }
  }, [createError, createLoading, handleClose, isError, isSuccess, reset]);

  return (
    <>
      <Modal size="lg" backdrop={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className="font-bold text-lg pl-7">
            Edit Your Style - {styleEditData?.styleNo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="mt-5 bg-white border rounded-lg p-5 mb-10">
            <form onSubmit={handleSubmit(handleUpdateStyle)}>
              <div className="flex gap-[24px] mb-5">
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="styleNo" className="text-sm font-medium">
                    Style No
                  </label>
                  <input
                    defaultValue={styleEditData?.styleNo}
                    id="styleNo"
                    type="text"
                    disabled
                    {...register("styleNo")}
                    className=" disabled:shadow-inner border py-2 focus:outline-none px-2 border-[#E4E7EC] rounded-[8px]  "
                  />
                </div>
                {/* Fabric */}
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex justify-between items-center">
                    <label htmlFor="fabric" className="text-sm font-medium">
                      Fabric
                    </label>
                    {errors?.fabric && (
                      <span className="text-white text-xs bg-red-500 rounded-md px-2 py-0.5">
                        {errors?.fabric?.message}
                      </span>
                    )}
                  </div>
                  <input
                    defaultValue={styleEditData?.fabric}
                    id="fabric"
                    type="text"
                    {...register("fabric", {
                      required: "Fabric is required",
                      minLength: 3,
                    })}
                    className="border py-2 focus:outline-none px-2 border-[#E4E7EC] rounded-[8px]  "
                  />
                </div>
              </div>

              <div className="flex  gap-[24px] mb-5">
                {/* item name */}
                <div className="flex flex-col  gap-3 w-full ">
                  <label htmlFor="sku" className="text-sm font-medium">
                    Item Name
                  </label>
                  <SelectPicker
                    onChange={onSelectItemChange}
                    size="lg"
                    defaultValue={styleEditData?.item?.itemId || undefined}
                    menuMaxHeight={200}
                    data={allItem ?? []}
                    renderMenu={(menu) =>
                      renderLoading(menu, isLoadingItemNames)
                    }
                  />
                </div>
                <div className="flex flex-col gap-3  w-full mb-3">
                  <label htmlFor="sku" className="text-sm font-medium">
                    Factory Name
                  </label>
                  <SelectPicker
                    defaultValue={
                      styleEditData?.factory?.factoryId || undefined
                    }
                    onChange={onSelectFactoryChange}
                    size="lg"
                    menuMaxHeight={200}
                    data={allFactory}
                    renderMenu={(menu) =>
                      renderLoading(menu, isLoadingFactoryNames)
                    }
                  />
                </div>
              </div>

              <StyleImageUpload handleChangeFile={handleChangeFile} />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={createLoading}
                  className={`bg-[#0284c7] text-white rounded-md items-center   flex px-2.5 py-1`}
                >
                  {createLoading && (
                    <>
                      <svg
                        className="animate-spin h-5 w-5  mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.169 8.031l2-2.74zM20 12a8 8 0 01-8 8v4c3.627 0 9-5.373 9-12h-4zm-2-5.291l-2 2.74A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.86-3.169-8.031z"
                        ></path>
                      </svg>
                      <span>Updating...</span>
                    </>
                  )}

                  {!createLoading && <span>Update</span>}
                </button>
              </div>
            </form>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StyleEditModal;
