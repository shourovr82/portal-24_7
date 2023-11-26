/* eslint-disable @typescript-eslint/ban-ts-comment */
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

import { renderLoading } from "../renderLoading/RenderLoading";
import { useCreateNewPPStrikeOfStatusMutation } from "../../redux/features/ppStrikeOfStatus/ppStrikeOfStatusApi";

interface IFormInput {
  styleNo: string | null;
  ppStatusComment: string;
}

const AddPpStatusTextEditor = ({ isLoadingStyleNo, allStyle }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const [
    createNewPPStrikeOfStatus,
    {
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      isSuccess: isSuccessCreate,
      data: createData,
      error: createError,
    },
  ] = useCreateNewPPStrikeOfStatusMutation();

  const handlePPStatusComment: SubmitHandler<IFormInput> = async (
    data: IFormInput
  ) => {
    if (!data?.styleNo) {
      toast.error("Style No is Required", toastMessageError);
    } else {
      const ppStatusData = {
        styleNo: data?.styleNo,
        ppStatusComment: data?.ppStatusComment,
      };
      await createNewPPStrikeOfStatus(ppStatusData);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!isErrorCreate && !isLoadingCreate && isSuccessCreate && !createError) {
      toast.success(
        createData?.message || "Successfully Created PP Status.",
        toastMessageSuccess
      );
      navigate("/styles/listofstyle");
      reset();
    }
    if (isErrorCreate && createError && !isLoadingCreate && !isSuccessCreate) {
      toast.error(
        // @ts-ignore
        createError?.message || "Failed to create PP Status.",
        toastMessageError
      );
    }
  }, [
    createData?.message,
    createError,
    isErrorCreate,
    isLoadingCreate,
    isSuccessCreate,
    navigate,
    reset,
  ]);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">PP Status</h1>
      <form
        onSubmit={handleSubmit(handlePPStatusComment)}
        className="p-4 bg-white border rounded-lg"
      >
        {/* Style name */}
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

        {/* text editor of  pp status */}

        <div className="flex flex-col gap-3 w-full mt-2">
          <div>
            <label htmlFor="ppStatusComment" className="text-sm font-medium">
              PP Status
            </label>
          </div>

          <Controller
            name="ppStatusComment"
            control={control}
            rules={{
              required: "PP Strike Off Status is Required",
            }}
            render={({ field }: any) => (
              <div className="rs-form-control-wrapper ">
                <Input
                  id="ppStatusComment"
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
                    (!!errors?.ppStatusComment &&
                      !!errors?.ppStatusComment?.message) ||
                    false
                  }
                  placement="topEnd"
                >
                  {errors?.ppStatusComment?.message}
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
            className={`bg-[#0284c7] hover:bg-[#0284c7] hover:text-white/80 focus-within:scale-95 focus-within:bg-[#0284c7] focus:text-white text-white rounded items-center flex px-5 py-1 transition-all duration-300 ${
              isLoadingCreate ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add PP Status
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPpStatusTextEditor;
