"use client";

import {
  PasswordResetResponse,
  useResetPassword,
} from "@/api/useResetPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetPasswordValidationSchema } from "@/lib/validations";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { HashLoader } from "react-spinners";
import { Toaster, toast } from "sonner";
import RocketIcon from "~/public/rocket_icon.png";

export default function UpdatePassword() {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();

  const handleSuccess = (data: PasswordResetResponse) => {
    toast.success(data.message);
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  const handleError = (e: Error) => {
    toast.error(e.message);
  };

  const form = useFormik<{ newPassword: string; newPasswordConfirm: string }>({
    initialValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: ResetPasswordValidationSchema,
    onSubmit: ({ newPassword }) => {
      mutateAsync(
        { newPassword, code: code! },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        }
      );
    },
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    handleBlur,
  } = form;

  const { mutateAsync, isPending } = useResetPassword();

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
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
          </Link>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              New Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <Label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={values.newPassword}
                  onChange={handleChange("newPassword")}
                />
              </div>
              {touched.newPassword && errors.newPassword && (
                <pre className="text-sm text-red-500 !m-0 !mt-1">
                  {errors.newPassword[0].toUpperCase()}
                  {errors.newPassword.slice(1)}.
                </pre>
              )}{" "}
              <div>
                <Label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </Label>
                <Input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={values.newPasswordConfirm}
                  onBlur={handleBlur("newPasswordConfirm")}
                  onChange={async (v) => {
                    await setFieldValue("newPasswordConfirm", v.target.value);
                    if (!(values.newPassword === values.newPasswordConfirm)) {
                      setFieldError(
                        "newPasswordConfirm",
                        "Passwords don't match"
                      );
                    }
                  }}
                />
              </div>
              {touched.newPasswordConfirm && errors.newPasswordConfirm && (
                <pre className="text-sm text-red-500 !m-0 !mt-1">
                  {errors.newPasswordConfirm[0].toUpperCase()}
                  {errors.newPasswordConfirm.slice(1)}.
                </pre>
              )}{" "}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isPending ? (
                  <HashLoader color="white" size={20} />
                ) : (
                  "Reset passwod"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
