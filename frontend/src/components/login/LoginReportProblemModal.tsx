/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Message, SelectPicker, useToaster } from "rsuite";
import { ProblemReportIssues } from "../../constants";
import { Controller, useForm } from "react-hook-form";
import { IAddReportToAdmin } from "../../pages/users/addUser.interface";
import { useCreateNewProblemMutation } from "../../redux/features/reportedProblems/reportedProblemsApi";
import { useEffect } from "react";

const LoginReportProblemModal = ({ handleClose }: any) => {
  const toaster = useToaster();
  const [
    createNewProblem,
    { data, isLoading, isSuccess, isError, reset, error },
  ] = useCreateNewProblemMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<IAddReportToAdmin>();
  const handleReportProblemToAdmin = async (
    newProblemData: IAddReportToAdmin
  ) => {
    await createNewProblem(newProblemData);
  };
  useEffect(() => {
    if (isSuccess && !isLoading && !isError) {
      toaster.push(
        <Message showIcon type="success" closable>
          {data?.message || "Successfully reported"}
        </Message>,
        { placement: "topEnd", duration: 5000 }
      );
      handleClose();
      reset();

      resetForm();
    }
    if (!isSuccess && !isLoading && isError) {
      toaster.push(
        <Message showIcon type="error" closable>
          {
            // @ts-ignore
            error?.message || "Failed to report"
          }
        </Message>,
        { placement: "topEnd", duration: 5000 }
      );
      handleClose();
      reset();

      resetForm();
    }
  }, [
    data?.message,
    // @ts-ignore
    error?.message,
    handleClose,
    isError,
    isLoading,
    isSuccess,
    reset,
    resetForm,
    toaster,
  ]);
  return (
    <div>
      <form onSubmit={handleSubmit(handleReportProblemToAdmin)}>
        <div className="space-y-4 px-1">
          {/* select issue */}
          <div>
            <label htmlFor="">
              Select your issue <span className="text-red-600">*</span>
            </label>
            <div>
              <Controller
                name="issueName"
                control={control}
                rules={{ required: "Issue Name is Required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <SelectPicker
                      {...field}
                      placeholder="Select your issue..."
                      searchable={false}
                      data={ProblemReportIssues}
                      className="!w-full"
                      menuMaxHeight={200}
                    />

                    <Form.ErrorMessage
                      show={
                        (!!errors?.issueName && !!errors?.issueName?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      {errors?.issueName?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
          {/* email */}
          <div>
            <label htmlFor="">
              Your Email Address <span className="text-red-600">*</span>
            </label>
            <Controller
              name="emailAddress"
              control={control}
              rules={{
                required: "Email Address is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please provide your valid email",
                },
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <Input
                    {...field}
                    className="!w-full"
                    placeholder="Your Email Address..."
                    type="text"
                  />

                  <Form.ErrorMessage
                    show={
                      (!!errors?.emailAddress &&
                        !!errors?.emailAddress?.message) ||
                      false
                    }
                    placement="topEnd"
                  >
                    {errors?.emailAddress?.message}
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
          {/*  description*/}
          <div className="space-y-2">
            <label htmlFor="">
              Description about your problem{" "}
              <span className="text-red-600">*</span>
            </label>{" "}
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is Required" }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper  ">
                  <Input
                    {...field}
                    as="textarea"
                    className="!w-full "
                    placeholder="Description about your issue..."
                    rows={4}
                  />

                  <Form.ErrorMessage
                    show={
                      (!!errors?.description &&
                        !!errors?.description?.message) ||
                      false
                    }
                    placement="topEnd"
                  >
                    {errors?.description?.message}
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
          {/* submit and cancel */}
          <div className="pt-2 flex *:duration-300 *:rounded-xl justify-end gap-5 items-center">
            <button
              onClick={handleClose}
              className="!border px-5 py-2 hover:border-transparent 
         text-center hover:bg-[#2a2e573b]"
            >
              Cancel
            </button>
            <Button
              type="submit"
              loading={isLoading}
              className="border px-5 py-2.5 hover:text-white text-white
         text-center bg-[#0d1065e0] hover:bg-[#0d1065] 
         focus-within:bg-[#0d1065] focus-within:text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginReportProblemModal;
