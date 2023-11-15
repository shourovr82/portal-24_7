/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import logo from "../../assets/logo/portal-logo.png";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { ILogin } from "../users/addUser.interface";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Form, Input, InputGroup } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, storeUserInfo } from "../../hooks/services/auth.service";
import toast from "react-hot-toast";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../interfacesAndConstants/shared/constants/toastMessages.constants";

export default function LogIn() {
  const navigate = useNavigate();
  const userLoggedIn = isLoggedIn();
  const [visible, setVisible] = useState(false);
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
  } = useForm<ILogin>({
    mode: "onChange",
  });

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
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="space-y-6"
              action="#"
            >
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
                        className="block text-sm font-medium text-gray-700"
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
                          (!!errors?.email && !!errors?.email?.message) || false
                        }
                        placement="topEnd"
                      >
                        {errors?.email?.message}
                      </Form.ErrorMessage>
                    </div>
                  </div>
                )}
              />

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
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                      </div>

                      <div className="rs-form-control-wrapper ">
                        <InputGroup inside>
                          <Input
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

              <div>
                <Button
                  loading={isLoading}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-[#0284c7] focus-within:bg-[#0284c7] focus-within:text-white hover:text-white/80 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#0284c7] focus:outline-none "
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
