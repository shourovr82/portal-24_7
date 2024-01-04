/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import logo from "../../assets/logo/portal-logo.png";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { ILogin } from "../users/addUser.interface";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Checkbox, Form, Input, InputGroup, Modal } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, storeUserInfo } from "../../hooks/services/auth.service";
import toast from "react-hot-toast";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";

import loginPhoto from "../../assets/login/loginbg.svg";
import moment from "moment";
import LoginReportProblemModal from "../../components/login/LoginReportProblemModal";

export default function LogIn() {
  const navigate = useNavigate();
  const userLoggedIn = isLoggedIn();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();

  const handleChange = () => {
    setVisible(!visible);
  };

  const [login, { isLoading, error, isSuccess, isError, data }] =
    useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const handleLogin: SubmitHandler<ILogin> = async (user) => {
    const res: any = await login({ data: user }).unwrap();

    if (res?.data?.accessToken) {
      storeUserInfo({ accessToken: res?.data?.accessToken });
    }
  };

  useEffect(() => {
    if (userLoggedIn) {
      if (location?.state && location?.state?.from) {
        navigate(location?.state?.from);
      } else {
        navigate("/");
      }
    }

    if (!isLoading && !isError && isSuccess && data) {
      if (location?.state && location?.state?.from) {
        navigate(location?.state?.from);
      } else {
        navigate("/");
      }
      toast.success(
        data?.message || "User logged in successfully!",
        toastMessageSuccess
      );
    }

    if (error && isError) {
      // @ts-ignore
      toast.error(error?.message || "Something went wrong", toastMessageError);
    }
  }, [
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    location.state,
    navigate,
    userLoggedIn,
  ]);

  return (
    <>
      <div className="lg:grid lg:grid-cols-2   h-screen flex-col justify-center    ">
        <div className="mt-10 w-[80%] mx-auto  ">
          <div className="flex justify-between pb-20">
            <div>
              <img className="mx-auto h-12 w-auto" src={logo} alt="logo" />
            </div>
            <div>
              <Button className="font-semibold " onClick={handleOpen}>
                Contact Admin
              </Button>
            </div>
          </div>
          <div className="space-y-3 ">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h2>
            <p className="text-[#8b8b8b] font-medium text-sm">
              Please use your Email and Password to Login
            </p>
          </div>
          {/* form */}
          <div className="  py-4">
            <div className="   ">
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-5"
                action="#"
              >
                <div className="">
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Please provide your valid email",
                      },
                    }}
                    render={({ field }: any) => (
                      <div>
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-700"
                          >
                            Email address
                          </label>

                          {errors?.email && (
                            <p className="text-xs bg-red-600/80 px-2 rounded  py-[0.5px] text-white/80 ">
                              {errors?.email?.message}
                            </p>
                          )}
                        </div>
                        <div className="rs-form-control-wrapper ">
                          <Input
                            size="lg"
                            {...field}
                            id="orderNo"
                            style={{ width: "100%" }}
                            placeholder="enter your email..."
                            type="text"
                          />

                          <Form.ErrorMessage
                            show={
                              (!!errors?.email && !!errors?.email?.message) ||
                              false
                            }
                            placement="topEnd"
                          >
                            {errors?.email?.message}
                          </Form.ErrorMessage>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <>
                        <div>
                          <div className="flex justify-between items-center">
                            <label
                              htmlFor="password"
                              className="block text-lg font-medium text-gray-700"
                            >
                              Password
                            </label>
                          </div>

                          <div className="rs-form-control-wrapper ">
                            <InputGroup size="lg" inside>
                              <Input
                                size="lg"
                                {...field}
                                type={visible ? "text" : "password"}
                                placeholder="enter your password..."
                              />
                              <InputGroup.Button onClick={handleChange}>
                                {visible ? <EyeIcon /> : <EyeSlashIcon />}
                              </InputGroup.Button>
                            </InputGroup>
                            <Form.ErrorMessage
                              show={
                                (!!errors?.password &&
                                  !!errors?.password?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              {errors?.password?.message}
                            </Form.ErrorMessage>
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <Checkbox className="select-none  ">
                      <span className="text-xs  text-[#868585] font-semibold">
                        Keep me logged in
                      </span>
                    </Checkbox>
                  </div>
                  <div>
                    <Button
                      loading={isLoading}
                      type="submit"
                      className="flex w-full justify-center rounded-lg border border-transparent bg-[#0284c7] focus-within:bg-[#0284c7] focus-within:text-white hover:text-white/80 
                    py-3  px-4 text-sm font-medium text-white shadow-sm hover:bg-[#0284c7] focus:outline-none "
                    >
                      Sign in
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* background image */}
        <div className="max-md:hidden flex flex-col justify-center items-center   bg-[#0d1065]">
          <div className="flex  flex-col mt-10 items-center justify-center">
            <div className="space-y-3">
              <h2 className="text-7xl font-light  text-white">
                {moment().format("MMMM Do")},
              </h2>
              <h2 className="text-6xl font-semibold text-white">
                {moment().format("YYYY")},
              </h2>
            </div>
            <div>
              <img src={loginPhoto} className=" w-[80%]  mx-auto " alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* modal */}

      <Modal open={open} size="xs" backdrop="static" onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Report a Problem to Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginReportProblemModal handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
