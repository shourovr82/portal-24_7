/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal } from "rsuite";
import { useUpdateFactoryMutation } from "../../redux/features/factories/factoryApi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";

interface IFormInput {
  factoryName: string;
  factoryAddress: string;
}

const FactoryEditModal = ({ open, factoryEditData, handleClose }: any) => {
  const [
    updateFactory,
    {
      isLoading,
      isError,
      isSuccess,
      error,
      data: updateData,
      reset: resetRequestUpdate,
    },
  ] = useUpdateFactoryMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleUpdateFactory: SubmitHandler<IFormInput> = async (data) => {
    const updatedFactoryData = {
      factoryName: data?.factoryName,
      factoryAddress: data?.factoryAddress,
    };
    await updateFactory({
      id: factoryEditData?.factoryId,
      data: updatedFactoryData,
    });
  };

  useEffect(() => {
    if (isSuccess && !error && !isLoading && !isError && updateData) {
      toast.success(
        updateData?.message || "Successfully Updated Factory",
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

  return (
    <div>
      <Modal
        backdrop="static"
        keyboard={false}
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title>
            <h3 className="text-lg font-semibold flex items-center gap-1">
              Edit Factory : {factoryEditData?.factoryName}
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/*  */}

          <div className="rounded-lg border bg-white  ">
            {/* factory */}
            <form
              onSubmit={handleSubmit(handleUpdateFactory)}
              className="p-3 grid grid-cols-5 gap-2"
            >
              {/* factory name */}
              <div className="flex flex-col gap-2 col-span-5 ">
                <div>
                  <label htmlFor="factoryName" className="text-sm font-medium">
                    Factory Name
                  </label>
                </div>
                <Controller
                  name="factoryName"
                  control={control}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        defaultValue={factoryEditData?.factoryName}
                        id="factoryName"
                        style={{ width: "100%" }}
                        placeholder="Enter Factory Name..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.factoryName &&
                            !!errors?.factoryName?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.factoryName?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* others */}
              <div className="flex flex-col gap-2 col-span-5">
                {/* factory Address */}

                <div>
                  <label
                    htmlFor="factoryAddress"
                    className="text-sm font-medium"
                  >
                    Factory Address
                  </label>
                </div>
                <Controller
                  name="factoryAddress"
                  control={control}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        defaultValue={factoryEditData?.factoryAddress}
                        id="factoryAddress"
                        style={{ width: "100%" }}
                        placeholder="Enter Factory Address..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.factoryAddress &&
                            !!errors?.factoryAddress?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.factoryAddress?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              <div className="flex justify-end mt-3 w-full gap-3 col-span-5">
                <Button
                  type="submit"
                  loading={isLoading}
                  appearance="default"
                  className="bg-[#0284c7] text-white hover:text-white/80 hover:bg-[#0284c7] focus:bg-[#0284c7] focus:text-white/50"
                >
                  Submit Changes
                </Button>
                <Button
                  onClick={handleClose}
                  appearance="ghost"
                  className="hover:border-transparent"
                >
                  Cancel
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

export default FactoryEditModal;
