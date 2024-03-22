"use client";

import { RegisterValidationSchema } from "@/lib/validations";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import RocketIcon from "~/public/rocket_icon.png";
import { SignUpResponse, useSignUp } from "@/api/useSignup";
import { Toaster, toast } from "sonner";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const handleSuccess = (data: SignUpResponse) => {
    toast.success(data.message, {
      action: {
        label: "Sign In",
        onClick: () => {
          router.push("/login");
        },
      },
    });
  };
  const handleError = (e: Error) => {
    toast.error(e.message);
  };
  const { mutateAsync, isPending } = useSignUp();
  const form = useFormik<{
    email: string;
    password: string;
    fullName: string;
    username: string;
    tAndCsAccepted: boolean;
  }>({
    validationSchema: RegisterValidationSchema,
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      username: "",
      tAndCsAccepted: false,
    },
    onSubmit: (val) => {
      const [firstName, lastName] = val.fullName.split(" ");
      mutateAsync(
        {
          ...val,
          firstName,
          lastName,
        },
        {
          onSuccess: (data) => handleSuccess(data),
          onError: (e) => handleError(e),
        }
      );
    },
  });
  const { values, handleChange, errors, touched, handleSubmit } = form;
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <Toaster closeButton richColors />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image
              className="mr-2"
              height={32}
              width={32}
              src={RocketIcon}
              alt="logo"
            />
            MeTube
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
                  {touched.email && errors.email && (
                    <pre className="text-sm pt-1 text-red-500">
                      {errors.email[0].toUpperCase()}
                      {errors.email.slice(1)}.
                    </pre>
                  )}{" "}
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    name="username"
                    id="username"
                    type="text"
                    placeholder="johndoe7"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={values.username}
                    onChange={handleChange("username")}
                  />
                  {touched.username && errors.username && (
                    <pre className="text-sm pt-1 text-red-500">
                      {errors.username[0].toUpperCase()}
                      {errors.username.slice(1)}.
                    </pre>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={values.fullName}
                    onChange={handleChange("fullName")}
                  />
                  {touched.fullName && errors.fullName && (
                    <pre className="text-sm pt-1 text-red-500">
                      {errors.fullName[0].toUpperCase()}
                      {errors.fullName.slice(1)}.
                    </pre>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={values.password}
                    onChange={handleChange("password")}
                  />
                  {touched.password && errors.password && (
                    <pre className="text-sm pt-1 text-red-500">
                      {errors.password[0].toUpperCase()}
                      {errors.password.slice(1)}.
                    </pre>
                  )}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                      checked={values.tAndCsAccepted}
                      onChange={handleChange("tAndCsAccepted")}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <Link
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className=" disabled:bg-primary-300 disabled:hover:bg-primary-300 disabled:cursor-not-allowed w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={!values.tAndCsAccepted}
                  onClick={(e) => {
                    handleSubmit();
                  }}
                >
                  {isPending ? (
                    <HashLoader size={15} color="white" />
                  ) : (
                    "Create an account"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
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
