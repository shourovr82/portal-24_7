/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  Form,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { renderLoading } from "../renderLoading/RenderLoading";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useSingleStyleQuery } from "../../redux/features/styles/styleApi";
import moment from "moment";
import toast from "react-hot-toast";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import {
  useCreatePpSubmittedDateMutation,
  useTestPpSubmittedDateMutation,
} from "../../redux/features/ppSubmission/ppSubmissionDateApi";
import { useEffect, useState } from "react";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
interface IFormInput {
  styleNo: string | null;
  factorySubmittedDate: string | undefined;
}

const AddPpSubmitDate = ({ allStyle, isLoadingStyleNo }: any) => {
  const {
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const [testPpSubmittedDate, { isLoading, isError, isSuccess, error, data }] =
    useTestPpSubmittedDateMutation();

  const [styleValue, setStyleValue] = useState<string | null>(null);

  const { data: singleStyleRes } = useSingleStyleQuery(
    {
      id: styleValue,
    },
    {
      skip: styleValue === null, // Skip the query when styleValue is null
    }
  );

  const { data: singleStyle } = singleStyleRes || {};

  const handlePPSubmitDate: SubmitHandler<IFormInput> = async (
    data: IFormInput
  ) => {
    const submitData = {
      styleNo: data?.styleNo,
      factorySubmittedDate: data?.factorySubmittedDate,
    };
    await testPpSubmittedDate(submitData);
  };

  useEffect(() => {
    if (!isError && !isLoading && isSuccess && !error) {
      toast.success(
        data?.message || "Successfully Factory Date Submitted .",
        toastMessageSuccess
      );
      reset();

      setStyleValue(null);
    }
    if (isError && error && !isLoading && !isSuccess) {
      toast.error(
        // @ts-ignore
        error?.message || "Failed to Submit Factory Date.",
        toastMessageError
      );
    }
  }, [data, error, isError, isLoading, isSuccess, reset, setValue]);

  return (
    <section className="mt-5 bg-white border rounded-lg p-5 mb-10">
      <div className="mb-6">
        {/* <p className="text-lg font-semibold">PO Details</p> */}
        <p>Please provide submitted date on based of submission date:</p>
      </div>
      <form onSubmit={handleSubmit(handlePPSubmitDate)}>
        {/* 1st section */}
        <div className="flex justify-between  gap-[24px] mb-5">
          {/* Style No */}
          <div className="flex flex-col gap-3 w-full ">
            <div>
              <Whisper speaker={<Tooltip>Style No</Tooltip>}>
                <label htmlFor="styleNo" className="text-sm font-medium">
                  Style No <InfoOutlineIcon />
                </label>
              </Whisper>
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
                    placement="top"
                    placeholder="Select Style No"
                    onClean={() => setStyleValue(null)}
                    onChange={(value: string | null) => {
                      field.onChange(value);
                      setStyleValue(value);
                    }}
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

          {/* Factory Submission Date */}
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip> Factory Submission Date</Tooltip>}>
                <label
                  htmlFor="factorySubmissionDate"
                  className="text-sm font-medium"
                >
                  Factory Submission Date <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>

            <input
              id="factorySubmissionDate"
              type="text"
              value={
                singleStyle?.PPSubmission?.factorySubmissionDate &&
                styleValue !== null
                  ? moment(
                      singleStyle?.PPSubmission?.factorySubmissionDate
                    ).format("YYYY-MM-DD")
                  : "---"
              }
              className=" border py-2 focus:outline-none px-2 text-[#0284c7] border-[#E4E7EC] rounded-[8px]  "
            />
          </div>
          {/* PP Submitted Date */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-center">
              <div>
                <Whisper speaker={<Tooltip>Factory Submitted Date</Tooltip>}>
                  <label
                    htmlFor="factorySubmittedDate"
                    className="text-sm font-medium"
                  >
                    Factory Submitted Date <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
            </div>
            {singleStyle?.PPSubmission?.factorySubmittedDate &&
            styleValue !== null ? (
              <input
                type="text"
                value={
                  singleStyle?.PPSubmission?.factorySubmittedDate
                    ? moment(
                        singleStyle?.PPSubmission?.factorySubmittedDate
                      ).format("YYYY-MM-DD")
                    : "---"
                }
                className=" border py-2 focus:outline-none px-2 text-[#0284c7] border-[#E4E7EC] rounded-[8px]  "
              />
            ) : (
              <>
                <Controller
                  name="factorySubmittedDate"
                  control={control}
                  defaultValue={undefined}
                  rules={{ required: "Factory Submitted Date is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <DatePicker
                        id="factorySubmittedDate"
                        value={field.value ? new Date(field.value) : null}
                        onChange={(value: Date | null): void => {
                          if (value) {
                            const isoString = value.toISOString();
                            field.onChange(isoString);
                          } else {
                            field.onChange(null);
                          }
                        }}
                        style={{
                          width: "100%",
                        }}
                        size="lg"
                        placeholder="Factory Submit Date"
                        editable={false}
                        placement="top"
                      />
                      <Form.ErrorMessage
                        show={
                          !!errors?.factorySubmittedDate &&
                          !!errors?.factorySubmittedDate?.message
                        }
                        placement="topEnd"
                      >
                        {errors?.factorySubmittedDate?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            title={
              !singleStyle?.PPSubmission?.factorySubmissionDate
                ? "Factory Submission not found"
                : ""
            }
            loading={isLoading}
            disabled={
              !singleStyle?.PPSubmission?.factorySubmissionDate ||
              styleValue === null ||
              singleStyle?.PPSubmission?.factorySubmittedDate
            }
            type="submit"
            appearance={`${
              !singleStyle?.PPSubmission?.factorySubmissionDate ||
              styleValue === null ||
              singleStyle?.PPSubmission?.factorySubmittedDate
                ? "primary"
                : "default"
            }`}
            className={`  bg-[#0284c7] hover:bg-[#0284c7] hover:text-white/80 focus-within:bg-[#0284c7] focus-within:text-white text-white rounded-md  focus:scale-95 scale-100 items-center   flex px-6 py-2`}
          >
            {singleStyle?.PPSubmission?.factorySubmittedDate
              ? "PP Already Submitted"
              : "PP Submitted"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddPpSubmitDate;
