/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal } from "rsuite";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { useUpdateItemMutation } from "../../redux/features/items/itemApi";

interface IFormInput {
  itemName: string;
}

const ItemEditModal = ({ open, itemEditData, handleClose }: any) => {
  const [
    updateItem,
    {
      isLoading,
      isError,
      isSuccess,
      error,
      data: updateData,
      reset: resetRequestUpdate,
    },
  ] = useUpdateItemMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleUpdateItem: SubmitHandler<IFormInput> = async (data) => {
    const updatedItemData = {
      itemName: data?.itemName,
    };
    await updateItem({
      id: itemEditData?.itemId,
      data: updatedItemData,
    });
  };

  useEffect(() => {
    if (isSuccess && !error && !isLoading && !isError && updateData) {
      toast.success(
        updateData?.message || "Successfully Updated Item",
        toastMessageSuccess
      );
      resetRequestUpdate();
      handleClose();
    }
    if (!isSuccess && error && !isLoading && isError && !updateData) {
      toast.error(
        // @ts-ignore
        error?.message || "Something went wrong",
        toastMessageError
      );
    }
  }, [
    error,
    isLoading,
    isError,
    isSuccess,
    resetRequestUpdate,
    updateData,
    handleClose,
  ]);

  const handleCloseModal = () => {
    resetRequestUpdate();
    handleClose();
  };

  return (
    <div>
      <Modal
        backdrop="static"
        keyboard={false}
        open={open}
        onClose={handleCloseModal}
      >
        <Modal.Header>
          <Modal.Title>
            <h3 className="text-lg font-semibold flex items-center gap-1">
              Edit Item
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="rounded-lg border bg-white  ">
            {/* Item */}
            <form
              onSubmit={handleSubmit(handleUpdateItem)}
              className="p-3 grid grid-cols-5 gap-2"
            >
              {/* Item name */}
              <div className="flex flex-col gap-2 col-span-5 ">
                <div>
                  <label htmlFor="itemName" className="text-sm font-medium">
                    Item Name
                  </label>
                </div>
                <Controller
                  name="itemName"
                  control={control}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        defaultValue={itemEditData?.itemName}
                        id="itemName"
                        style={{ width: "100%" }}
                        placeholder="Enter Item Name..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.itemName && !!errors?.itemName?.message) ||
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

              <div className="flex justify-end mt-3 w-full gap-3 col-span-5">
                <Button
                  onClick={handleCloseModal}
                  appearance="default"
                  className="hover:bg-slate-300 font-medium bg-slate-200 border-0 text-slate-800 hover:text-slate-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isLoading}
                  appearance="default"
                  className="bg-[#0A78C3] text-white font-medium hover:text-white hover:bg-sky-800 focus:bg-[#0284c7] focus:text-white/50"
                >
                  Submit Changes
                </Button>
              </div>
            </form>
          </div>

          {/* modal Footer */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ItemEditModal;
