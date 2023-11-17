/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  Modal,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Inputs } from "./addUser.interface";
import { useEditUserMutation } from "../../redux/features/users/userApi";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";

import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";

const UserEditModal = ({ editUser, openEdit, setOpenEdit }: any) => {
  const [visible, setVisible] = useState(false);

  const { handleSubmit, setValue, reset: formReset } = useForm<Inputs>();

  const [updateUser, { isLoading, isError, isSuccess, reset, error, data }] =
    useEditUserMutation();

  const handleUserCreate: SubmitHandler<Inputs> = async (values) => {
    const updateUserData = {
      profileId: editUser?.profile?.profileId,
      ...values,
    };

    if (editUser) {
      await updateUser({
        id: editUser?.userId,
        data: updateUserData,
      });
    }
  };

  useEffect(() => {
    if (isError && !isLoading && !isSuccess && error) {
      toast.error(
        // @ts-ignore
        error?.message || "Something went wrong",
        toastMessageError
      );
    }

    if (!isError && !isLoading && isSuccess && !error && data) {
      toast.success(
        data?.message || "Successfully Updated New User",
        toastMessageSuccess
      );
      setOpenEdit(false);
      reset();
      formReset();
    }
  }, [isError, isLoading, isSuccess, reset, setOpenEdit]);

  return (
    <Modal size="md" open={openEdit} onClose={() => setOpenEdit(false)}>
      <Modal.Header>
        <Modal.Title>
          <h2 className="font-semibold">Edit User Information</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className=" border rounded-lg py-2 px-3 ">
          <form onSubmit={handleSubmit(handleUserCreate)}>
            {/* 1st section */}

            <div className="flex justify-between gap-[24px] mb-2">
              {/* First Name */}
              <div className="flex flex-col gap-1 w-[50%] ">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                </div>

                <Input
                  defaultValue={editUser?.profile?.firstName || undefined}
                  onChange={(e) => setValue("firstName", e)}
                  size="lg"
                  id="itemName"
                  style={{ width: "100%" }}
                  placeholder="Enter First Name..."
                  type="text"
                />
              </div>

              {/* Last Name */}

              <div className="flex flex-col  gap-1 w-[50%] ">
                <div>
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                </div>

                <Input
                  size="lg"
                  defaultValue={editUser?.profile?.lastName || undefined}
                  onChange={(e) => setValue("lastName", e)}
                  id="lastName"
                  style={{ width: "100%" }}
                  placeholder="Enter Last Name..."
                  type="text"
                />
              </div>
            </div>
            {/* 2nd section */}
            <div className="flex justify-between gap-[24px]  ">
              {/* Email  */}

              <div className="flex flex-col gap-1 w-full ">
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                </div>

                <Input
                  size="lg"
                  defaultValue={editUser?.email || undefined}
                  onChange={(e) => setValue("email", e)}
                  id="email"
                  style={{ width: "100%" }}
                  placeholder="Enter email..."
                  type="text"
                />
              </div>

              {/* password */}
              <div className="flex flex-col gap-1 w-full ">
                <div>
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                </div>
                <InputGroup inside>
                  <Input
                    onChange={(e) => setValue("password", e)}
                    type={visible ? "text" : "password"}
                    placeholder="Enter  password..."
                  />
                  <InputGroup.Button onClick={() => setVisible(!visible)}>
                    {visible ? <EyeIcon /> : <EyeSlashIcon />}
                  </InputGroup.Button>
                </InputGroup>
              </div>

              {/* password  */}
            </div>

            {/* Role  */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="my-2">
                  <label htmlFor="role" className="text-sm  font-medium">
                    Role
                  </label>
                </div>

                <SelectPicker
                  size="lg"
                  data={["ADMIN", "USER"].map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  searchable={false}
                  defaultValue={editUser?.profile?.role || undefined}
                  onChange={(value: string | null) => setValue("role", value)}
                  placeholder="Select Role"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              {/* Status ------------  */}
              <div>
                <div className="my-2">
                  <label htmlFor="status" className="text-sm  font-medium">
                    User Status
                  </label>
                </div>

                <SelectPicker
                  size="lg"
                  data={["Active", "Paused", "Suspended"].map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  searchable={false}
                  defaultValue={editUser?.userStatus || undefined}
                  onChange={(value: string | null) =>
                    setValue("userStatus", value)
                  }
                  placeholder="Select User Status"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            </div>

            <div className="mt-2 w-[50%] ">
              <div className="mb-3">
                <Whisper
                  speaker={
                    <Tooltip>Profile Image must be less than 512 kb</Tooltip>
                  }
                >
                  <label htmlFor="profileImage" className="text-sm font-medium">
                    Profile Image <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <img
                src={`http://localhost:7000/${editUser?.profile?.profileImage}`}
                alt="Image Preview"
                className=" w-[150px] rounded-full h-full object-cover object-center cursor-pointer"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                }}
              />
            </div>

            <div className="flex justify-end gap-5">
              <Button
                onClick={() => {
                  setOpenEdit(false);
                  reset();
                  formReset();
                }}
                type="button"
                appearance="ghost"
                className=" px-6 py-2 rounded-lg"
              >
                Cancel
              </Button>
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
