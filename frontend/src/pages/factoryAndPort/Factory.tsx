/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateNewFactoryMutation } from "../../redux/features/factories/factoryApi";
import toast from "react-hot-toast";
import FactoryList from "./FactoryList";
import { useEffect } from "react";
import { Button, Form, Input } from "rsuite";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";

const Factory = () => {
  const [
    createNewFactory,
    {
      isLoading: createLoading,
      error: createError,
      isError: isCreateError,
      isSuccess,
      reset: resetRequestCreate,
    },
  ] = useCreateNewFactoryMutation();
  interface IFormInput {
    factoryName: string;
    factoryAddress: string;
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleCreateFactory: SubmitHandler<IFormInput> = async (data) => {
    await createNewFactory(data);
  };

  useEffect(() => {
    if (isSuccess && !isCreateError && !createLoading) {
      toast.success("Successfully Created Factory", toastMessageSuccess);
      reset({ factoryName: "", factoryAddress: "" });
      resetRequestCreate();
    }
    if (!isSuccess && isCreateError && !createLoading) {
      toast.error(
        // @ts-ignore
        createError?.message || "Something went wrong",
        toastMessageError
      );
    }
  }, [
    createError,
    createLoading,
    isCreateError,
    isSuccess,
    reset,
    resetRequestCreate,
  ]);

  return (
    <div className="rounded-lg border bg-white  shadow-md">
      <div className="p-3 border-b border-[#E4E7EC]">
        <h3 className="text-lg font-semibold flex items-center gap-1">
          Factory
        </h3>
      </div>

      {/* factory */}
      <form
        onSubmit={handleSubmit(handleCreateFactory)}
        className="p-3 grid grid-cols-5 gap-2"
      >
        {/* factory name */}
        <div className="flex flex-col gap-2 col-span-2 ">
          <div>
            <label htmlFor="factoryName" className="text-sm font-medium">
              Factory Name
            </label>
          </div>
          <Controller
            name="factoryName"
            control={control}
            rules={{ required: "Factory Name is Required" }}
            render={({ field }: any) => (
              <div className="rs-form-control-wrapper ">
                <Input
                  size="lg"
                  {...field}
                  id="factoryName"
                  style={{ width: "100%" }}
                  placeholder="Enter Factory Name..."
                  type="text"
                />
                <Form.ErrorMessage
                  show={
                    (!!errors?.factoryName && !!errors?.factoryName?.message) ||
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
        <div className="flex flex-col gap-2 col-span-3">
          <div className="grid grid-cols-6  items-end gap-1">
            {/* factory Address */}
            <div className="flex flex-col gap-2  w-full col-span-4 ">
              <div>
                <label htmlFor="factoryAddress" className="text-sm font-medium">
                  Factory Address
                </label>
              </div>
              <Controller
                name="factoryAddress"
                control={control}
                rules={{ required: "Factory Address is Required" }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <Input
                      size="lg"
                      {...field}
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
            {/* create button */}
            <div className="col-span-2">
              <Button
                loading={createLoading}
                type="submit"
                size="lg"
                appearance="default"
                className={`bg-[#0284c7] hover:bg-[#0284c7] focus:!bg-[#0284c7] focus:!text-white/80 hover:text-white/80  justify-center text-white rounded-md items-center   flex px-2.5 w-full`}
              >
                <span>Create</span>
              </Button>
            </div>
          </div>
        </div>
      </form>

      <div>
        <FactoryList />
      </div>
    </div>
  );
};

export default Factory;
