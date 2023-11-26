/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Form, Input, SelectPicker, Tooltip, Whisper } from "rsuite";
import { useGetAllItemNamesQuery } from "../../redux/features/items/itemApi";
import { useCreateNewStyleMutation } from "../../redux/features/styles/styleApi";
import { useEffect } from "react";
import { renderLoading } from "../../components/renderLoading/RenderLoading";
import StyleImageUpload from "../../components/styles/uploads/StyleImageUpload";
import { FileType } from "rsuite/esm/Uploader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";

const AddStyle = () => {
  const { data: items, isLoading: isLoadingItemNames } =
    useGetAllItemNamesQuery(null);

  const allItem = items?.data?.map((item: any) => ({
    label: item.itemName,
    value: item.itemId,
  }));

  interface IFormInput {
    styleNo: string;
    fabric: string;
    factoryId: string | null;
    itemId: string | null;
    file: FileType;
  }
  const navigate = useNavigate();

  const [
    createNewStyle,
    {
      isLoading: createLoading,
      error: createError,
      isError,

      isSuccess,
      data: createData,
    },
  ] = useCreateNewStyleMutation();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleCreateStyle: SubmitHandler<IFormInput> = async (values) => {
    const formData = new FormData();
    formData.append("file", values.file.blobFile as Blob);

    const obj = {
      styleNo: values.styleNo,
      fabric: values.fabric,
      factoryId: values.factoryId,
      itemId: values.itemId,
    };

    const styleData = JSON.stringify(obj);

    formData.append("data", styleData);

    await createNewStyle(formData);
  };

  useEffect(() => {
    if (isError && !createLoading && !isSuccess && createError && !createData) {
      toast.error(
        // @ts-ignore
        createError?.message || "Something went wrong",
        toastMessageError
      );
    }

    if (!isError && !createLoading && isSuccess && createData && !createError) {
      reset({
        fabric: "",
        factoryId: "",
        file: undefined,
        itemId: "",
        styleNo: "",
      });
      navigate("/styles/listofstyle");
      toast.success(
        createData?.message || "Successfully Created New Style",
        toastMessageSuccess
      );
    }
  }, [
    createData,
    createError,
    createLoading,
    isError,
    isSuccess,
    navigate,
    reset,
  ]);

  return (
    <>
      <div className="p-4 pb-10">
        <div className="">
          <div>
            <h2 className="text-2xl text-[#212B36] font-semibold">
              Create a new style
            </h2>
          </div>
        </div>

        {/* form */}
        <section className="mt-5 bg-white border rounded-lg p-5 mb-10">
          <div className="mb-6">
            <p className="text-lg font-semibold">Style Details</p>
            <p>Please provide details of this product.</p>
          </div>
          <form onSubmit={handleSubmit(handleCreateStyle)}>
            <div className="grid grid-cols-4 gap-3 mb-5">
              {/* style No */}
              <div className="flex flex-col gap-3 col-span-2 w-full ">
                <div>
                  <Whisper
                    speaker={
                      <Tooltip>
                        Style No must be unique, and once entered, it cannot be
                        modified.
                      </Tooltip>
                    }
                  >
                    <label htmlFor="styleNo" className="text-sm font-medium">
                      Style No <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>

                <Controller
                  name="styleNo"
                  control={control}
                  rules={{ required: "Style No is required" }}
                  render={({ field }: any) => (
                    <Whisper
                      trigger="focus"
                      speaker={
                        <Tooltip>Style No never can be editable</Tooltip>
                      }
                    >
                      <div className="rs-form-control-wrapper ">
                        <Input
                          size="lg"
                          {...field}
                          id="styleNo"
                          className="text-slate-900"
                          style={{ width: "100%" }}
                          placeholder="Enter Style No..."
                          type="text"
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
                    </Whisper>
                  )}
                />
              </div>

              {/* item name */}
              <div className="flex flex-col gap-3 col-span-2 w-full ">
                <div>
                  <Whisper
                    speaker={
                      <Tooltip>
                        Enter the name or description of the item being imported
                        or exported.
                      </Tooltip>
                    }
                  >
                    <label htmlFor="itemId" className="text-sm font-medium">
                      Item Name <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="itemId"
                  control={control}
                  defaultValue={""}
                  rules={{ required: "Item Name is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        size="lg"
                        data={allItem ?? []}
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Item"
                        renderMenu={(menu) =>
                          renderLoading(menu, isLoadingItemNames)
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.itemId && !!errors?.itemId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.itemId?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />{" "}
              </div>
              {/* Fabric */}
              <div className="flex flex-col col-span-4 gap-3 w-full ">
                <div>
                  <Whisper
                    speaker={
                      <Tooltip>
                        Enter the type of fabric used for the product.
                      </Tooltip>
                    }
                  >
                    <label htmlFor="fabric" className="text-sm font-medium">
                      Fabric <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>

                <Controller
                  name="fabric"
                  control={control}
                  rules={{ required: "Fabric is required" }}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        id="fabric"
                        className="text-slate-900"
                        style={{ width: "100%" }}
                        placeholder="Enter Fabric..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.fabric && !!errors?.fabric?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.fabric?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
            {/* Style Image */}
            <div className=" w-full ">
              <div className="mb-3">
                <Whisper
                  speaker={
                    <Tooltip>Style Image must be less than 1 MB</Tooltip>
                  }
                >
                  <label htmlFor="file" className="text-sm font-medium">
                    Style Image <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="file"
                control={control}
                rules={{ required: "Style Image is required" }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <StyleImageUpload field={field} />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.file && !!errors?.file?.message) || false
                      }
                      placement="topEnd"
                    >
                      {errors?.file?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                loading={createLoading}
                className={`bg-[#0284c7] hover:bg-sky-700 focus:bg-sky-900 focus:text-white hover:text-white text-white rounded-md items-center font-medium flex px-5 py-2`}
              >
                Create Style
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default AddStyle;
