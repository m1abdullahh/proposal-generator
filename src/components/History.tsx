import { formatDate } from "@/lib/utils";
import clsx from "clsx";
import { MouseEvent } from "react";
import { toast } from "sonner";

interface HistoryProps {
  prompt: string;
  completion: string;
  date: string;
  isFirst: boolean;
}

export function History({ prompt, completion, date, isFirst }: HistoryProps) {
  const handleClick = (
    e: MouseEvent<HTMLParagraphElement, any>,
    text: "prompt" | "completion"
  ) => {
    navigator.clipboard.writeText(text === "prompt" ? prompt : completion);
    toast.success("Copied to clipboard.");
  };
  return (
    <div
      className={clsx(
        "w-full py-6 border border-b-2",
        `${isFirst ? "" : "my-4"}`,
        "hover:shadow-md"
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold tracking-wide uppercase text-gray-500">
              Your Prompt
            </h3>
            <p
              className="max-w-[900px] text-xs tracking-wide/relaxed text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 hover:text-black hover:cursor-pointer"
              onClick={(e) => handleClick(e, "prompt")}
            >
              {prompt.slice(0, 150)}...
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold tracking-wide uppercase text-gray-500">
              AI
            </h3>
            <p
              className="max-w-[900px] text-xs tracking-wide/relaxed text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 hover:text-black hover:cursor-pointer"
              onClick={(e) => handleClick(e, "completion")}
            >
              {completion.slice(0, 250)}...
            </p>
          </div>
        </div>
      </div>
      <p className="text-end pr-6">{formatDate(date)}</p>
    </div>
  );
}
