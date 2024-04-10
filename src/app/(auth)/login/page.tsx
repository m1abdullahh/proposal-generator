"use client";

import Image from "next/image";
import Link from "next/link";
import RocketIcon from "~/public/rocket_icon.png";
import { LoginResponse, useSignIn } from "@/api/useSignin";
import { useFormik } from "formik";
import { SignInValidationSchema } from "@/lib/validations";
import { Toaster, toast } from "sonner";
import { HashLoader } from "react-spinners";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const handleSuccess = (data: LoginResponse) => {
    toast.success("Signed in Successfully.");
    setDataInLocalStorage({
      token: data.accessToken,
    });
    setTimeout(() => {
      router.replace("/");
    }, 1500);
  };
  const handleError = (e: Error) => {
    toast.error(e.message);
  };
  const { mutateAsync, isPending } = useSignIn();
  const form = useFormik<{
    email: string;
    password: string;
  }>({
    validationSchema: SignInValidationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (val) => {
      mutateAsync(
        {
          ...val,
        },
        {
          onSuccess: (data) => handleSuccess(data),
          onError: (e) => handleError(e),
        }
      );
    },
  });

  useEffect(() => {
    const data = getDataFromLocalStorage();
    if (data.token) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    const code = params.get("emailVerified");
    if (code && code === "true")
      toast.success("Email has been verified.", {
        description: "You can now login.",
      });
  }, [params]);
  const { values, handleChange, errors, touched, handleSubmit } = form;
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image
              className=" mr-2"
              src={RocketIcon}
              alt="logo"
              height={32}
              width={32}
            />
            ABServes Inc.
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
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
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={values.password}
                    onChange={handleChange("password")}
                  />
                </div>
                {touched.password && errors.password && (
                  <pre className="text-sm text-red-500 !m-0 !mt-1">
                    {errors.password[0].toUpperCase()}
                    {errors.password.slice(1)}.
                  </pre>
                )}{" "}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    href="/account-recovery"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  onClick={(e) => handleSubmit()}
                  className="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isPending ? (
                    <HashLoader size={15} color="white" />
                  ) : (
                    "Sign in"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
