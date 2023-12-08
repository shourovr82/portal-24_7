/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, SelectPicker } from "rsuite";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNewBulkProductionOfStatusMutation } from "../../redux/features/bulkProductionOfStatus/bulkProductionOfStatusApi";
import { renderLoading } from "../renderLoading/RenderLoading";

const BulkStatusEditor = ({ isLoadingStyleNo, allStyle }: any) => {
  interface IFormInput {
    styleNo: string | null;
    bulkProductionComment: string;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const [
    createNewBulkProductionOfStatus,
    {
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      isSuccess: isSuccessCreate,
      data: createData,
      error: createError,
    },
  ] = useCreateNewBulkProductionOfStatusMutation();

  const handleBulkProductionStatusComment: SubmitHandler<IFormInput> = async (
    data: IFormInput
  ) => {
    if (!data?.styleNo) {
      toast.error("Style No is Required", toastMessageError);
    } else {
      const bulkProductionStatus = {
        styleNo: data?.styleNo,
        bulkProductionComment: data?.bulkProductionComment,
      };
      await createNewBulkProductionOfStatus(bulkProductionStatus);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!isErrorCreate && !isLoadingCreate && isSuccessCreate && !createError) {
      toast.success(
        createData?.message ||
          "Successfully Created New Bulk Production Status.",
        toastMessageSuccess
      );
      navigate("/styles/listofstyle");
      reset();
    }
    if (isErrorCreate && !isLoadingCreate && createError && !isSuccessCreate) {
      toast.error(
        // @ts-ignore
        createError?.message || "Failed to create Bulk Production Status.",
        toastMessageError
      );
    }
  }, [
    createError,
    isErrorCreate,
    isLoadingCreate,
    isSuccessCreate,
    navigate,
    reset,
  ]);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">Bulk Production Status</h1>
      <form
        onSubmit={handleSubmit(handleBulkProductionStatusComment)}
        className="p-4 bg-white border rounded-lg"
      >
        {/* Style No  */}
        <div className="flex flex-col gap-3 w-full mb-5">
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
                  data={allStyle || []}
                  value={field.value}
                  onChange={(value: string | null) => field.onChange(value)}
                  style={{
                    width: "100%",
                  }}
                  renderMenu={(menu) => renderLoading(menu, isLoadingStyleNo)}
                />
                <Form.ErrorMessage
                  show={
                    (!!errors?.styleNo && !!errors?.styleNo?.message) || false
                  }
                  placement="topEnd"
                >
                  {errors?.styleNo?.message}
                </Form.ErrorMessage>
              </div>
            )}
          />{" "}
        </div>
        {/* text editor of  bulk status */}
        <div className="flex flex-col gap-3 w-full mt-2">
          <div>
            <label
              htmlFor="bulkProductionComment"
              className="text-sm font-medium"
            >
              Bulk Production Status
            </label>
          </div>

          <Controller
            name="bulkProductionComment"
            control={control}
            rules={{
              required: "Bulk Production Status is Required",
            }}
            render={({ field }: any) => (
              <div className="rs-form-control-wrapper ">
                <Input
                  id="bulkProductionComment"
                  as="textarea"
                  rows={6}
                  size="lg"
                  {...field}
                  style={{ width: "100%" }}
                  placeholder="Write Something..."
                  type="text"
                />
                <Form.ErrorMessage
                  show={
                    (!!errors?.bulkProductionComment &&
                      !!errors?.bulkProductionComment?.message) ||
                    false
                  }
                  placement="topEnd"
                >
                  {errors?.bulkProductionComment?.message}
                </Form.ErrorMessage>
              </div>
            )}
          />
        </div>

        {/* submit btn */}
        <div className="flex pt-5 justify-end">
          <Button
            type="submit"
            size="lg"
            loading={isLoadingCreate}
            className={`bg-[#0284c7] hover:bg-sky-700 hover:text-white focus-within:bg-sky-800 focus:text-white text-white rounded items-center flex px-2.5 font-medium py-2 ${
              isLoadingCreate ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add Bulk Status
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BulkStatusEditor;
