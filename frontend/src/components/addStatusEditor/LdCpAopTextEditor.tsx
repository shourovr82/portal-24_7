/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, SelectPicker } from "rsuite";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import toast from "react-hot-toast";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { renderLoading } from "../renderLoading/RenderLoading";
import { useCreateNewLdCpAopStrikeOffStatusMutation } from "../../redux/features/ldCpAopStrikeOffStatus/ldCpAopStrikeOffStatus";

interface IFormInput {
  styleNo: string | null;
  ldCpAopStatusComment: string;
}

const LdCpAopTextEditor = ({ isLoadingStyleNo, allStyle }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const [
    createNewLdCpAopStrikeOffStatus,
    {
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      isSuccess: isSuccessCreate,
      data: createdData,
      error: createError,
    },
  ] = useCreateNewLdCpAopStrikeOffStatusMutation();

  const handleLdCpAopStatusComment: SubmitHandler<IFormInput> = async (
    data: IFormInput
  ) => {
    if (!data?.styleNo) {
      toast.error("Style No is Required", toastMessageError);
    } else {
      const ppStrikeOfStatus = {
        styleNo: data?.styleNo,
        ldCpAopStatusComment: data?.ldCpAopStatusComment,
      };
      await createNewLdCpAopStrikeOffStatus(ppStrikeOfStatus);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!isErrorCreate && !isLoadingCreate && isSuccessCreate && createdData) {
      toast.success(
        // createdData?.message ||
        "Successfully Created LD/CP/AOP Strike Off Status.",
        toastMessageSuccess
      );
      navigate("/styles/listofstyle");
      reset();
    }
    if (isErrorCreate && !isLoadingCreate && !isSuccessCreate) {
      toast.error(
        // @ts-ignore
        createError?.message || "Failed to create LD CP AOP Strike off Status.",
        toastMessageError
      );
    }
  }, [
    createError,
    createdData,
    isErrorCreate,
    isLoadingCreate,
    isSuccessCreate,
    navigate,
    reset,
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        LD/CP/AOP Strike Off Status
      </h1>
      <form
        onSubmit={handleSubmit(handleLdCpAopStatusComment)}
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
        {/* text editor of pp and bulk status */}

        <div className="flex flex-col gap-3 w-full mt-2">
          <div>
            <label
              htmlFor="ldCpAopStatusComment"
              className="text-sm font-medium"
            >
              LD/CP/AOP Strike Off Status
            </label>
          </div>

          <Controller
            name="ldCpAopStatusComment"
            control={control}
            rules={{
              required: "LD/CP/AOP Strike Off Status is Required",
            }}
            render={({ field }: any) => (
              <div className="rs-form-control-wrapper ">
                <Input
                  id="ldCpAopStatusComment"
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
                    (!!errors?.ldCpAopStatusComment &&
                      !!errors?.ldCpAopStatusComment?.message) ||
                    false
                  }
                  placement="topEnd"
                >
                  {errors?.ldCpAopStatusComment?.message}
                </Form.ErrorMessage>
              </div>
            )}
          />
        </div>

        {/* submit btn */}
        <div className="flex pt-5 justify-end">
          <button
            type="submit"
            disabled={isLoadingCreate}
            className={`bg-[#0284c7] hover:bg-sky-700 focus:bg-sky-800 text-white rounded items-center flex px-2.5 font-medium py-2 text-sm transition-all duration-300 ${
              isLoadingCreate ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoadingCreate && (
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
                <span>Processing...</span>
              </>
            )}

            {!isLoadingCreate && <span>Add LD/CP/AOP Status</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LdCpAopTextEditor;
