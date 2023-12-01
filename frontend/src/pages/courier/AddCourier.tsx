/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  DatePicker,
  Form,
  Input,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { useGetStyleNoQuery } from "../../redux/features/styles/styleApi";
import { renderLoading } from "../../components/renderLoading/RenderLoading";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateNewCourierMutation } from "../../redux/features/couriers/courierApi";
import { useEffect } from "react";
import { ICourierCreateFormInput } from "../../interfacesAndConstants/courier/courier.interfaces";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { dataForSelectPicker } from "../../common/commonData";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { IoIosArrowForward } from "react-icons/io";

const AddCourier = () => {
  const navigate = useNavigate();
  // Fetching All Style
  const { data: styles, isLoading: isLoadingStyleNo } =
    useGetStyleNoQuery(null);

  const [
    createNewCourier,
    {
      isLoading: isLoadingCreateCourier,
      isError: isErrorCreateCourier,
      isSuccess: isSuccessCreateCourier,
      data: createdCourierData,
      error: errorCreateCourierData,
    },
  ] = useCreateNewCourierMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICourierCreateFormInput>();

  const onSubmit: SubmitHandler<ICourierCreateFormInput> = async (
    data: ICourierCreateFormInput
  ) => {
    const courierData = {
      courierName: data?.courierName,
      awbNo: data?.awbNo,
      courierDate: data?.courierDate,
      courierDetails: data?.courierDetails,
      styleNo: data?.styleNo,
    };

    await createNewCourier(courierData);
  };

  useEffect(() => {
    if (
      !isErrorCreateCourier &&
      !isLoadingCreateCourier &&
      isSuccessCreateCourier
    ) {
      toast.success(
        createdCourierData?.message || "Successfully Created Courier.",
        toastMessageSuccess
      );
      navigate("/courier/courierLists");
    }
    if (
      isErrorCreateCourier &&
      !isLoadingCreateCourier &&
      !isSuccessCreateCourier
    ) {
      toast.error(
        // @ts-ignore
        errorCreateCourierData?.message || "Failed to create new Courier.",
        toastMessageError
      );
    }
  }, [
    createdCourierData,
    errorCreateCourierData,
    isErrorCreateCourier,
    isLoadingCreateCourier,
    isSuccessCreateCourier,
    navigate,
  ]);

  return (
    <>
      <div className="p-4">
        <div className="">
          <div>
            <h2 className="text-2xl text-[#212B36] font-semibold">
              Create a Courier
            </h2>
            <div className="flex text-sm mt-3 gap-2 items-center">
              <Link to="/" className="text-blue-700 font-medium">
                Dashboard
              </Link>
              <IoIosArrowForward className="text-blue-700" />
              <Link to="/courier/courierLists" className="text-blue-700 font-medium">
                Courier List
              </Link>
              <IoIosArrowForward className="text-blue-700" />
              <span className="text-gray-500">Add Courier</span>
            </div>
          </div>
        </div>

        {/* form */}
        <section className="mt-5 bg-white border rounded-lg p-5 mb-10">
          <div className="mb-6">
            <p className="text-lg font-semibold">Courier Details</p>
            <p>Please provide details of this Courier</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 1st section */}
            <div className="flex justify-between gap-[24px] mb-5">
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
                        data={
                          styles?.data?.map((style: any) => ({
                            label: style?.styleNo,
                            value: style?.styleNo,
                          })) || []
                        }
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
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
              {/* Courier Name */}
              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip>Name of the Courier</Tooltip>}>
                    <label
                      htmlFor="courierName"
                      className="text-sm font-medium"
                    >
                      Courier Name <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="courierName"
                  control={control}
                  defaultValue={""}
                  rules={{ required: "Courier Name No is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        size="lg"
                        data={dataForSelectPicker.courierNamesData ?? []}
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        renderMenu={(menu) =>
                          renderLoading(menu, isLoadingStyleNo)
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.courierName &&
                            !!errors?.courierName?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.courierName?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />{" "}
              </div>

              {/* Courier Date */}

              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip> Courier Date </Tooltip>}>
                    <label
                      htmlFor="courierDate"
                      className="text-sm font-medium"
                    >
                      Courier Date <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>

                <Controller
                  name="courierDate"
                  control={control}
                  rules={{ required: "Courier Date is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <DatePicker
                        id="courierDate"
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
                        placeholder="Courier Date"
                        editable={false}
                        placement="bottom"
                      />
                      <Form.ErrorMessage
                        show={
                          !!errors?.courierDate &&
                          !!errors?.courierDate?.message
                        }
                        placement="topEnd"
                      >
                        {errors?.courierDate?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* 2nd section */}

            <div className="flex justify-between gap-[24px] mb-5">
              {/* Add AWB No */}

              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip>AWB no</Tooltip>}>
                    <label htmlFor="awbNo" className="text-sm font-medium">
                      AWB No <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>

                <Controller
                  name="awbNo"
                  control={control}
                  rules={{ required: "AWB No is Required" }}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        id="awbNo"
                        style={{ width: "100%" }}
                        placeholder="Enter AWB no..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.awbNo && !!errors?.awbNo?.message) || false
                        }
                        placement="topEnd"
                      >
                        {errors?.awbNo?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* Courier Details  */}

              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper
                    speaker={<Tooltip>Details about the Courier</Tooltip>}
                  >
                    <label
                      htmlFor="courierDetails"
                      className="text-sm font-medium"
                    >
                      Courier Details <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>

                <Controller
                  name="courierDetails"
                  control={control}
                  rules={{ required: "Courier details is Required" }}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        id="courierDetails"
                        style={{ width: "100%" }}
                        placeholder="Enter courier details..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.courierDetails &&
                            !!errors?.courierDetails?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.courierDetails?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                size="lg"
                type="submit"
                loading={isLoadingCreateCourier}
                className={`bg-[#0284c7] hover:bg-sky-700 focus:bg-sky-800 font-medium hover:text-white focus:text-white text-white rounded items-center flex px-5 text-sm py-2 transition-all duration-300 ${
                  isLoadingCreateCourier ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Add Courier
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default AddCourier;
