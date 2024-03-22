"use client";

import { IPrompt, PromptResponse, useMakePrompt } from "@/api";
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
    },
    validationSchema: PromptValidationSchema,
    onSubmit: (val) => {
      mutateAsync(
        {
          jobDescription: val.jobDescription,
          name: val.name,
          experience: val.experience ?? undefined,
          additionalPrompt: val.additionalPrompt ?? undefined,
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

  const { values, handleSubmit, handleChange, errors } = form;

  return (
    <>
      <Toaster closeButton />
      <div className="pt-12 pb-8 pl-4 pr-4">
        <Textarea
          placeholder={promptPair.prompt}
          className="h-60 text-lg"
          value={values.jobDescription}
          onChange={handleChange("jobDescription")}
        />
        <div className="flex flex-row items-center pt-4">
          <label>Your Name:</label>
          <Input
            type="text"
            placeholder="Ebad Abid"
            className="w-40 mx-5"
            value={values.name}
            onChange={handleChange("name")}
          />
          <label>Experience:</label>
          <Input
            type="number"
            placeholder="6"
            className="w-40 ml-5"
            value={values.experience}
            onChange={handleChange("experience")}
          />
          <label className="ml-4">Additional Prompts for AI:</label>
          <Input
            type="text"
            placeholder="Be a bit frank."
            className="w-40 ml-5"
            value={values.additionalPrompt}
            onChange={handleChange("additionalPrompt")}
          />
        </div>
      </div>
      <div className="container mx-0 min-w-full flex flex-col items-center">
        <Button
          onClick={(e) => {
            handleSubmit();
          }}
          className="ml-auto mr-auto px-10 py-6"
          type="submit"
        >
          {isPending ? <HashLoader color="white" size={30} /> : "Generate"}
        </Button>
      </div>
      <div className="pt-12 pb-12 pl-4 pr-4">
        <Textarea
          placeholder={promptPair.completion}
          className="h-60 text-lg"
          value={completion}
          readOnly
        />
        <div className="container !pr-0 mx-0 min-w-full flex flex-col items-center">
          <p className="self-end">Powered by AnthropicAI Claude 3 Opus</p>
        </div>
      </div>
    </>
  );
}
