/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Form, Input, SelectPicker, Tooltip, Whisper } from "rsuite";
import { useGetStyleNoQuery } from "../../redux/features/styles/styleApi";
import { renderLoading } from "../../components/renderLoading/RenderLoading";
import TackPackUploadPdf from "../../components/tackPack/uploads/TackPackUploadPdf";
import { FileType } from "rsuite/esm/Uploader";
import { useEffect } from "react";
import { useCreateTackPackMutation } from "../../redux/features/tackPack/tackPackApi";
import toast from "react-hot-toast";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { useNavigate } from "react-router-dom";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";

interface IFormInput {
  styleNo: string;
  tackPackComment: string;
  tackPackFile: FileType | undefined;
}

const TackPack = () => {
  // Fetching All Style
  const navigate = useNavigate();
  const { data: allStyles, isLoading: isLoadingStyleNo } =
    useGetStyleNoQuery(null);

  const styles = allStyles?.data?.map((style: any) => ({
    label: style?.styleNo,
    value: style?.styleNo,
  }));

  const [
    CreateTackPack,
    {
      isLoading: createLoading,
      isError: isCreateError,
      error: createError,
      isSuccess,
      data,
    },
  ] = useCreateTackPackMutation();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleCreateTackPack: SubmitHandler<IFormInput> = async (data) => {
    const obj = {
      styleNo: data.styleNo,
      tackPackComment: data.tackPackComment,
    };
    const tackPackData = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", data.tackPackFile?.blobFile as Blob);
    formData.append("data", tackPackData);
    //
    await CreateTackPack(formData);
  };

  useEffect(() => {
    if (isCreateError && !createLoading && !isSuccess) {
      toast.error(
        // @ts-ignore
        createError?.message || "Something went wrong",
        toastMessageError
      );
    }

    if (!isCreateError && !createLoading && isSuccess) {
      reset();
      navigate("/styles/listofstyle");

      toast.success(
        data?.message || "Successfully Created Tack pack",
        toastMessageSuccess
      );
    }
  }, [
    createError,
    createLoading,
    data,
    isCreateError,
    isSuccess,
    navigate,
    reset,
  ]);

  return (
    <>
      <div className="p-4 pb-10">
        <div className="">
          <div>
            <h2 className="text-2xl text-[#212B36] font-semibold">Tack pack</h2>
          </div>
        </div>

        {/* form */}
        <section className="mt-2 bg-white border rounded-lg p-5 mb-10">
          <div className="mb-3">
            <p>Please upload your tack pack of this style.</p>
          </div>
          <form onSubmit={handleSubmit(handleCreateTackPack)}>
            {/* style No */}
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
                      data={styles || []}
                      value={field.value}
                      onChange={(value: string | null) => field.onChange(value)}
                      style={{
                        width: "100%",
                      }}
                      renderMenu={(menu) =>
                        renderLoading(menu, isLoadingStyleNo)
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
              />{" "}
            </div>

            {/* tack  pack Comment */}

            <div className="flex flex-col gap-3 w-full mt-2">
              <div>
                <Whisper speaker={<Tooltip>Tack Pack Comment...</Tooltip>}>
                  <label
                    htmlFor="tackPackComment"
                    className="text-sm font-medium"
                  >
                    Tack Pack Comment <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="tackPackComment"
                control={control}
                rules={{ required: "Tack Pack Comment is Required" }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <Input
                      id="tackPackComment"
                      as="textarea"
                      rows={5}
                      size="lg"
                      {...field}
                      style={{ width: "100%" }}
                      placeholder="Write Something..."
                      type="text"
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.tackPackComment &&
                          !!errors?.tackPackComment?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      {errors?.tackPackComment?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>

            <div className=" w-full ">
              <div className="my-3">
                <Whisper
                  speaker={
                    <Tooltip>Tack File Pdf must be less than 1 MB</Tooltip>
                  }
                >
                  <label htmlFor="file" className="text-sm font-medium">
                    Tack Pack File <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="tackPackFile"
                control={control}
                rules={{ required: "Tack Pack File is required" }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <TackPackUploadPdf field={field} />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.tackPackFile &&
                          !!errors?.tackPackFile?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      {errors?.tackPackFile?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                disabled={createLoading}
                className={`bg-[#0284c7] text-white rounded-md items-center   flex px-5 py-1`}
              >
                {createLoading && (
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

                {!createLoading && <span>Create</span>}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default TackPack;
