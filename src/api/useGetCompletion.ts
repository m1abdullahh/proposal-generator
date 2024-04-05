import { getDataFromLocalStorage } from "@/lib/utils";
import { IPrompt } from ".";
import { BASE_URL } from "./helpers/request";

export class ApiError extends Error {
  public error: string;
  public statusCode: number;

  constructor(message: string, error: string, statusCode: number) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }
}

export const getCompletion = async (
  data: IPrompt
): Promise<{ reader: ReadableStreamDefaultReader<Uint8Array> }> => {
  const response = await fetch(`${BASE_URL}/generator/get-completion`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getDataFromLocalStorage().token || ""}`,
    },
    cache: "no-cache",
  });
  if (!response.ok) {
    const res: { message: string; error: string; statusCode: number } =
      await response.json();
    throw new ApiError(res.message, res.error, res.statusCode);
  }

  const reader = response.body!.getReader();
  return { reader };
};
