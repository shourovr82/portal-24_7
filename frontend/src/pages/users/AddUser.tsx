/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Form, SelectPicker, Tooltip, Whisper } from "rsuite";
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
    register,
    handleSubmit,
    setValue,
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

  const onSelectRoleChange = (value: string | null): void => {
    setValue("role", value);
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
              <div className="flex flex-col gap-3 w-[35%]">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="firstName"
                    className="text-sm py-1 font-medium"
                  >
                    First Name
                  </label>
                  {errors?.firstName && (
                    <p className="text-xs bg-red-500 text-white/80 px-3 py-1 rounded-full">
                      {errors?.firstName?.message}
                    </p>
                  )}
                </div>
                <input
                  {...register("firstName", {
                    required: "First Name is Required",
                  })}
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
                  {errors?.lastName && (
                    <p className="text-xs bg-red-500 text-white/80 px-3 py-1 rounded-full">
                      {errors?.lastName?.message}
                    </p>
                  )}
                </div>
                <input
                  {...register("lastName", {
                    required: "Last Name is Required",
                  })}
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
                  onChange={onSelectRoleChange}
                  size="lg"
                  data={roles}
                  searchable={false}
                />
              </div>
            </div>
            {/* 2nd section */}
            <div className="flex justify-between gap-[24px]  mb-5">
              <div className=" w-[20%] ">
                <div className="mb-3">
                  <Whisper
                    speaker={
                      <Tooltip>Profile Image must be less than 512 kb</Tooltip>
                    }
                  >
                    <label
                      htmlFor="profileImage"
                      className="text-sm font-medium"
                    >
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

              {/* Email  */}
              <div className="flex flex-col gap-3 w-[40%]">
                <div className="flex justify-between items-center">
                  <label htmlFor="email" className="text-sm py-1 font-medium">
                    Email
                  </label>
                  {errors?.email && (
                    <p className="text-xs bg-red-500 text-white/80 px-3 py-1 rounded-full">
                      {errors?.email?.message}
                    </p>
                  )}
                </div>
                <input
                  {...register("email", {
                    required: "Email is Required",
                  })}
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
                  {errors?.password && (
                    <p className="text-xs bg-red-500 text-white/80 px-3 py-1 rounded-full">
                      {errors?.password?.message}
                    </p>
                  )}
                </div>
                <input
                  {...register("password", {
                    required: "Password is Required",
                  })}
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
      </div>
    </>
  );
};

export default AddUser;
