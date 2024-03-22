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
