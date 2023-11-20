/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Button, Input, Modal, SelectPicker, Tooltip, Whisper } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import toast from "react-hot-toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useGetAllItemNamesQuery } from "../../redux/features/items/itemApi";
import { renderLoading } from "../renderLoading/RenderLoading";
import { useEditStyleMutation } from "../../redux/features/styles/styleApi";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { useGetAllFactoryNamesQuery } from "../../redux/features/factories/factoryApi";
import StyleImageUpdateUpload from "./uploads/StyleImageUpdateUpload";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";

const StyleEditModal = ({ styleEditData, open, handleClose }: any) => {
  const { data: items, isLoading: isLoadingItemNames } =
    useGetAllItemNamesQuery(null);

  const { data: factories, isLoading: isLoadingFactoryNames } =
    useGetAllFactoryNamesQuery(null);

  interface IFormInput {
    styleNo: string;
    fabric: string;
    factoryId: string | null;
    itemId: string | null;
    file: FileType;
    isActiveStyle: string;
  }

  const [
    editStyle,
    {
      isLoading: createLoading,
      error: createError,
      isError,
      isSuccess,
      reset,
      data: updateData,
    },
  ] = useEditStyleMutation();

  const {
    handleSubmit,
    setValue,
    control,
    reset: formReset,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleUpdateStyle: SubmitHandler<IFormInput> = async (values) => {
    const formData = new FormData();

    formData.append("file", values?.file?.blobFile as Blob);

    const styleStatus =
      values.isActiveStyle === "Active"
        ? true
        : values?.isActiveStyle === "Paused"
        ? false
        : undefined;

    const obj = {
      fabric: values.fabric,
      factoryId: values.factoryId,
      itemId: values.itemId,
      isActiveStyle: styleStatus,
    };

    const styleData = JSON.stringify(obj);

    formData.append("data", styleData);

    await editStyle({ id: styleEditData?.styleNo, data: formData });
  };

  useEffect(() => {
    if (isError && !createLoading && !isSuccess && createError) {
      toast.error(
        // @ts-ignore
        createError?.message || "Something went wrong",
        toastMessageError
      );
      reset();
    }

    if (!isError && !createLoading && isSuccess && updateData) {
      toast.success(
        updateData?.message || "Successfully Updated Style",
        toastMessageSuccess
      );
      reset();
      handleClose();
      formReset();
    }
  }, [
    createError,
    createLoading,
    formReset,
    handleClose,
    isError,
    isSuccess,
    reset,
    updateData,
  ]);

  const handleCloseModal = () => {
    formReset();
    reset();
    handleClose();
  };

  return (
    <>
      <Modal size="lg" backdrop="static" open={open} onClose={handleCloseModal}>
        <Modal.Header>
          <Modal.Title className="font-bold text-lg pl-7">
            Edit Style
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className=" bg-white border rounded-lg px-5 py-2 ">
            <form onSubmit={handleSubmit(handleUpdateStyle)}>
              <div className="flex gap-[24px] mb-3">
                {/* Style No */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="styleNo" className="text-sm font-medium">
                    Style No
                  </label>

                  <Input
                    size="lg"
                    id="styleNo"
                    readOnly
                    defaultValue={styleEditData?.styleNo || undefined}
                    style={{ width: "100%" }}
                    placeholder="Style No..."
                    type="text"
                  />
                </div>
                {/* Fabric */}
                <div className="flex flex-col gap-2 w-full">
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="isActiveStyle"
                        className="text-sm  font-medium"
                      >
                        Style Status
                      </label>
                    </div>

                    <SelectPicker
                      size="lg"
                      data={["Active", "Paused"].map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      searchable={false}
                      defaultValue={
                        (styleEditData?.isActiveStyle && "Active") || undefined
                      }
                      onChange={(value: string | null) =>
                        setValue("isActiveStyle", value as string)
                      }
                      placeholder="Select Status"
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex  gap-[24px]">
                {/* item name */}
                <div className="flex flex-col  gap-2 w-full ">
                  <label htmlFor="sku" className="text-sm font-medium">
                    Item Name
                  </label>
                  <SelectPicker
                    onChange={(e) => setValue("itemId", e)}
                    size="lg"
                    cleanable={false}
                    defaultValue={styleEditData?.item?.itemId || undefined}
                    menuMaxHeight={200}
                    data={
                      items?.data?.map((item: any) => ({
                        label: item.itemName,
                        value: item.itemId,
                      })) ?? []
                    }
                    renderMenu={(menu) =>
                      renderLoading(menu, isLoadingItemNames)
                    }
                  />
                </div>
                <div className="flex flex-col gap-2  w-full mb-3">
                  <label htmlFor="sku" className="text-sm font-medium">
                    Factory Name
                  </label>
                  <SelectPicker
                    defaultValue={
                      styleEditData?.factory?.factoryId || undefined
                    }
                    onChange={(e) => setValue("factoryId", e)}
                    size="lg"
                    menuMaxHeight={200}
                    cleanable={false}
                    data={
                      factories?.data?.map((factory: any) => ({
                        label: factory.factoryName,
                        value: factory.factoryId,
                      })) || []
                    }
                    renderMenu={(menu) =>
                      renderLoading(menu, isLoadingFactoryNames)
                    }
                  />
                </div>
              </div>

              <div className=" mb-3  ">
                <div className="flex mb-2 justify-between items-center">
                  <label htmlFor="fabric" className="text-sm font-medium">
                    Fabric
                  </label>
                  {errors?.fabric && (
                    <span className="text-white text-xs bg-red-500 rounded-md px-2 py-0.5">
                      {errors?.fabric?.message}
                    </span>
                  )}
                </div>
                <Input
                  size="lg"
                  id="fabric"
                  defaultValue={styleEditData?.fabric || undefined}
                  onChange={(e) => setValue("fabric", e)}
                  style={{ width: "100%" }}
                  placeholder="Enter Fabric..."
                  type="text"
                />
              </div>
              {/* style image */}
              <div className=" w-full ">
                <div className="mb-3">
                  <Whisper
                    speaker={
                      <Tooltip>Style Image must be less than 512 kb</Tooltip>
                    }
                  >
                    <label htmlFor="file" className="text-sm font-medium">
                      Style Image <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="file"
                  control={control}
                  render={({ field }: any) => (
                    <StyleImageUpdateUpload
                      defaultImage={styleEditData?.image}
                      field={field}
                    />
                  )}
                />
              </div>

              <div className="flex justify-end  w-full gap-3 col-span-5">
                <Button
                  type="submit"
                  loading={createLoading}
                  appearance="default"
                  className="bg-[#0284c7] text-white hover:text-white/80 hover:bg-[#0284c7] focus:bg-[#0284c7] focus:text-white/50"
                >
                  Submit Changes
                </Button>
                <Button
                  onClick={handleCloseModal}
                  appearance="ghost"
                  className="hover:border-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StyleEditModal;
