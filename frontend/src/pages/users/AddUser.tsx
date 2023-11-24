/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, SelectPicker, Tooltip, Whisper } from "rsuite";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Inputs } from "./addUser.interface";
import { useCreateUserMutation } from "../../redux/features/auth/authApi";
import UserImageUpload from "../../components/users/AvatarUploader";
import toast from "react-hot-toast";
import { useEffect } from "react";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";

import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [createUser, { isError, isSuccess, error, isLoading, data }] =
    useCreateUserMutation();

  const roles = ["ADMIN", "USER"].map((item) => ({
    label: item,
    value: item,
  }));

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleUserCreate: SubmitHandler<Inputs> = async (values) => {
    const obj = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    const userData = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", values.profileImage?.blobFile as Blob);
    formData.append("data", userData);

    try {
      await createUser(formData);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isError && !isLoading && !isSuccess) {
      toast.error(
        // @ts-ignore
        error?.message || "Something went wrong",
        toastMessageError
      );
    }

    if (!isError && !isLoading && isSuccess) {
      reset();
      navigate("/users/userLists");
      toast.success(
        data?.message || "Successfully Created New User",
        toastMessageSuccess
      );
    }
  }, [data, isError, isLoading, isSuccess, navigate, reset]);

  return (
    <>
      <div className="p-4 bg-white m-5 shadow-xl rounded-2xl">
        <div className="">
          <h2 className="text-2xl text-[#212B36] font-semibold">
            Create a new User
          </h2>
        </div>

        {/* form */}
        <section className="mt-5 bg-white border rounded-lg p-5 mb-10">
          <div className="mb-6">
            <p className="text-lg font-semibold">User Details</p>
          </div>
          <form onSubmit={handleSubmit(handleUserCreate)}>
            {/* 1st section */}

            <div className="flex justify-between gap-[24px] mb-5">
              {/* First Name */}
              <div className="flex flex-col gap-3 w-[50%] ">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                </div>

                <Controller
                  name="firstName"
                  defaultValue=""
                  control={control}
                  rules={{ required: "First Name is Required" }}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        id="itemName"
                        style={{ width: "100%" }}
                        placeholder="Enter First Name..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.firstName &&
                            !!errors?.firstName?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.firstName?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* Last Name */}

              <div className="flex flex-col gap-3 w-[50%] ">
                <div>
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                </div>

                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Last Name is Required" }}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        id="lastName"
                        style={{ width: "100%" }}
                        placeholder="Enter Last Name..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.lastName && !!errors?.lastName?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.lastName?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* Role  */}
              <div className="flex flex-col gap-3 w-[30%]">
                <label htmlFor="role" className="text-sm  font-medium">
                  Role
                </label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        searchable={false}
                        size="lg"
                        data={roles}
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        placeholder="Select Role"
                        style={{
                          width: "100%",
                        }}
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.role && !!errors?.role?.message) || false
                        }
                        placement="topEnd"
                      >
                        {errors?.role?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />{" "}
              </div>
            </div>
            {/* 2nd section */}
            <div className="flex justify-between gap-[24px]  mb-5">
              {/* Email  */}

              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                </div>

                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Email must be Valid",
                    },
                  }}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        id="email"
                        style={{ width: "100%" }}
                        placeholder="Enter email..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.email && !!errors?.email?.message) || false
                        }
                        placement="topEnd"
                      >
                        {errors?.email?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* password */}
              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                </div>

                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is Required",
                  }}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        size="lg"
                        {...field}
                        id="password"
                        style={{ width: "100%" }}
                        placeholder="Enter Password..."
                        type="text"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.password && !!errors?.password?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.password?.message}
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* password  */}
            </div>

            <div className=" w-[30%] ">
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
              <Controller
                name="profileImage"
                control={control}
                rules={{ required: "Profile Image is required" }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <UserImageUpload field={field} />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.profileImage &&
                          !!errors?.profileImage?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      {errors?.profileImage?.message}
                    </Form.ErrorMessage>
                  </div>
                )}
              />
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
      </div>
    </>
  );
};

export default AddUser;
