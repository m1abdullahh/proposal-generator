"use client";

import { RecoveryResponse, useSendToken } from "@/api/useSendRecoveryToken";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountRecoveryValidationSchema } from "@/lib/validations";
import { useFormik } from "formik";
import Image from "next/image";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { Toaster, toast } from "sonner";
import RocketIcon from "~/public/rocket_icon.png";
import {
  InputOTP,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useConfirmToken } from "@/api/useConfirmRecoveryToken";
import { useRouter } from "next/navigation";

export default function AccountRecovery() {
  const router = useRouter();
  const { mutateAsync, isPending } = useSendToken();
  const { mutateAsync: confirmToken, isPending: confirmingToken } =
    useConfirmToken();
  const [OTPValue, setOTPValue] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const handleSuccess = (data: RecoveryResponse) => {
    toast.success(data.message);
    setEmailSent(true);
  };

  const handleSubmitToken = () => {
    if (OTPValue.length === 6) {
      confirmToken(
        {
          email: values.email,
          token: OTPValue,
        },
        {
          onSuccess: (d) => {
            toast.success(d.message);
            setTimeout(() => {
              router.push(`/update-password?code=${d.code}`);
            }, 1500);
          },
          onError: (e) => {
            toast.error(e.message);
          },
        }
      );
    }
  };
  const handleError = (e: Error) => {
    toast.error(e.message);
  };
  const form = useFormik<{ email: string }>({
    initialValues: {
      email: "",
    },
    validationSchema: AccountRecoveryValidationSchema,
    onSubmit: ({ email }) => {
      mutateAsync(
        {
          email,
        },
        { onSuccess: handleSuccess, onError: handleError }
      );
    },
  });
  const { values, errors, handleChange, handleSubmit, touched } = form;
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image
              className="w-8 h-8 mr-2"
              src={RocketIcon}
              alt="logo"
              width={32}
              height={32}
            />
            ABServes Inc.
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            {!emailSent ? (
              <>
                <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forgot your password?
                </h1>
                <p className="font-light text-gray-500 dark:text-gray-400">
                  Don&apos;t fret! Just type in your email and we will send you
                  a code to reset your password!
                </p>
                <form
                  className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                  action="#"
                >
                  <div>
                    <Label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                      value={values.email}
                      onChange={handleChange("email")}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <pre className="text-sm text-red-500 !m-0 !mt-1">
                      {errors.email[0].toUpperCase()}
                      {errors.email.slice(1)}.
                    </pre>
                  )}{" "}
                  {/* <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </Label>
                </div>
              </div> */}
                  <Button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isPending ? (
                      <HashLoader color="white" size={20} />
                    ) : (
                      "Reset password"
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Label className="font-bold text-lg">One Time Password</Label>
                <br />
                <br />
                <InputOTP
                  maxLength={6}
                  value={OTPValue}
                  onChange={(v) => setOTPValue(v)}
                >
                  <InputOTPSlot index={0} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={1} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={2} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={3} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={4} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={5} />
                </InputOTP>
                <br />
                <Label>
                  Please enter the one time password we sent to your email
                  address.
                </Label>
                <br />
                <br />
                <Button
                  className="align-end"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmitToken();
                  }}
                >
                  {confirmingToken ? (
                    <HashLoader className="px-6 py-3" color="white" size={20} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
