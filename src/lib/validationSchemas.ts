import * as Yup from "yup";
export const PromptValidationSchema = Yup.object().shape({
  jobDescription: Yup.string().required().min(50),
  name: Yup.string().required(),
  experience: Yup.number().optional(),
  additionalPrompts: Yup.string().optional(),
});
