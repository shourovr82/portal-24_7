/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Modal, SelectPicker } from "rsuite";
import { useEffect } from "react";

import toast from "react-hot-toast";

import { Inputs } from "./addUser.interface";
import { useEditUserMutation } from "../../redux/features/users/userApi";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";

const UserEditModal = ({ editUser, openEdit, setOpenEdit }: any) => {
  console.log(editUser);

  const roles = ["ADMIN", "USER"].map((item) => ({
    label: item,
    value: item,
  }));

  const status = ["Active", "Paused", "Suspended"].map((status) => ({
    label: status,
    value: status,
  }));

  console.log(status);

  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const [updateUser, { isLoading, isError, isSuccess, reset }] =
    useEditUserMutation();

  const handleUserCreate: SubmitHandler<Inputs> = async (values) => {
    if (editUser) {
      try {
        await updateUser({ id: editUser?.userId, data: values });
      } catch (err: any) {
        console.error(err.message);
      }
    }
  };

  const onSelectRoleChange = (value: string | null): void => {
    setValue("role", value);
  };

  const onSelectStatusChange = (value: string | null): void => {
    setValue("userStatus", value);
  };

  useEffect(() => {
    if (isError && !isLoading && !isSuccess) {
      toast.error(
        // @ts-ignore
        "Something went wrong",
        toastMessageError
      );
    }

    if (!isError && !isLoading && isSuccess) {
      reset();
      setOpenEdit(false);
      toast.success("Successfully Updated New User", toastMessageSuccess);
    }
  }, [isError, isLoading, isSuccess, reset, setOpenEdit]);

  return (
    <Modal
      className="w-full"
      open={openEdit}
      onClose={() => setOpenEdit(false)}
    >
      <Modal.Header>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="mt-5 bg-white border rounded-lg p-5 mb-10">
          <div className="mb-6">
            <p className="text-lg font-semibold">User Details</p>
          </div>
          <form onSubmit={handleSubmit(handleUserCreate)}>
            {/* 1st section */}
            <div className="flex justify-between gap-[24px] mb-5">
              {/* First Name */}
              <div className="flex flex-col gap-3 w-[35%]">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="firstName"
                    className="text-sm py-1 font-medium"
                  >
                    First Name
                  </label>
                </div>
                <input
                  {...register("firstName")}
                  readOnly
                  defaultValue={editUser?.profile?.firstName}
                  id="firstName"
                  type="text"
                  className="border py-2  focus:border-[#237de1] hover:border-[#237de1] focus:outline-none px-2 border-[#E4E7EC] rounded-[8px]  duration-300 transition-all ease-in-out"
                />
              </div>
              {/* Last Name */}
              <div className="flex flex-col gap-3 w-[35%]">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="lastName"
                    className="text-sm py-1 font-medium"
                  >
                    Last Name
                  </label>
                </div>
                <input
                  {...register("lastName")}
                  readOnly
                  defaultValue={editUser?.profile?.lastName}
                  id="lastName"
                  type="text"
                  className="border py-2  focus:border-[#237de1] hover:border-[#237de1] focus:outline-none px-2 border-[#E4E7EC] rounded-[8px]  duration-300 transition-all ease-in-out"
                />
              </div>
              {/* Role  */}
              <div className="flex flex-col gap-3 w-[30%]">
                <label htmlFor="sku" className="text-sm py-1 font-medium">
                  Role
                </label>
                <SelectPicker
                  readOnly
                  defaultValue={editUser?.profile?.role}
                  onChange={onSelectRoleChange}
                  size="lg"
                  data={roles}
                  searchable={false}
                />
              </div>
              <div className="flex flex-col gap-3 w-[30%]">
                <label htmlFor="sku" className="text-sm py-1 font-medium">
                  Status
                </label>
                <SelectPicker
                  defaultValue={editUser?.userStatus}
                  onChange={onSelectStatusChange}
                  size="lg"
                  data={status}
                  searchable={false}
                />
              </div>
            </div>
            {/* 2nd section */}
            <div className="flex gap-[10px]  mb-5">
              {/* Email  */}
              <div className="flex flex-col gap-3 w-[40%]">
                <div className="flex justify-between items-center">
                  <label htmlFor="email" className="text-sm py-1 font-medium">
                    Email
                  </label>
                </div>
                <input
                  {...register("email")}
                  defaultValue={editUser?.email}
                  id="email"
                  type="email"
                  className="border py-2  focus:border-[#237de1] hover:border-[#237de1] focus:outline-none px-2 border-[#E4E7EC] rounded-[8px]  duration-300 transition-all ease-in-out"
                />
              </div>
              {/* password  */}
              <div className="flex flex-col gap-3 w-[40%]">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-sm py-1 font-medium"
                  >
                    Password
                  </label>
                </div>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  className="border py-2  focus:border-[#237de1] hover:border-[#237de1] focus:outline-none px-2 border-[#E4E7EC] rounded-[8px]  duration-300 transition-all ease-in-out"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                appearance="primary"
                loading={isLoading}
                className=" hover:text-white/80 text-white px-6 py-2 rounded-lg"
              >
                Submit
              </Button>
            </div>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default UserEditModal;
