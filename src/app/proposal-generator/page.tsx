"use client";

import { GeneratorModel, IPrompt, PromptResponse, useMakePrompt } from "@/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { CommonJobDescriptions } from "@/lib/utils";
import { PromptValidationSchema } from "@/lib/validations";
import { useFormik } from "formik";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { SideNavBar } from "@/components/SideNavBar";
import { CopyIcon, GearIcon, ResetIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

const promptPair =
  CommonJobDescriptions[~~(Math.random() * CommonJobDescriptions.length)];

export default function ProposalGeneration() {
  const { mutateAsync, isPending } = useMakePrompt();
  const [completion, setCompletion] = useState<string>("");
  const router = useRouter();

  const queryClient = useQueryClient();

  const handleSuccess = (data: PromptResponse) => {
    setCompletion(data.data!);
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    queryClient.invalidateQueries({ queryKey: ["myPrompts"] });
  };

  const handleCopyClick = () => {
    if (completion === "") {
      return toast.error("Nothing to copy.");
    }
    navigator.clipboard.writeText(completion);
    toast.success("Copied to clipboard.");
  };

  const handleClearClick = () => {
    setFieldValue("jobDescription", "");
    setCompletion("");
  };

  const handleError = (e: Error) => {
    if (e.message === "Unauthorized") {
      toast.error(e.message, {
        description: "Make sure you're signed in.",
        action: {
          label: "Sign In",
          onClick: () => {
            router.push("/login");
          },
        },
      });
    } else {
      toast.error(e.message, {
        description: "Buy some credits.",
      });
    }
  };

  const form = useFormik<IPrompt>({
    initialValues: {
      jobDescription: "",
      name: "",
      experience: 0,
      additionalPrompt: "",
      model: GeneratorModel.GPT_4,
    },
    validationSchema: PromptValidationSchema,
    onSubmit: (val) => {
      setCompletion("");
      mutateAsync(
        {
          jobDescription: val.jobDescription,
          name: val.name,
          experience: val.experience ?? undefined,
          additionalPrompt: val.additionalPrompt ?? undefined,
          model: val.model,
        },
        {
          onSuccess: (data) => {
            handleSuccess(data);
          },
          onError: (e) => {
            handleError(e);
          },
        }
      );
    },
  });

  const { values, handleSubmit, handleChange, errors, touched, setFieldValue } =
    form;

  return (
    <>
      <Toaster closeButton />
      <div className="flex flex-row">
        <SideNavBar />
        <div className="w-full">
          <div className="pt-4 pb-8 pl-4 pr-4">
            <div className="flex pb-3 justify-end">
              <Button onClick={() => handleClearClick()}>
                <ResetIcon />
                <p className="pl-2">Clear prompt</p>
              </Button>
            </div>
            <Textarea
              placeholder={promptPair.prompt}
              className={clsx(
                "h-60 text-lg",
                `${
                  touched.jobDescription &&
                  errors.jobDescription &&
                  "border border-red-500"
                }`
              )}
              value={values.jobDescription}
              onChange={handleChange("jobDescription")}
            />
            <div className="flex flex-row items-center pt-4">
              <label>Your Name:</label>
              <Input
                type="text"
                placeholder="Ebad Abid"
                className={clsx(
                  "w-40 mx-2",
                  `${touched.name && errors.name && "border border-red-500"}`
                )}
                value={values.name}
                onChange={handleChange("name")}
              />
              <label>Experience:</label>
              <Input
                type="number"
                placeholder="6"
                className="w-40 ml-2"
                value={values.experience}
                onChange={handleChange("experience")}
              />
              <label className="ml-4">Additional Prompt for AI:</label>
              <Input
                type="text"
                placeholder="Be a bit frank."
                className="w-40 ml-2"
                value={values.additionalPrompt}
                onChange={handleChange("additionalPrompt")}
              />
              <Select
                defaultValue={GeneratorModel.GPT_4}
                value={values.model}
                onValueChange={handleChange("model")}
              >
                <SelectTrigger className="w-[180px] ml-5">
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={GeneratorModel.CLAUDE_3}>
                    Claude 3 Opus - High Quality
                  </SelectItem>
                  <SelectItem value={GeneratorModel.GPT_4}>
                    GPT 4 Turbo - Super Fast
                  </SelectItem>
                </SelectContent>
              </Select>

              <p
                className={clsx(
                  "text-end ml-auto bottom-2",
                  `${
                    touched.jobDescription && errors.jobDescription
                      ? "text-red-500"
                      : values.jobDescription.length >= 50 && "text-green-500"
                  }`
                )}
              >
                {values.jobDescription.length}/50 characters min.
              </p>
            </div>
          </div>
          <div className="container mx-0 min-w-full flex flex-col items-center">
            <Button
              onClick={(e) => {
                if (!isPending) handleSubmit();
              }}
              className={clsx(
                "ml-auto mr-auto px-8 py-6",
                `${isPending ? "cursor-wait" : ""}`
              )}
              type="submit"
            >
              {isPending ? (
                <HashLoader className="px-11 py-6" color="white" size={30} />
              ) : (
                <>
                  <GearIcon />
                  <p className="pl-3">Generate</p>
                </>
              )}
            </Button>
          </div>
          <div className="py-12 relative px-4">
            <Textarea
              placeholder={promptPair.completion}
              className="h-60 text-lg"
              value={completion}
              readOnly
            />
            <Button
              onClick={() => handleCopyClick()}
              className="absolute right-4 top-0"
            >
              <CopyIcon />
              <p className="pl-2">Copy to clipboard</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
