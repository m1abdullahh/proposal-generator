import { GeneratorModel } from "@/api";
import * as Yup from "yup";

export const RegisterValidationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
  fullName: Yup.string().required().min(8),
  tAndCsAccepted: Yup.boolean().required().default(false),
  username: Yup.string().required().min(8),
});

export const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
});

export const PromptValidationSchema = Yup.object().shape({
  jobDescription: Yup.string().required().min(50),
  name: Yup.string().required(),
  experience: Yup.number().optional(),
  additionalPrompts: Yup.string().optional(),
  model: Yup.string()
    .required()
    .equals([GeneratorModel.CLAUDE_3, GeneratorModel.GPT_4])
    .default(GeneratorModel.GPT_4),
});

export const FeedbackValidationSchema = Yup.object().shape({
  rating: Yup.number().required().min(1).max(5),
  feedback: Yup.string().required(),
});

export const AccountRecoveryValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export const ResetPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string().min(8).required(),
  newPasswordConfirm: Yup.string().min(8).required(),
});
