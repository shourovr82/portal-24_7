/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Form, Input, SelectPicker } from "rsuite";
import { useGetAllFactoryNamesQuery } from "../../redux/features/factories/factoryApi";
import {
  useFactoryAssignOnStyleMutation,
  useGetStyleNoQuery,
  useSingleStyleQuery,
} from "../../redux/features/styles/styleApi";

import { renderLoading } from "../../components/renderLoading/RenderLoading";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";

interface IFormInput {
  styleNo: string;
  factoryId: string;
}

const StyleAssign = () => {
  const { data: styles, isLoading: isLoadingStyles } = useGetStyleNoQuery(null);
  const { data: factories, isLoading: isLoadingFactoryNames } =
    useGetAllFactoryNamesQuery(null);

  // factory Assign
  const [
    factoryAssignOnStyle,
    {
      isLoading: assignLoading,
      isSuccess,
      isError: isAssignError,
      error: assignError,
    },
  ] = useFactoryAssignOnStyleMutation();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleCreateStyle: SubmitHandler<IFormInput> = async (data) => {
    await factoryAssignOnStyle(data);
  };

  const [styleValue, setStyleValue] = useState<string | null>(null);

  const { data: singleStyleRes, isLoading: isLoadingSingleStyle } =
    useSingleStyleQuery(
      {
        id: styleValue,
      },
      {
        skip: styleValue === null, // Skip the query when styleValue is null
      }
    );

  const { data: singleStyle } = singleStyleRes || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && !isAssignError && !assignLoading) {
      toast.success("Successfully Assigned", toastMessageSuccess);
      reset();
      navigate("/styles/listofstyle");
    }
    if (!isSuccess && isAssignError && !assignLoading) {
      toast.error(
        // @ts-ignore
        assignError?.message || "Something went wrong",
        toastMessageError
      );
    }
  }, [assignError, assignLoading, isAssignError, isSuccess, navigate, reset]);

  return (
    <>
      <div className="p-4 pb-10">
        <div className="">
          <div>
            <h2 className="text-2xl text-[#212B36] font-semibold">
              Assign a style
            </h2>
          </div>
        </div>

        {/* form */}
        <section className="mt-5 bg-white border rounded-lg p-5 mb-10">
          <div className="mb-6">
            <p className="text-lg font-medium">Please provide details</p>
          </div>
          <form onSubmit={handleSubmit(handleCreateStyle)}>
            <div className="flex  gap-[24px] mb-5">
              {/* Style No */}
              <div className="flex flex-col gap-2 w-full ">
                <div>
                  <label htmlFor="styleNo" className="text-sm font-medium">
                    Style No
                  </label>
                </div>
                <Controller
                  name="styleNo"
                  control={control}
                  defaultValue={""}
                  rules={{ required: "Style No is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        size="lg"
                        data={
                          styles?.data?.map((style: any) => ({
                            label: style.styleNo,
                            value: style.styleNo,
                          })) || []
                        }
                        value={field.value}
                        placement="bottom"
                        placeholder="Select Style No"
                        onClean={() => setStyleValue(null)}
                        onChange={(value: string | null) => {
                          field.onChange(value);
                          setStyleValue(value);
                        }}
                        style={{
                          width: "100%",
                        }}
                        renderMenu={(menu) =>
                          renderLoading(menu, isLoadingStyles)
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.styleNo && !!errors?.styleNo?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.styleNo?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3  w-full mb-3">
                <label htmlFor="sku" className="text-sm font-medium">
                  Factory Name
                </label>
                {styleValue &&
                singleStyle?.factory !== null &&
                singleStyle?.factory?.factoryName &&
                singleStyle?.factory?.factoryId ? (
                  <Input size="lg" value={singleStyle?.factory?.factoryName} />
                ) : (
                  <Controller
                    name="factoryId"
                    control={control}
                    defaultValue={""}
                    rules={{ required: "Factory is required" }}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <SelectPicker
                          loading={
                            isLoadingFactoryNames || isLoadingSingleStyle
                          }
                          size="lg"
                          data={
                            factories?.data?.map((factory: any) => ({
                              label: factory.factoryName,
                              value: factory.factoryId,
                            })) || []
                          }
                          value={field.value}
                          placement="bottom"
                          placeholder="Select Style No"
                          onChange={(value: string | null) => {
                            field.onChange(value);
                          }}
                          style={{
                            width: "100%",
                          }}
                          renderMenu={(menu) =>
                            renderLoading(menu, isLoadingStyles)
                          }
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.factoryId &&
                              !!errors?.factoryId?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          {errors?.factoryId?.message}
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                // appearance="primary"
                loading={assignLoading}
                size="lg"
                type="submit"
                disabled={styleValue && singleStyle?.factory?.factoryName}
                className={`bg-[#0284c7] hover:bg-sky-700 text-white hover:text-white focus-within:bg-sky-800 focus-within:text-white  rounded-md items-center flex px-3 py-1.5`}
              >
                <span>
                  {styleValue && singleStyle?.factory?.factoryName
                    ? "Already Assigned"
                    : "Assign"}
                </span>
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default StyleAssign;
