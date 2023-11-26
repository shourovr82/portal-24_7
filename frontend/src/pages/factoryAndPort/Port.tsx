/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateNewPortMutation } from "../../redux/features/ports/portsApi";
import toast from "react-hot-toast";
import PortList from "./PortList";
import { Button, Form, Input } from "rsuite";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { useEffect } from "react";

const Port = () => {
  const [
    createNewPort,
    {
      isLoading: createLoading,
      isError: isCreateError,
      error: createError,
      isSuccess,
      data: createData,
    },
  ] = useCreateNewPortMutation();
  interface IFormInput {
    portName: string;
    portAddress: string;
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IFormInput>();

  const handleCreatePort: SubmitHandler<IFormInput> = async (data) => {
    await createNewPort(data);
  };
  useEffect(() => {
    if (!!isSuccess && !isCreateError && !createLoading) {
      toast.success(
        createData?.message || "Successfully Created Port",
        toastMessageSuccess
      );

      reset({ portName: "", portAddress: "" });
    }
    if (!isSuccess && isCreateError && !createLoading) {
      toast.error(
        // @ts-ignore
        createError?.message || "Something went wrong",
        toastMessageError
      );
    }
  }, [createData, createError, createLoading, isCreateError, isSuccess, reset]);

  return (
    <div className="rounded-lg border bg-white shadow-md">
      <div className="p-3 border-b border-[#E4E7EC]">
        <h3 className="text-lg font-semibold flex items-center gap-1">Port</h3>
      </div>

      <form
        onSubmit={handleSubmit(handleCreatePort)}
        className="p-3 grid grid-cols-5 gap-3"
      >
        {/* Port name */}
        <div className="flex flex-col gap-2 col-span-2 ">
          <div>
            <label htmlFor="portName" className="text-sm font-medium">
              Port Name
            </label>
          </div>
          <Controller
            name="portName"
            control={control}
            rules={{ required: "Port Name is Required" }}
            render={({ field }: any) => (
              <div className="rs-form-control-wrapper ">
                <Input
                  size="lg"
                  {...field}
                  id="portName"
                  style={{ width: "100%" }}
                  placeholder="Enter Port Name..."
                  type="text"
                />
                <Form.ErrorMessage
                  show={
                    (!!errors?.portName && !!errors?.portName?.message) || false
                  }
                  placement="topEnd"
                >
                  {errors?.portName?.message}
                </Form.ErrorMessage>
              </div>
            )}
          />
        </div>
        {/* Port Address */}
        {/*  */}
        <div className="flex flex-col gap-2 col-span-3">
          <div className="grid grid-cols-6  items-end gap-1">
            {/* Port Address */}
            <div className="flex flex-col gap-2  w-full col-span-4 ">
              <div>
                <label htmlFor="portAddress" className="text-sm font-medium">
                  Port Address
                </label>
              </div>
              <Controller
                name="portAddress"
                control={control}
                rules={{ required: "Port Address is Required" }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <Input
                      size="lg"
                      {...field}
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
            {/* create button */}
            <div className="col-span-2">
              <Button
                loading={createLoading}
                type="submit"
                size="lg"
                appearance="default"
                className={`bg-[#0284c7] hover:bg-sky-700 focus:!bg-[#0284c7] focus-within:text-white hover:text-white justify-center text-white rounded-md items-center flex px-2.5 w-full`}
              >
                <span>Create</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div>
        <PortList />
      </div>
    </div>
  );
};

export default Port;
