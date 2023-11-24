/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  InputNumber,
  Modal,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { useGetStyleNoQuery } from "../../redux/features/styles/styleApi";
import { useGetAllPortsQuery } from "../../redux/features/ports/portsApi";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useEditOrderInfoMutation } from "../../redux/features/orders/ordersApi";
import { useEffect } from "react";
import moment from "moment";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { FileType } from "rsuite/esm/Uploader";
import PoUpdateFileUploader from "../../components/po/PoUpdateFileUploader";

interface IFormInput {
  orderNo: string;
  totalPack: number;
  styleNo: string | null;
  noOfPack: number | null;
  portId: string | null;
  buyerEtd: string | undefined;
  orderFile: FileType | undefined;
}

const EditPoDetails = ({
  activePoEditModal,
  poEditData,
  handleClosePoEdit,
}: any) => {
  // Fetching All Style
  const { data: styles } = useGetStyleNoQuery(null);
  // Fetching All Ports
  const { data: ports } = useGetAllPortsQuery(null);
  const [editOrderInfo, { isLoading, isError, isSuccess, reset, error, data }] =
    useEditOrderInfoMutation();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset: formReset,
    clearErrors,
  } = useForm<IFormInput>({
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const orderDataObj = {
      totalPack: data?.totalPack ? Number(data?.totalPack) : undefined,
      styleNo: data?.styleNo,
      noOfPack: data?.noOfPack ? Number(data?.noOfPack) : undefined,
      portId: data?.portId,
      buyerEtd: data?.buyerEtd,
      oldFilePath: undefined,
    };

    if (data.orderFile?.blobFile)
      orderDataObj["oldFilePath"] = poEditData?.orderFile;

    const updatedOrderData = JSON.stringify(orderDataObj);
    const formData = new FormData();
    formData.append("file", data.orderFile?.blobFile as Blob);
    formData.append("data", updatedOrderData);

    await editOrderInfo({ id: poEditData?.orderNo, data: formData });
  };

  useEffect(() => {
    if (!isError && !isLoading && isSuccess) {
      toast.success(data?.message || "Successfully Updated  Order.", {
        style: {
          border: "1px solid green",
          padding: "16px",
          color: "green",
        },
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      });
      reset();
      formReset();
      handleClosePoEdit();
    }
    if (isError && !isLoading) {
      // @ts-ignore
      toast.error(error?.message || "Failed to update Order.", {
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
      reset();
    }
  }, [
    data,
    error,
    formReset,
    handleClosePoEdit,
    isError,
    isLoading,
    isSuccess,
    reset,
  ]);

  const onCloseModal = () => {
    clearErrors();
    formReset();
    reset();
    handleClosePoEdit();
  };

  return (
    <>
      <Modal
        size="lg"
        open={activePoEditModal}
        onClose={onCloseModal}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title className="font-semibold">Edit Po Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* form */}
            <section className=" bg-white border rounded-lg p-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* 1st section */}
                <div className="flex justify-between  gap-[24px] mb-5">
                  <div className="flex flex-col gap-3 w-full ">
                    <div className="flex justify-between items-center">
                      <Whisper speaker={<Tooltip>PO not changeable</Tooltip>}>
                        <label
                          htmlFor="orderNo"
                          className="text-sm font-medium"
                        >
                          PO No <InfoOutlineIcon />
                        </label>
                      </Whisper>
                    </div>
                    <input
                      defaultValue={poEditData?.orderNo}
                      id="orderNo"
                      type="text"
                      disabled
                      className="disabled:shadow-inner border py-2 focus:outline-none px-2 border-[#E4E7EC] rounded-[8px]  "
                    />
                  </div>
                  {/* Style No */}
                  <div className="flex flex-col gap-3 w-full ">
                    <div className="flex justify-between items-center">
                      <label htmlFor="styleNo" className="text-sm font-medium">
                        Style No
                      </label>
                      {errors?.styleNo && (
                        <span className="text-[10px]  text-white px-1.5 py-0.5 rounded font-medium bg-red-800">
                          {errors?.styleNo?.message}
                        </span>
                      )}
                    </div>
                    <SelectPicker
                      onChange={(value: string | null): void =>
                        setValue("styleNo", value)
                      }
                      cleanable={false}
                      size="lg"
                      defaultValue={poEditData?.styleNo || undefined}
                      data={
                        styles?.data?.map((style: any) => ({
                          label: style?.styleNo,
                          value: style?.styleNo,
                        })) || []
                      }
                    />
                  </div>
                </div>
                {/* 2nd section */}
                <div className="flex justify-between gap-[24px] mb-5">
                  {/* Total Pack */}
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-center">
                      <Whisper
                        speaker={
                          <Tooltip>
                            <span className="text-[11px]">
                              Total Pack must be greater than or equal to 0
                            </span>
                          </Tooltip>
                        }
                      >
                        <label
                          htmlFor="totalPack"
                          className="text-sm font-medium"
                        >
                          Total Pack <InfoOutlineIcon />
                        </label>
                      </Whisper>

                      {errors?.totalPack && (
                        <span className="text-[10px]  text-white px-1.5 py-0.5 rounded font-medium bg-red-800">
                          {errors?.totalPack?.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <InputNumber
                        size="lg"
                        onChange={(e) => setValue("totalPack", Number(e))}
                        id="totalPack"
                        min={1}
                        defaultValue={poEditData?.totalPack}
                        type="number"
                      />
                    </div>
                  </div>
                  {/* No Of Pack */}
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-center">
                      <label htmlFor="noOfPack" className="text-sm font-medium">
                        No Of Packs
                      </label>
                      {errors?.noOfPack && (
                        <span className="text-[10px]  text-white px-1.5 py-0.5 rounded font-medium bg-red-800">
                          {errors?.noOfPack?.message}
                        </span>
                      )}
                    </div>
                    <SelectPicker
                      id="noOfPack"
                      placement="auto"
                      defaultValue={poEditData?.noOfPack || undefined}
                      onChange={(value: number | null): void =>
                        setValue("noOfPack", value)
                      }
                      size="lg"
                      cleanable={false}
                      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      searchable={false}
                    />
                  </div>
                </div>

                {/* 3rd section */}
                <div className="grid grid-cols-2 justify-between gap-[24px] mb-5">
                  {/* Buyer ETD  */}
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-center">
                      <label htmlFor="buyerEtd" className="text-sm font-medium">
                        Buyer ETD
                      </label>
                      {errors?.buyerEtd && (
                        <span className="text-[10px]  text-white px-1.5 py-0.5 rounded font-medium bg-red-800">
                          {errors?.buyerEtd?.message}
                        </span>
                      )}
                    </div>
                    <DatePicker
                      id="buyerEtd"
                      defaultValue={
                        poEditData?.buyerEtd
                          ? moment(poEditData.buyerEtd).toDate()
                          : undefined
                      }
                      onChange={(value: Date | null): void => {
                        const isoString = value?.toISOString();
                        setValue("buyerEtd", isoString);
                      }}
                      size="lg"
                      editable={false}
                      cleanable={false}
                      placeholder="Buyer ETD"
                      placement="topStart"
                    />
                  </div>

                  {/* Port  */}
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-center">
                      <label htmlFor="portId" className="text-sm font-medium">
                        Port
                      </label>
                      {errors?.portId && (
                        <span className="text-[10px]  text-white px-1.5 py-0.5 rounded font-medium bg-red-800">
                          {errors?.portId?.message}
                        </span>
                      )}
                    </div>
                    <SelectPicker
                      id="portId"
                      defaultValue={poEditData?.Port?.portId || undefined}
                      onChange={(value: string | null): void =>
                        setValue("portId", value)
                      }
                      size="lg"
                      cleanable={false}
                      data={
                        ports?.data?.map((port: any) => ({
                          label: port?.portName,
                          value: port?.portId,
                        })) || []
                      }
                      searchable={false}
                    />
                  </div>
                </div>

                {/* po file */}
                <div className=" w-full ">
                  <div className="my-3">
                    <Whisper
                      speaker={
                        <Tooltip>PO file must be less than 5 MB</Tooltip>
                      }
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
                      <PoUpdateFileUploader
                        field={field}
                        defaultFile={poEditData?.orderFile}
                      />
                    )}
                  />
                </div>

                <div className="flex justify-end gap-3 mt-5">
                  <Button
                    type="submit"
                    loading={isLoading}
                    appearance="default"
                    className="bg-[#0284c7] text-white hover:text-white/80 hover:bg-[#0284c7] focus:bg-[#0284c7] focus:text-white/50"
                  >
                    Submit Changes
                  </Button>
                  <Button
                    onClick={onCloseModal}
                    appearance="ghost"
                    className="hover:border-transparent"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditPoDetails;
