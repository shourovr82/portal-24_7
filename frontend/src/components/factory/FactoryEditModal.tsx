/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Modal } from "rsuite";
import { useUpdateFactoryMutation } from "../../redux/features/factories/factoryApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";

interface IFormInput {
  factoryName: string;
  factoryAddress: string;
}

const FactoryEditModal = ({ open, factoryEditData, handleClose }: any) => {
  const [
    updateFactory,
    {
      isLoading,
      isError,
      isSuccess,
      error,
      data: updateData,
      reset: resetRequestUpdate,
    },
  ] = useUpdateFactoryMutation();

  const { handleSubmit, setValue, reset: formReset } = useForm<IFormInput>();

  const handleUpdateFactory: SubmitHandler<IFormInput> = async (data) => {
    const updatedFactoryData = {
      factoryName: data?.factoryName,
      factoryAddress: data?.factoryAddress,
    };
    await updateFactory({
      id: factoryEditData?.factoryId,
      data: updatedFactoryData,
    });
  };

  useEffect(() => {
    if (isSuccess && !error && !isLoading && !isError && updateData) {
      toast.success(
        updateData?.message || "Successfully Updated Factory",
        toastMessageSuccess
      );
      resetRequestUpdate();
      handleClose();
      formReset();
    }
    if (!isSuccess && error && !isLoading && isError && !updateData) {
      toast.error(
        // @ts-ignore
        error?.message || "Something went wrong",
        toastMessageError
      );
    }
  }, [
    error,
    isLoading,
    isError,
    isSuccess,
    resetRequestUpdate,
    updateData,
    handleClose,
    formReset,
  ]);

  const handleModalClose = () => {
    handleClose();
    resetRequestUpdate();
    formReset();
  };
  return (
    <div>
      <Modal
        backdrop="static"
        keyboard={false}
        open={open}
        onClose={handleModalClose}
      >
        <Modal.Header>
          <Modal.Title>
            <h3 className="text-lg font-semibold flex items-center gap-1">
              Edit Factory
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/*  */}

          <div className="rounded-lg border bg-white  ">
            {/* factory */}
            <form
              onSubmit={handleSubmit(handleUpdateFactory)}
              className="p-3 grid grid-cols-5 gap-2"
            >
              {/* factory name */}
              <div className="flex flex-col gap-2 col-span-5 ">
                <div>
                  <label htmlFor="factoryName" className="text-sm font-medium">
                    Factory Name
                  </label>
                </div>

                <Input
                  size="lg"
                  id="factoryName"
                  defaultValue={factoryEditData?.factoryName || undefined}
                  onChange={(e) => setValue("factoryName", e)}
                  style={{ width: "100%" }}
                  placeholder="Enter Factory Name..."
                  type="text"
                />
              </div>

              {/* others */}
              <div className="flex flex-col gap-2 col-span-5">
                {/* factory Address */}

                <div>
                  <label
                    htmlFor="factoryAddress"
                    className="text-sm font-medium"
                  >
                    Factory Address
                  </label>
                </div>

                <Input
                  size="lg"
                  defaultValue={factoryEditData?.factoryAddress || undefined}
                  onChange={(e) => setValue("factoryAddress", e)}
                  id="factoryAddress"
                  style={{ width: "100%" }}
                  placeholder="Enter Factory Address..."
                  type="text"
                />
              </div>

              <div className="flex justify-end mt-3 w-full gap-3 col-span-5">
                <Button
                  onClick={handleModalClose}
                  appearance="link"
                  className="font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isLoading}
                  appearance="default"
                  className="bg-[#0284c7] text-white font-medium hover:text-white hover:bg-[#0284c7] focus:bg-[#0284c7] focus:text-white"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>

          {/* modal Footer */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FactoryEditModal;
