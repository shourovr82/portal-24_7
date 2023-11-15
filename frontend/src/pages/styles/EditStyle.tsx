/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import { SelectPicker, Uploader } from "rsuite";
import { useGetAllItemNamesQuery } from "../../redux/features/items/itemApi";
import { useGetAllFactoriesQuery } from "../../redux/features/factories/factoryApi";
import { useCreateNewStyleMutation } from "../../redux/features/styles/styleApi";
import toast from "react-hot-toast";

const EditStyle = () => {
  const { data: items } = useGetAllItemNamesQuery(null);
  const allItem = items?.data?.map((item: any) => ({
    label: item.itemName,
    value: item.itemId,
  }));

  const { data: factories } = useGetAllFactoriesQuery(null);

  const allFactory = factories?.data?.map((factory: any) => ({
    label: factory.factoryName,
    value: factory.factoryId,
  }));

  interface IFormInput {
    styleNo: string;
    fabric: string;
    factoryId: string | null;
    itemId: string | null;
  }

  const [
    createNewStyle,
    { isLoading: createLoading, error: createError, isSuccess },
  ] = useCreateNewStyleMutation();

  const { register, handleSubmit, setValue, reset } = useForm<IFormInput>();

  const handleCreateStyle: SubmitHandler<IFormInput> = async (data) => {
    const addStyle = {
      image: "link",
      ...data,
    };

    await createNewStyle(addStyle);
    // Check for success after the mutation has completed
    if (isSuccess) {
      toast.success("Successfully Created New Style");
      reset();
    }
    if (!isSuccess && createError) {
      toast.error("Failed to create New Style");
      // reset();
    }
  };

  const onSelectItemChange = (value: string | null): void => {
    setValue("itemId", value);
  };

  const onSelectFactoryChange = (value: string | null): void => {
    setValue("factoryId", value);
  };

  return (
    <>
      <div className="p-4 pb-10">
        <div className="">
          <div>
            <h2 className="text-2xl text-[#212B36] font-semibold">
              Edit a style
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
            <div className="flex gap-[24px] mb-5">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="styleNo" className="text-sm font-medium">
                  Style No
                </label>
                <input
                  id="styleNo"
                  type="text"
                  {...register("styleNo")}
                  className="border py-2 focus:outline-none px-2 border-[#E4E7EC] rounded-[8px]  "
                />
              </div>
              {/* Fabric */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="fabric" className="text-sm font-medium">
                  Fabric
                </label>
                <input
                  id="fabric"
                  type="text"
                  {...register("fabric", {
                    required: "Fabric is required",
                    minLength: 3,
                  })}
                  className="border py-2 focus:outline-none px-2 border-[#E4E7EC] rounded-[8px]  "
                />
              </div>
            </div>

            <div className="flex  gap-[24px] mb-5">
              {/* item name */}
              <div className="flex flex-col  gap-3 w-full ">
                <label htmlFor="sku" className="text-sm font-medium">
                  Item Name
                </label>
                <SelectPicker
                  onChange={onSelectItemChange}
                  size="lg"
                  menuMaxHeight={200}
                  data={allItem}
                />
              </div>

              <div className="flex flex-col gap-3  w-full mb-3">
                <label htmlFor="sku" className="text-sm font-medium">
                  Factory Name
                </label>
                <SelectPicker
                  onChange={onSelectFactoryChange}
                  size="lg"
                  menuMaxHeight={200}
                  data={allFactory}
                />
              </div>
            </div>

            <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
              <div
                style={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="text-xl">
                  Click or Drag image to this area to upload
                </span>
              </div>
            </Uploader>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={createLoading}
                className={`bg-[#0284c7] text-white rounded-md items-center   flex px-2.5 py-1`}
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

                {!createLoading && <span>Edit Style</span>}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default EditStyle;
