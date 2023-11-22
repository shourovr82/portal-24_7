/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { useGetStyleNoQuery } from "../../redux/features/styles/styleApi";
import { useGetAllPortNamesQuery } from "../../redux/features/ports/portsApi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateNewOrderMutation } from "../../redux/features/orders/ordersApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { renderLoading } from "../../components/renderLoading/RenderLoading";
import { toastMessageSuccess } from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { dataForSelectPicker } from "../../common/commonData";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { FileType } from "rsuite/esm/Uploader";
import OrderFileUploader from "../../components/po/PoFileUploader";

interface IPOAddRequest {
  orderNo: string;
  totalPack: number;
  styleNo: string | null;
  noOfPack: number | null;
  portId: string | null;
  buyerEtd: string | undefined;
  orderFile?: FileType | undefined;
}

const AddPo = () => {
  const navigate = useNavigate();
  // Fetching All Style
  const { data: styles, isLoading: isLoadingStyleNo } =
    useGetStyleNoQuery(null);
  // Fetching All Ports
  const { data: ports, isLoading: isLoadingPortNames } =
    useGetAllPortNamesQuery(null);

  const [createNewOrder, { isLoading, isError, isSuccess, data, error }] =
    useCreateNewOrderMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPOAddRequest>();

  const handleCreateNewOrder: SubmitHandler<IPOAddRequest> = async (
    data: IPOAddRequest
  ) => {
    const orderDataObj = {
      totalPack: Number(data.totalPack),
      orderNo: data.orderNo,
      styleNo: data.styleNo,
      noOfPack: Number(data.noOfPack),
      portId: data.portId,
      buyerEtd: data.buyerEtd,
    };
    //
    const orderData = JSON.stringify(orderDataObj);
    const formData = new FormData();
    formData.append("file", data.orderFile?.blobFile as Blob);
    formData.append("data", orderData);
    //
    await createNewOrder(formData);
  };

  useEffect(() => {
    if (!isError && !isLoading && isSuccess && !error && data) {
      toast.success(
        data?.message || "Successfully Created New Order.",
        toastMessageSuccess
      );
      navigate("/po/poLists");
    }
    if (isError && !isLoading && !isSuccess && error) {
      // @ts-ignore
      toast.error(error?.message || "Failed to create new Order.", {
        style: {
          border: "1px solid red",
          padding: "16px",
          color: "red",
        },
        iconTheme: {
          primary: "red",
          secondary: "#FFFAEE",
        },
      });
    }
  }, [data, error, isError, isLoading, isSuccess, navigate]);

  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl text-[#212B36] font-semibold">
          Create a new PO
        </h2>
      </div>

      {/* form */}
      <section className="mt-5 bg-white border rounded-lg shadow p-5 mb-10">
        <div className="mb-6">
          <p className="text-lg font-semibold">PO Details</p>
          <p>Please provide details of this PO.</p>
        </div>
        <form onSubmit={handleSubmit(handleCreateNewOrder)}>
          {/* 1st section */}
          <div className="flex justify-between  gap-[24px] mb-5">
            {/* order no PO */}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>PO will not be changeable</Tooltip>}>
                  <label htmlFor="orderNo" className="text-sm font-medium">
                    PO No <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="orderNo"
                control={control}
                defaultValue=""
                rules={{ required: "Po is required" }}
                render={({ field }: any) => (
                  <Whisper
                    trigger="focus"
                    speaker={<Tooltip>PO never can be editable</Tooltip>}
                  >
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        id="orderNo"
                        style={{ width: "100%" }}
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.orderNo && !!errors?.orderNo?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.orderNo?.message}
                      </Form.ErrorMessage>
                    </div>
                  </Whisper>
                )}
              />
            </div>
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
                      onChange={(value: string | null) => field.onChange(value)}
                      style={{
                        width: "100%",
                      }}
                      placement="auto"
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
            {/* Buyer ETD  */}{" "}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Buyer ETD Date</Tooltip>}>
                  <label htmlFor="buyerEtd" className="text-sm font-medium">
                    Buyer ETD <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="buyerEtd"
                control={control}
                rules={{ required: "Buyer ETD is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <DatePicker
                      id="buyerEtd"
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
                      placeholder="Buyer ETD Date"
                      editable={false}
                      placement="auto"
                    />
                    <Form.ErrorMessage
                      show={!!errors?.buyerEtd && !!errors?.buyerEtd?.message}
                      placement="topEnd"
                    >
                      {errors?.buyerEtd?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
          {/* 2nd section */}
          <div className="flex justify-between gap-[24px] mb-5">
            {/* Total Pack */}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper
                  speaker={
                    <Tooltip>
                      <span className="text-[11px]">
                        Total Pack must be greater than or equal to 1
                      </span>
                    </Tooltip>
                  }
                >
                  <label htmlFor="totalPack" className="text-sm font-medium">
                    Total Pack <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="totalPack"
                control={control}
                rules={{
                  required: "Total Pack is required",
                  min: {
                    value: 1,
                    message: "Total Pack must be greater than 0",
                  },
                }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <InputNumber
                      {...field}
                      inputMode="numeric"
                      min={1}
                      size="lg"
                      id="totalPack"
                      type="number"
                      style={{ width: "100%" }}
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.totalPack && !!errors?.totalPack?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      {errors?.totalPack?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/* No Of Pack */}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>No Of Packs</Tooltip>}>
                  <label htmlFor="noOfPack" className="text-sm font-medium">
                    No Of Packs <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="noOfPack"
                control={control}
                rules={{ required: "No Of Pack  is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      placement="auto"
                      size="lg"
                      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
                        label: item.toString(),
                        value: item.toString(),
                      }))}
                      value={field.value ? field.value.toString() : null} //
                      onChange={(value: string | null) => field.onChange(value)}
                      searchable={false}
                      style={{
                        width: "100%",
                      }}
                    />
                    <Form.ErrorMessage
                      show={!!errors?.noOfPack && !!errors?.noOfPack?.message}
                      placement="topEnd"
                    >
                      {errors?.noOfPack?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>

            {/* Port  */}

            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Port</Tooltip>}>
                  <label htmlFor="portId" className="text-sm font-medium">
                    Port <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="portId"
                control={control}
                rules={{ required: "Port is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      placement="auto"
                      size="lg"
                      data={dataForSelectPicker.getAllPortNames(ports) || []}
                      value={field.value}
                      onChange={(value: string | null) => field.onChange(value)}
                      style={{
                        width: "100%",
                      }}
                      renderMenu={(menu) =>
                        renderLoading(menu, isLoadingPortNames)
                      }
                    />
                    <Form.ErrorMessage
                      show={!!errors?.portId && !!errors?.portId?.message}
                      placement="topEnd"
                    >
                      {errors?.portId?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>

          {/* po file */}
          <div className=" w-full ">
            <div className="my-3">
              <Whisper
                speaker={<Tooltip>PO file must be less than 5 MB</Tooltip>}
              >
                <label htmlFor="file" className="text-sm font-medium">
                  PO File <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="orderFile"
              control={control}
              render={({ field }: any) => (
                <div className="rs-form-control-wrapper ">
                  <OrderFileUploader field={field} />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.orderFile && !!errors?.orderFile?.message) ||
                      false
                    }
                    placement="topEnd"
                  >
                    {errors?.orderFile?.message}
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>

          <div className="flex justify-end mt-5">
            <Button
              type="submit"
              loading={isLoading}
              size="lg"
              className={`bg-[#0284c7] hover:bg-[#0284c7] focus:bg-[#0284c7] focus:text-white hover:text-white/80 text-white  items-center   flex px-3 py-2 text-sm rounded-md `}
            >
              Create New Order
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddPo;
