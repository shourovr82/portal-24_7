/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  Input,
  Modal,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { useGetStyleNoQuery } from "../../redux/features/styles/styleApi";
import { useGetAllPortsQuery } from "../../redux/features/ports/portsApi";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEditOrderInfoMutation } from "../../redux/features/orders/ordersApi";
import { useEffect } from "react";
import moment from "moment";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
interface IFormInput {
  orderNo: string;
  totalPack: number;
  styleNo: string | null;
  noOfPack: number | null;
  portId: string | null;
  buyerEtd: string | undefined;
  factoryEtd: string | undefined;
  friDate: string | undefined;
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
    setValue,
    formState: { errors },
    reset: formReset,
    clearErrors,
  } = useForm<IFormInput>({
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const orderData = {
      totalPack: data.totalPack,
      styleNo: data.styleNo,
      noOfPack: data.noOfPack,
      portId: data.portId,
      buyerEtd: data.buyerEtd,
      factoryEtd: data.factoryEtd,
      friDate: data.friDate,
    };
    await editOrderInfo({ id: poEditData?.orderNo, data: orderData });
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
        size="full"
        open={activePoEditModal}
        onClose={onCloseModal}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title className="font-semibold">
            Edit Po Details : {poEditData?.orderNo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4">
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
                      <Input
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

                {/* 3rd section */}
                <div className="flex justify-between gap-[24px] mb-5">
                  {/* Buyer ETD  */}
                  <div className="flex flex-col gap-3 w-[50%]">
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

                  {/* Factory ETD  */}
                  <div className="flex flex-col gap-3 w-[50%]">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="factoryEtd"
                        className="text-sm font-medium"
                      >
                        Factory ETD
                      </label>
                      {errors?.factoryEtd && (
                        <span className="text-[10px]  text-white px-1.5 py-0.5 rounded font-medium bg-red-800">
                          {errors?.factoryEtd?.message}
                        </span>
                      )}
                    </div>
                    <DatePicker
                      id="factoryEtd"
                      defaultValue={
                        poEditData?.buyerEtd
                          ? moment(poEditData?.factoryEtd).toDate()
                          : undefined
                      }
                      onChange={(value: Date | null): void => {
                        const isoString = value?.toISOString();
                        setValue("factoryEtd", isoString);
                      }}
                      editable={false}
                      size="lg"
                      cleanable={false}
                      placeholder="Factory ETD"
                      placement="topStart"
                    />
                  </div>

                  <div className="flex flex-col gap-3 w-[50%]">
                    <div className="flex justify-between items-center">
                      <label htmlFor="friDate" className="text-sm font-medium">
                        FRI Date
                      </label>
                      {errors?.friDate && (
                        <span className="text-[10px]  text-white px-1.5 py-0.5 rounded font-medium bg-red-800">
                          {errors?.friDate?.message}
                        </span>
                      )}
                    </div>
                    <DatePicker
                      id="friDate"
                      defaultValue={
                        poEditData?.friDate
                          ? moment(poEditData?.friDate).toDate()
                          : undefined
                      }
                      cleanable={false}
                      onChange={(value: Date | null): void => {
                        const isoString = value?.toISOString();
                        setValue("friDate", isoString);
                      }}
                      editable={false}
                      size="lg"
                      placeholder="friDate"
                      placement="topStart"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
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
