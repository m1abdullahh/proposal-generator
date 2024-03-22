"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import stars from "~/public/gold-star-sparkle.38ab4095.svg";
import { Textarea } from "./ui/textarea";
import { FeedbackResponse, useAddFeedback } from "@/api/useAddFeedback";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFormik } from "formik";
import { FeedbackValidationSchema } from "@/lib/validations";
import { HashLoader } from "react-spinners";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRef } from "react";

export function ChadCNDialog() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const form = useFormik<{ rating: number; feedback: string }>({
    validationSchema: FeedbackValidationSchema,
    initialValues: {
      rating: 0,
      feedback: "",
    },
    onSubmit: ({ rating, feedback }) => {
      mutateAsync(
        {
          rating,
          feedback,
        },
        {
          onSuccess: (data) => handleSuccess(data),
          onError: (e) => handleError(e),
        }
      );
    },
  });
  const queryClient = useQueryClient();
  const handleSuccess = (data: FeedbackResponse) => {
    toast.success(data.message);
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    resetForm();
    closeButtonRef.current?.click();
  };
  const handleError = (e: Error) => {
    toast.error(e.message || "Something went wrong!");
  };
  const { mutateAsync, isPending } = useAddFeedback();
  const { values, handleChange, handleSubmit, resetForm, touched, errors } =
    form;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#FFB9001A] w-fit rounded-full flex items-center px-2 py-2">
          <div>
            <div className=" w-fit h-fit px-1 py-1 rounded-full">
              <Image className="w-[18px] h-[18px]" src={stars} alt="" />
            </div>
          </div>
          <div className="text-[#FFB900]  text-[14px] font-bold px-1">
            FREE CREDITS
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Give Feedback</DialogTitle>
          <DialogDescription>
            Give your feedback (or feature request) on how I can improve this
            app. 💖
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Rating
            </Label>
            <Input
              id="name"
              value={values.rating}
              className="col-span-3"
              type="number"
              placeholder="1-5"
              onChange={handleChange("rating")}
              min={0}
              max={5}
            />
          </div>
          {touched.rating && errors.rating && (
            <pre className="text-xs text-red-500 !m-0 !mt-1 text-end">
              {errors.rating[0].toUpperCase()}
              {errors.rating.slice(1)}.
            </pre>
          )}{" "}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Feedback
            </Label>
            <Textarea
              id="username"
              value={values.feedback}
              className="col-span-3"
              placeholder="Some kind words..."
              onChange={handleChange("feedback")}
            />
          </div>
          {touched.feedback && errors.feedback && (
            <pre className="text-xs text-red-500 !m-0 !mt-1 text-end">
              {errors.feedback[0].toUpperCase()}
              {errors.feedback.slice(1)}.
            </pre>
          )}{" "}
        </div>
        <DialogFooter>
          <Button
            className="px-8 py-5"
            type="submit"
            onClick={(e) => handleSubmit()}
          >
            {isPending ? (
              <HashLoader color="white" size={28} />
            ) : (
              "Send feedback"
            )}
          </Button>
        </DialogFooter>
        <DialogPrimitive.Close>
          <Button className="hidden" ref={closeButtonRef}>
            Close
          </Button>
        </DialogPrimitive.Close>
      </DialogContent>
    </Dialog>
  );
}
