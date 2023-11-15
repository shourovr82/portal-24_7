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
import { useUpdatePortMutation } from "../../redux/features/ports/portsApi";

interface IFormInput {
  portName: string;
  portAddress: string;
}

const PortEditModal = ({ open, portEditData, handleClose }: any) => {
  const [
    updatePort,
    {
      isLoading,
      isError,
      isSuccess,
      error,
      data: updateData,
      reset: resetRequestUpdate,
    },
  ] = useUpdatePortMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleUpdatePort: SubmitHandler<IFormInput> = async (data) => {
    const updatedPortData = {
      portName: data?.portName,
      portAddress: data?.portAddress,
    };
    await updatePort({
      id: portEditData?.portId,
      data: updatedPortData,
    });
  };

  useEffect(() => {
    if (isSuccess && !error && !isLoading && !isError && updateData) {
      toast.success(
        updateData?.message || "Successfully Updated Port",
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
              Edit Port : {portEditData?.portName}
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/*  */}

          <div className="rounded-lg border bg-white  ">
            {/* Port */}
            <form
              onSubmit={handleSubmit(handleUpdatePort)}
              className="p-3 grid grid-cols-5 gap-2"
            >
              {/* Port name */}
              <div className="flex flex-col gap-2 col-span-5 ">
                <div>
                  <label htmlFor="portName" className="text-sm font-medium">
                    Port Name
                  </label>
                </div>
                <Controller
                  name="portName"
                  control={control}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        defaultValue={portEditData?.portName}
                        id="portName"
                        style={{ width: "100%" }}
                        placeholder="Enter Port Name..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.portName && !!errors?.portName?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.portName?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* others */}
              <div className="flex flex-col gap-2 col-span-5">
                {/* Port Address */}

                <div>
                  <label htmlFor="portAddress" className="text-sm font-medium">
                    Port Address
                  </label>
                </div>
                <Controller
                  name="portAddress"
                  control={control}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        defaultValue={portEditData?.portAddress}
                        id="portAddress"
                        style={{ width: "100%" }}
                        placeholder="Enter Port Address..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.portAddress &&
                            !!errors?.portAddress?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.portAddress?.message}
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

export default PortEditModal;